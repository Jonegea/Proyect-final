const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const GameModel = require('./models/GameModel');
const GameController = require('./controllers/GameController');

// Crear el servidor
const app = express();
const server = http.createServer(app);

// Servidor WebSocket
const wss = new WebSocket.Server({ server });

// Modelo del juego
const gameModel = new GameModel();

// Controlador del juego
const gameController = new GameController(gameModel, wss);

// Sirve los archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para el HTML principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Inicia el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

// Inicia el bucle del juego
gameController.startGameLoop();
