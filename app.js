import { PlayersData }  from "./data/players.js";
import { clubsData  } from "./data/clubs.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

function errorResponse(error) {
  return {
    error: true,
    message: error.message,
    stack: error.stack,
  };
}

const accessToken = "00000000-0000-0000-0000-000000000000";

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
});

// Sign in to get token
app.post("/sign-in", (req, res) => {
  try {
    if (req.body.password === "password" && req.body.email) {
      res.send({
        access_token: accessToken,
      });
    } else {
      throw new Error("Wrong password or email");
    }
  } catch (error) {
    res.send(errorResponse(error));
  }
});

// Get all players
app.get("/players", (req, res) => {
  try {
    if (req.headers.authorization !== accessToken) {
      res.status(403);
      res.send({
        message: "Missing authorization token",
      });
      return;
      //throw new Error("Missing authorization token");
    }
    var playersToReturn;
    if (req.query.name) {
      if (req.query.title) {
        playersToReturn = PlayersData.filter((player) => {
          if (
            player.name.includes(req.query.name) &
            player.position.includes(req.query.position)
          )
            return player.name;
        });
      } else {
        playersToReturn = PlayersData.filter((player) => {
          if (player.name.includes(req.query.name)) return player.name;
        });
      }
      res.send(playersToReturn);
    } else if (req.query.position) {
      playersToReturn = PlayersData.filter((player) => {
        if (player.position.includes(req.query.position)) return player.position;
      });
      res.send(playersToReturn);
    } else {
      res.send(PlayersData);
    }
  } catch (error) {
    res.send(errorResponse(error));
  }
});

// get single player
app.get("/players/:playerId", (req, res) => {
  try {
    if (req.headers.authorization !== accessToken) {
      res.status(403);
      res.send({
        message: "Missing authorization token",
      });
      return;
    }

    const playersToReturn = PlayersData.filter((player) => {
      return player.id == req.params.playerId;
    });

    res.send(playersToReturn[0]);
  } catch (error) {
    res.send(errorResponse(error));
  }
});

// get player's clubs
app.get("/players/:playerId/clubs", (req, res) => {
  try {
    if (req.headers.authorization !== accessToken) {
      res.status(403);
      res.send({
        message: "Missing authorization token",
      });
      return;
    }

    const playersToReturn = PlayersData.filter((player) => {
      return player.id == req.params.playerId;
    });

    const clubsId = req.params.playerId - 1;

    res.send(clubsData[clubsId] ? clubsData[clubsId] : []);
  } catch (error) {
    res.send(errorResponse(error));
  }
});
