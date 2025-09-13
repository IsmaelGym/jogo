const cart = document.getElementById('cart');
const item = document.getElementById('item');
const gameArea = document.getElementById('gameArea');

let score = 0;
let itemPosition = Math.random() * (gameArea.clientWidth - 30);
item.style.left = `${itemPosition}px`;
item.style.top = '0px'; // Inicializa a posição vertical do item

// Função para reposicionar o item
function repositionItem() {
    itemPosition = Math.random() * (gameArea.clientWidth - 30);
    item.style.left = `${itemPosition}px`;
    item.style.top = '0px'; // Reseta a posição vertical
}

document.addEventListener('keydown', (event) => {
    const cartPosition = cart.offsetLeft;

    if (event.key === 'ArrowLeft' && cartPosition > 0) {
        cart.style.left = `${cartPosition - 10}px`;
    } else if (event.key === 'ArrowRight' && cartPosition < gameArea.clientWidth - 50) {
        cart.style.left = `${cartPosition + 10}px`;
    }

    // Verificar se o carrinho coletou o item
    if (
        cart.offsetLeft < item.offsetLeft + 30 &&
        cart.offsetLeft + 50 > item.offsetLeft &&
        cart.offsetTop < item.offsetTop + 30
    ) {
        score++;
        alert(`Você coletou um item! Pontuação: ${score}`);
        repositionItem(); // Chama a função para reposicionar o item
    }
});

// Reposicionar o item após um tempo
setInterval(() => {
    item.style.top = `${parseInt(item.style.top) + 5}px`; // Move o item para baixo
    if (parseInt(item.style.top) > gameArea.clientHeight) {
        repositionItem(); // Reposiciona se sair da tela
    }
}, 100); // Cada 1000 ms
