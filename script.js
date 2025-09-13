const mario = document.getElementById('mario');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameOver = false;

// Função para fazer Mario pular
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const maxJump = 150;

    // Subir
    const upInterval = setInterval(() => {
        if (jumpHeight >= maxJump) {
            clearInterval(upInterval);

            // Descer
            const downInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 10;
                    mario.style.bottom = 20 + jumpHeight + 'px';
                }
            }, 20);
        } else {
            jumpHeight += 10;
            mario.style.bottom = 20 + jumpHeight + 'px';
        }
    }, 20);
}

// Detectar colisão
const checkCollision = setInterval(() => {
    const marioBottom = parseInt(window.getComputedStyle(mario).getPropertyValue('bottom'));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

    // Colisão simples: quando obstáculo está perto e Mario está no chão
    if (obstacleRight > 540 && obstacleRight < 580 && marioBottom < 60) {
        gameOver = true;
        obstacle.style.animation = 'none';
        alert('Game Over! Sua pontuação foi: ' + score);
        clearInterval(checkCollision);
        location.reload();
    }
}, 20);

// Incrementar pontuação
const scoreInterval = setInterval(() => {
    if (!gameOver) {
        score++;
        scoreDisplay.textContent = 'Pontuação: ' + score;
    }
}, 100);

// Evento para pular com a tecla espaço ou seta para cima
document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space' || event.code === 'ArrowUp') && !gameOver) {
        jump();
    }
});