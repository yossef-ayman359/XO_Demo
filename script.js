import Game from "./Game.js";

document.querySelector('#score-reset button').addEventListener('click', _ => {
    Game.resetGame();
})

Game.resetGame();

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const index = Number(cell.dataset.index);

        if (!Game.isCellEmpty(index) || Game.isGameOver())
            return;
        else
            Game.play(cell, index);
    })
});