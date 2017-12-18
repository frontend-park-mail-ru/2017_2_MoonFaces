import GameField from '../../modules/game/game-field';

export default class Client {
    constructor(grid, field, playerScore, opponentScore, endTurn, appContainer, initialMatrix) {
        this.gameField = new GameField(grid, field);
        this.appContainer = appContainer;

        this.playerScore = playerScore;
        this.opponentScore = opponentScore;

        this.endTurn = endTurn;
        this.field = this.gameField.getField();
        this.gameField.loadFromArray(initialMatrix);
    }
}