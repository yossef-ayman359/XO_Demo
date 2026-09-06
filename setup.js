const options = document.querySelector('#options');
const inps = document.querySelector('#inputs');
const btn = document.querySelector('#btn');
const player1 = {
    row: document.querySelector('#player1-inp'),
    para: document.querySelector('#player1-inp p'),
    input: document.querySelector('#player1-inp input'),
    data: { name: 'Player 1', symbol: 'X' },
}
const player2 = {
    row: document.querySelector('#player2-inp'),
    para: document.querySelector('#player2-inp p'),
    input: document.querySelector('#player2-inp input'),
    data: { ai: false, name: 'Player 2', symbol: 'O' },
}
let valueOptions = Number(options.value);

options.addEventListener('change', () => {
    valueOptions = Number(options.value);

    inps.classList.remove('hidden');
    player1.row.classList.remove('hidden');

    player2.row.classList.toggle('hidden', valueOptions === 2);
    player2.data.ai = valueOptions === 2;
})

player1.input.addEventListener('input', () => {
    player1.data.name = player1.input.value;
})

btn.addEventListener('click', () => {
    player2.data.name = player2.data.ai ? 'AI' : (player2.input.value || "player 2");

    window.localStorage.setItem('Player1', JSON.stringify(player1.data));
    window.localStorage.setItem('Player2', JSON.stringify(player2.data));

    window.location.href = './game.html';
})