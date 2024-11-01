const WebSocket = require('ws');

class GameModel {
  constructor() {
    this.players = {}; // Lista de jugadores conectados
    this.ball = { x: 300, y: 300, speedX: 20, speedY: 2 }; // Ejemplo básico de la bola
    this.paddle = { x: 250, width: 100, height: 20 }; // Paleta de ejemplo
  
  }

  // Agrega un nuevo jugador cuando se conecta
  addPlayer(playerId) {
    this.players[playerId] = {
      paddle: { x: 250, width: 100, height: 20 }, // Paleta de cada jugador
      score: 0
    };
  }

  // Elimina un jugador cuando se desconecta
  removePlayer(playerId) {
    delete this.players[playerId];
  }

  // Actualiza la posición de la paleta de un jugador
  updatePaddle(playerId, x) {
    if (this.players[playerId]) {
      this.players[playerId].paddle.x = x;
    }
  }

  // Actualiza la posición de la bola (por ahora es un ejemplo simple)
  updateBall() {
    this.ball.x += this.ball.speedX;
    this.ball.y += this.ball.speedY;

    // Colisiones con los bordes
    if (this.ball.x < 0 || this.ball.x > 600) this.ball.speedX *= -1;
    if (this.ball.y < 0 || this.ball.y > 400) this.ball.speedY *= -1;
  }

  // Actualiza el estado del juego para todos los jugadores
  updateGameState() {
    this.updateBall();
  }

  // Envía el estado del juego a todos los clientes conectados
  broadcastGameState(wss) {
    const gameState = {
      ball: this.ball,
      players: this.players
    };
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(gameState));
      }
    });
  }
}

module.exports = GameModel;
