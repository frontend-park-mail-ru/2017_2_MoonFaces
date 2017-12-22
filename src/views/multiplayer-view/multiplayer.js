import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import gamesListViewTmpl from './gamesListView.pug';
import gamesListTmpl from './gameItems.pug';
import statusWindowTmpl from './multiplayer-status.pug';
import networking from '../../modules/networking';
import gamaViewTmpl from './gameView.pug';
import Client from './client';

export default class MultiplayerView extends BaseView {

    getTemplate() {
        return statusWindowTmpl({
            message: 'Connecting to the server...',
        });
    }

    postRender() {
        this.networking = networking.connect(() => {
            this.initGamesList();
        });
    }

    preClose() {
        this.networking.disconnect();
    }

    updateGameList(data) {
        const listContainer = this.appContainer.getElementsByClassName('games-container')[0];
        const context = {};

        for(const game in data.gamesList) {
            context[game] = {
                rating: data.gamesList[game],
                username: game,
            };
        }
        listContainer.innerHTML = gamesListTmpl({games:context});
    }


    initGamesList() {
        this.appContainer.innerHTML = gamesListViewTmpl();

        const createGameButton = this.appContainer.getElementsByClassName('btn-create-game')[0];

        this.networking.addEvent('UPDATE_GAMES_LIST', this.updateGameList.bind(this));

        createGameButton.addEventListener('click', this.createGame.bind(this));
        const listContainer = this.appContainer.getElementsByClassName('games-container')[0];
        listContainer.addEventListener('click', this.handleListSelect.bind(this));
    }


    createGame() {
        this.networking.dropAllEvents();
        this.networking.send('CREATE_GAME');
        this.appContainer.innerHTML = statusWindowTmpl({message: 'Waiting for opponent...'});
        this.networking.addEvent('OPPONENT_FOUND', this.initGame.bind(this));
    }


    handleListSelect(event) {
        if(event.target.classList.contains('btn-game-item')) {
            
            this.connectToRoom(event.target.getAttribute('data-name'));
        }
    }


    connectToRoom(roomName) {
        this.networking.dropAllEvents();
        this.appContainer.innerHTML = statusWindowTmpl({message: 'Connecting to room...'});
        this.networking.send('JOIN_GAME', {player: roomName});
        this.networking.addEvent('CONNECTED', this.initGame.bind(this));
    }


    initGame(data) {
        this.appContainer.innerHTML = gamaViewTmpl({username: user.login, opponent: data.opponentName});
        this.networking.dropAllEvents();
        const client = new Client(
            this.appContainer.getElementsByClassName('game_field-grid')[0],
            this.appContainer.getElementsByClassName('game_field-field')[0],
            this.appContainer.getElementsByClassName('game_player-score')[0],
            this.appContainer.getElementsByClassName('game_opponent-score')[0],
            document.getElementsByClassName('game_end-turn')[0],
            this.appContainer,
            data.gameField,
            this.networking,
            user.login,
            data.opponentName
        );
        client.start();
    }
}
