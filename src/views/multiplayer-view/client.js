import GameField from '../../modules/game/game-field';

export default class Client {
    constructor(grid, field, playerScore, opponentScore, endTurn, appContainer, initialMatrix, networking, playerName, opponentName) {
        this.gameField = new GameField(grid, field, playerName=playerName, opponentName=opponentName);
        this.appContainer = appContainer;

        this.playerScore = playerScore;
        this.opponentScore = opponentScore;

        this.endTurn = endTurn;
        this.field = this.gameField.getField();
        this.gameField.loadFromArray(initialMatrix);
        this.networking = networking;
    }

    start() {
        this.bindNetworkEvents();
        this.endTurn.addEventListener('click', this.sendSelection.bind(this));
    }

    bindNetworkEvents() {
        this.networking.addEvent('FIELD_UPDATE', this.updateField.bind(this));
    }

    sendSelection() {
        this.networking.send('SELECT_FIELD', {selection: this.gameField.getUserSelection()});
    }

    updateField(data) {
        this.gameField.setOpponentSelection(data.opponent_selection);
        this.gameField.loadFromArray(data.game_field);
        this.gameField.renderField();
    }
}