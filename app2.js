import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { PlayersData } from "./data/players.js";
import { clubsData } from "./data/clubs.js";

// GraphQL Schema
const schema = buildSchema(`
      type Query {
        player(id: Int!): Player
        players(name: String): [Player]
        clubs(id: Int!): [Club]
      }

      type Player {
        id: Int
        name: String
        position: String
        age: Int
        clubs: [Club]
        internationalMatches: Int
        internationalGoals: Int
      }

      type Club {
        player_id: Int
        player: Player
        name: String
        year: String
      }
`);

class Player {
  clubs;
  constructor(data) {
    Object.assign(this, data);
    this.clubs = clubsData[data.id - 1];
  }
}

const PLAYERS = new Map();
PlayersData.forEach((person) => {
  PLAYERS.set(person.id, new Player(person));
});

// Get single Player using id
function getPlayer(args) {
  for (const key of PLAYERS.keys()) {
    if (key === args.id) {
      return PLAYERS.get(key);
    }
  }
}

//Get player using name
function getPlayers(args) {
  if (args.name) {
    return PlayersData.filter((player) =>
      player.name.toLowerCase().includes(args.name.toLowerCase())
    );
  } else {
    return PlayersData;
  }
}

function getClubs(args) {
  if (args.id) {
    for (const player of PlayersData) {
      if (player.id === args.id) {
        const clubsToReturn = clubsData.filter(
          (club) => club[0].player_id === args.id
        );
        return clubsToReturn[0];
      }
    }
  } else {
    return "No clubs";
  }
}
// Resolver
const root = {
  player: getPlayer,
  players: getPlayers,
  clubs: getClubs,
};

//Create an express server and GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

//Listening to our server
app.listen(3002, () => {
  console.log("GraphQL server with Express running on localhost:3002/graphql");
});
