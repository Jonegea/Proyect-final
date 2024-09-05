CREATE DATABASE ArkanoidDB;

USE ArkanoidDB;

-- Tabla de Jugadores
CREATE TABLE Players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Tabla de Partidas
CREATE TABLE Games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    score INT NOT NULL,
    level INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    FOREIGN KEY (player_id) REFERENCES Players(id)
);

-- Tabla de Configuraciones del Juego
CREATE TABLE GameSettings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    player_id INT,
    sound BOOLEAN DEFAULT TRUE,
    music BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (player_id) REFERENCES Players(id)
);

-- Tabla de Clasificación
CREATE TABLE Leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    score INT NOT NULL,
    rank INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES Players(id)
);
