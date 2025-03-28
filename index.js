const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/rea-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/player-app", express.static(path.join(__dirname, "player_app")));
app.use("/narrator-app", express.static(path.join(__dirname, "narrator_app")));

let roles = [
  "lobo",
  "lobo",
  "aldeano",
  "aldeano" 
];
let availableRoles = [...roles];

let players = [];


app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/join-game", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Ops, data missing" });
  }

  if (availableRoles.length === 0) {
    return res
      .status(400)
      .json({ message: "No more players, There are 3 players now" });
  }

  const assignRole = () => {
    const i = Math.floor(Math.random() * availableRoles.length);
    return availableRoles.splice(i, 1)[0];
  };

  const user = {
    id: players.length + 1,
    name,
    rol: assignRole(),
  };

  players.push(user);

  console.log("Super el registro:", players);

  res.status(201).json({
    message: "Usuario registrado",
    player: user,
    numberOfPlayers: players.length,
  });
});



app.post("/notificar-dia", (req, res) => {

});

app.post("/notificar-noche", (req, res) => {

});

httpServer.listen(5050);
