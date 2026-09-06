class Game {
    static STATUS = {xWin: -2, draw: -1, oWin: 2, inPlay: null, win:2}
    static #board =
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    static #currentPlayer = 'X';
    static #nextPlayer = 'O';
    static #gameEnded = false;

    static #initLogic() {
        this.#board =
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
        this.#currentPlayer = 'X';
        this.#nextPlayer = 'O';
        this.#gameEnded = false;
    }

    static play(cell, index) {
        const symbol = this.getCurrentPlayer();
         // set cell in board
        this.setCell(cell, index, symbol);

        // next player
        this.changePlayer();

        // update UI Current Player
        UI.updateCurrentPlayerContent(`${this.getCurrentPlayer()} player`);

        // check game state
        const gameEndState = this.hasWinner(symbol) || this.isDraw();
        if (gameEndState) {
            this.showWinner(Math.abs(gameEndState) === this.STATUS.win, symbol);
            this.showDraw(gameEndState === this.STATUS.draw, symbol);
        }
    }

    static getCurrentPlayer() {
        return this.#currentPlayer;
    }
    static getNextPlayer() {
        return this.#nextPlayer;
    }
    static isGameOver() {
        return this.#gameEnded;
    }
    static #getRow(index) {
        return Math.floor(index / 3);
    }
    static #getCol(index) {
        return index % 3;
    }

    static changePlayer() {
        this.#currentPlayer =
            this.#currentPlayer === 'X' ? 'O' : 'X';
        this.#nextPlayer =
            this.#nextPlayer === 'X' ? 'O' : 'X';
        // return this.#currentPlayer;
    }

    static getCellValue(index) {
        return this.#board[this.#getRow(index)][this.#getCol(index)];
    }

    static setCell(cell, index, symbol) {
        this.#board[this.#getRow(index)][this.#getCol(index)] = symbol;
        UI.setCellContent(cell, symbol);
    }

    static hasWinner(symbol) {
        const state = symbol === 'X' ? this.STATUS.xWin : this.STATUS.oWin;
        // check every row and column
        for (let i = 0; i < 3; ++i) {
            const rowWin = this.#board[i].every(cell => cell === symbol);
            const colWin = [this.#board[0][i], this.#board[1][i], this.#board[2][i]].every(cell => cell === symbol);
            if (rowWin || colWin)
                return state;
        }
        // check diagonals
        const diagonalWin = [this.#board[0][0], this.#board[1][1], this.#board[2][2]].every(cell => cell === symbol);
        const antidiagonalWin = [this.#board[0][2], this.#board[1][1], this.#board[2][0]].every(cell => cell === symbol);
        if (diagonalWin || antidiagonalWin)
            return state;
        return this.STATUS.inPlay;
    }

    static showWinner(hasWin, symbol = null) {
        if(hasWin)
            this.#endGame(`<h2 class="w-full text-4xl text-center text-green-300 text-shadow-green-300 text-shadow-sm">${`Player ${symbol} Win`}</h2>`);
    }

    static isDraw() {
        for (let i = 0; i < 9; ++i)
            if (this.#board[this.#getRow(i)][this.#getCol(i)] === '')
                return this.STATUS.inPlay;
        return this.STATUS.draw;
    }

    static showDraw(isDraw, symbol = null) {
        if(isDraw)
            this.#endGame("<h2 class=\"w-4/5 text-4xl text-center text-gray-300 text-shadow-gray-300 text-shadow-sm\">Draw!</h2>")
    }

    static isCellEmpty(index){
        return !(this.getCellValue(index))
    }

    static resetGame() {
        this.#initLogic();
        UI.initUI();
    }

    static #endGame(message) {
        UI.endGame(message);
        this.#gameEnded = true;
    }
}

class UI {
    static #resultElement = document.querySelector('#score-reset h2');
    static #resetButton = document.querySelector('#score-reset button');
    static #currentPlayerElement = document.querySelector('#currentPlayer');
    static #cells = document.querySelectorAll('.cell');

    static setCellContent(cell, symbol) {
        cell.textContent = symbol;
    }

    static updateCurrentPlayerContent(message) {
        this.#currentPlayerElement.textContent = message;        
    }
    static updateResetButtonContent(message) {
        this.#resetButton.textContent = message;
    }
    static updateResultContent(message) {
        this.#resultElement.innerHTML = message;
    }

    static initUI() {
        this.#cells.forEach(cell => {
            this.setCellContent(cell, '');
        })
        this.updateResultContent('');
        this.updateCurrentPlayerContent('X player');
        this.updateResetButtonContent('Reset');
    }

    static endGame(message) {        
        this.updateCurrentPlayerContent('Game Ended');
        this.updateResultContent(message);
        this.updateResetButtonContent('New Game');
    }
}

export default Game;