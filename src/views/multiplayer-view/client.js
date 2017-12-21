import GameField from '../../modules/game/game-field';
import user from '../../services/user-service';
import GameScores from '../../modules/game/game-scores';
import multiplayerStatusTmpl from './multiplayer-status.pug';

export default class Client {
    constructor(grid, field, playerScore, opponentScore, endTurn, appContainer, initialMatrix, networking, playerName, opponentName) {
        this.gameField = new GameField(grid, field, playerName, opponentName);
        this.appContainer = appContainer;

        this.playerScore = playerScore;
        this.opponentScore = opponentScore;

        this.endTurn = endTurn;
        this.gameField.loadFromArray(initialMatrix);
        this.networking = networking;
        this.playerName = playerName;
        this.opponentName = opponentName;
        this.countScores();
    }

    start() {
        this.bindNetworkEvents();
        this.endTurn.addEventListener('click', this.sendSelection.bind(this));
    }

    bindNetworkEvents() {
        this.networking.addEvent('FIELD_UPDATE', this.updateField.bind(this));
        this.networking.addEvent('GAME_OVER', this.handelGameOver.bind(this));
        this.networking.addEvent('OPPONENT_LOST', this.handleLostOpponent.bind(this));
    }

    sendSelection() {
        this.networking.send('SELECT_FIELD', {selection: this.gameField.getUserSelection()});
    }

    updateField(data) {
        this.gameField.setOpponentSelection(JSON.parse(data.opponentSelection));
        this.gameField.loadFromArray(data.gameField);
        this.gameField.renderField();
        this.countScores();
    }

    countScores() {
        this.playerScore.innerHTML = this.gameField.getPlayerScore();
        this.opponentScore.innerHTML = this.gameField.getOpponentScore();
    }

    handelGameOver(data) {
        user.score = data.score;
        this.gameField.loadFromArray(data.gameField);
        const gameScores = new GameScores(
            this.playerName,
            this.opponentName,
            this.gameField.getPlayerScore(),
            this.gameField.getOpponentScore(),
            data.win,
            this.appContainer
        );
        gameScores.show();
        this.networking.disconnect();
    }

    handleLostOpponent(data) {
        this.appContainer.innerHTML = multiplayerStatusTmpl({message: 'Opponent lost :('});
        this.networking.disconnect();
    }
}
