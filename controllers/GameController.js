class GameController {
  constructor(gameModel, wss) {
    this.gameModel = gameModel;
    this.wss = wss;

    // Configura las conexiones WebSocket
    this.wss.on('connection', (ws) => {
      const playerId = Date.now(); // Identificador único para cada jugador
      this.gameModel.addPlayer(playerId);

      // Maneja los mensajes del cliente
      ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Mueve la paleta según el input del cliente
        if (data.type === 'movePaddle') {
          this.gameModel.updatePaddle(playerId, data.x);
        }
      });

      // Elimina el jugador cuando se desconecta
      ws.on('close', () => {
        this.gameModel.removePlayer(playerId);
      });
    });
  }

  // Inicia el bucle del juego
  startGameLoop() {
    setInterval(() => {
      this.gameModel.updateGameState();
      this.gameModel.broadcastGameState(this.wss);
    }, 1000 / 60); // Actualiza el estado 60 veces por segundo
  }
}

module.exports = GameController;
