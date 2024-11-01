// Seleccionamos los elementos del DOM
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const startButton = document.getElementById('startGame');
const menu = document.getElementById('menu');

// Tamaño del canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Configuración de ladrillos
const brickRowCount = 8;  // Número de filas de ladrillos
const brickColumnCount = 14;  // Número de columnas de ladrillos

// Cálculo dinámico del tamaño de los ladrillos en función del canvas
const brickWidth = canvasWidth / brickColumnCount;
const brickHeight = (canvasHeight * 0.2) / brickRowCount;  // 20% del canvas para los ladrillos

// Espaciado y posicionamiento de los ladrillos
const brickPadding = 4;
const brickOffsetTop = 50;
const brickOffsetLeft = 10;

const BRICK_STATUS = { ACTIVE: 1, DESTROYED: 0 };  // Estado de los ladrillos
const bricks = [];  // Arreglo para almacenar los ladrillos

// Inicialización de los ladrillos
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r] = { x: brickX, y: brickY, status: BRICK_STATUS.ACTIVE };
    }
}

// Configuración de la pelota
let ballRadius = 8;
let ballX = canvasWidth / 2;
let ballY = canvasHeight - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Configuración de la plataforma (paddle)
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvasWidth - paddleWidth) / 2;
let paddleSpeed = 7;
let rightPressed = false;
let leftPressed = false;

// Detectar si se presionan las teclas de movimiento
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Dibujar los ladrillos
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status === BRICK_STATUS.ACTIVE) {
                context.fillStyle = `rgb(${Math.random() * 100}, ${Math.random() * 100}, ${Math.pow() * 255})`;
                context.fillRect(brick.x, brick.y, brickWidth, brickHeight);
            }
        }
    }
}

// Dibujar la pelota
function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

// Dibujar la plataforma (paddle)
function drawPaddle() {
    context.fillStyle = '#0095DD';
    context.fillRect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
}

// Detectar colisiones entre la pelota y los ladrillos
function detectCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status === BRICK_STATUS.ACTIVE) {
                if (
                    ballX > brick.x &&
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight
                ) {
                    ballSpeedY = -ballSpeedY;
                    brick.status = BRICK_STATUS.DESTROYED;
                }
            }
        }
    }
}

// Mover la pelota y la plataforma
function moveBall() {
    if (ballX + ballSpeedX > canvasWidth - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY + ballSpeedY > canvasHeight - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        } else {
            document.location.reload();  // Reiniciar el juego si la pelota cae
        }
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function movePaddle() {
    if (rightPressed && paddleX < canvasWidth - paddleWidth) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
}

// Limpiar el canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Bucle del juego
function gameLoop() {
    clearCanvas();
    drawBricks();
    drawBall();
    drawPaddle();
    detectCollision();
    moveBall();
    movePaddle();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego al hacer clic en el botón
startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    gameLoop();
});
