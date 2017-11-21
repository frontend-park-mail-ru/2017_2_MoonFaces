import GameField from './game-field';

export default class Singleplayer {
    constructor(grid, field, playerScore, opponentScore, endTurn, userName, opponentName) {
        this.gameField = new GameField(grid, field, playerScore, opponentScore);
        this.playerScore = playerScore;
        this.opponentScore = opponentScore;
    }

    start() {
        this.gameField.renderField();

        this.playerScore.innerHTML = this.gameField.getPlayerScore();
        this.opponentScore.innerHTML = this.gameField.getOpponentScore();
    }
}
