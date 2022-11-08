## Instructions

### Installation

To install the libraries from the bash (terminal/shell) just type
```
npm install
```
in the root of the project

To run REST api application, just type in the root of the project

```
node app.js
```

It will run the app with REST APIs on 
```
http://localhost:3001
```


To run GRAPHQL api application, just type in the root of the project
```
node app2.js
```

It will run the app with Graphql APIs on 
```
http://localhost:3002
```

### REST API info
There are 4 api calls on this project

#### Sign in
```
POST /sign-in
```

POST Body object
```
{
    password: 'password',
    email: 'email',
}
```

Response
```
{
    access_token: '00000000-0000-0000-0000-000000000000',
}
```

#### List all players

```
GET /players
```

Response example
```
[
    {
        "id": 1,
        "name": "Predrag Rajkovic",
        "position": "GK",
        "age": 27,
        "internationalMatches": 28,
        "internationalGoals": 0
    },
]
```
You can also filter the playes by position and/or name using the Query Params
example: 
```
GET /players?position=DC&name=Dusan
```

#### Get single player
```
GET /players/:playerId
```

Response example
```
{
    "id": 1,
    "name": "Predrag Rajkovic",
    "position": "GK",
    "age": 27,
    "internationalMatches": 28,
    "internationalGoals": 0
}
```

#### Get player's clubs

```
GET /players/:playerId/clubs
```

Response example
```
[
    {
        "player_id": 1,
        "name": "Mallorca",
        "year": "2022-current"
    },
    {
        "player_id": 1,
        "name": "Reims",
        "year": "2019-2022"
    },
    {
        "player_id": 1,
        "name": "Maccabi Tel Aviv",
        "year": "2015-2019"
    },
    {
        "player_id": 1,
        "name": "Crvena Zvezda",
        "year": "2013-2015"
    },
    {
        "player_id": 1,
        "name": "Jagodina",
        "year": "2012-2013"
    }
],
```

### Graphql API info
There are 5 api calls you can try on this app. They are all present on the same route

```
http://localhost:3002/graphql
```

#### List all players

Query:
```
query getAllUsers {
  players {
    id
    name
    position
    age
    internationalMatches
    internationalGoals
  }
}
```

#### Get single player

Query:
```
query getSinglePlayer($playerId: Int!) {
  player(id: $playerId) {
    id
    name
    age
    position
    internationalMatches
    internationalGoals
  }
}
```
where Graphql variables (or Query parameters) is provided:
```
{
  "playerId": 1
}
```

#### Filter players by name

Query:
```
query getUsersByName($playerName: String) {
  players( name: $playerName) {
    id
    name
    age
    position
    internationalMatches
    internationalGoals
  }
}
```

where Graphql variables (or Query parameters) is provided:
```
{
  "playerName": "Dusan"
}
```

#### Get player's club

Query:
```
query getClubs($playerId: Int!) {
  clubs(id: $playerId) {
    player_id
    name
    year
  }
}
```

where Graphql variables (or Query parameters) is provided:
```
{
  "playerId": 1
}
```

#### Get Player info with clubs data

You can also get the player basic info, plus the informations on the clubs he played in using single query.

Query:
```
query getSinglePlayer($playerId: Int!) {
  player(id: $playerId) {
    id
    name
    age
    position
    internationalMatches
    internationalGoals
    clubs {
        name
        year
    }
  }
}
```

where Graphql variables (or Queary parameters) is provided:
```
{
  "playerId": 1
}
```

## Postman Collections
Check the postman folder for collections (both REST and Graphql api). Import those collections into Postman and run the tests once you start the app.


