import GameField from './game-field';

export default class SinglePlayer {
    constructor(grid, field, playerScore, opponentScore, endTurn, userName, opponentName) {
        this.gameField = new GameField(grid, field);
        this.playerScore = playerScore;
        this.opponentScore = opponentScore;
        this.field = this.gameField.getField();
    }

    start() {
        this.generateRandomMatrix();
        this.gameField.renderField();
        this.iteration();
    }

    generateRandomMatrix() {
        for (let i = 0; i < this.gameField.fieldSize; i++) {
            for (let j = 0; j < this.gameField.fieldSize / 2; j++) {
                if (Math.random() <= 0.5) {
                    this.field[i][j].alive = true;
                    this.field[i][this.gameField.fieldSize - 1 - j].alive = true;
                }
            }
        }
    }

    iteration() {
        this.gameField.renderField();
        this.playerScore.innerHTML = this.gameField.getPlayerScore();
        this.opponentScore.innerHTML = this.gameField.getOpponentScore();
    }
}
