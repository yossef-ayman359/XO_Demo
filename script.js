const cells = document.querySelectorAll('.cell');
const currPlayer = document.querySelector('.currPlayer');
const gameState = document.querySelector('.score-reset h2');
const resetBtn = document.querySelector('.score-reset button');
let isXPlayer = true;
let currSymbol = ['O', 'X'];
const board =
[
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

function hasWinner(symbol) {
    for (let i = 0; i < 3; ++i) {
        const rowWin = board[i].every(cell => cell === symbol);
        const colWin = [board[0][i], board[1][i], board[2][i]].every(cell => cell === symbol);
        if (rowWin || colWin) return true;
    }

    const dagWin = [board[0][0], board[1][1], board[2][2]].every(cell => cell === symbol);
    const antiDagWin = [board[0][2], board[1][1], board[2][0]].every(cell => cell === symbol);
    return dagWin || antiDagWin;
}

function draw() {
    for (let i = 0; i < 9; ++i)
        if (board[Math.floor(i / 3)][i % 3] === '') return false;
    return true;
}

function checkCellEmpty(index){
    return !(board[Math.floor(index / 3)][index % 3])
}

function resetGame() {
    cells.forEach((ele, index) => {
        ele.textContent = board[Math.floor(index / 3)][index % 3] = '';
    });
    isXPlayer = true;
    currPlayer.textContent = 'X' + " player";
    gameState.innerHTML = `<h2 hidden></h2>`
}

function endGame(state) { 
    gameState.innerHTML = state;
    setTimeout(_ => resetGame);
}

resetBtn.addEventListener('click', _ => {
    resetGame();
})

currPlayer.textContent = 'X' + " player"

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = Number(cell.dataset.index);

        if (!checkCellEmpty(index)) return;

        const symbol = currSymbol[Number(isXPlayer)];
        board[Math.floor(index / 3)][index % 3] = symbol;
        cell.textContent = symbol;

        isXPlayer = !isXPlayer;

        currPlayer.textContent = `${currSymbol[Number(isXPlayer)]} player`;
        
        setTimeout(_ => {
            if (hasWinner(symbol)) {
                const state = `<h2 class="w-full text-4xl text-center text-green-300 text-shadow-green-300 text-shadow-sm">${`Player ${symbol} Win`}</h2>`
                endGame(state);
            }
            else if (draw()) {
                const state = `<h2 class="w-4/5 text-4xl text-center text-gray-300 text-shadow-gray-300 text-shadow-sm">Draw!</h2>`
            endGame(state);
            }
        }, 0)
    })
});