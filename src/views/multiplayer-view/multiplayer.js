import BaseView from '../../modules/baseView';
import gamesListViewTmpl from './gamesListView.pug';
import gamesListTmpl from './game-list.pug';
import statusWindowTmpl from './multiplayer-status.pug';
import networking from '../../modules/networking';

export default class MultiplayerView extends BaseView {

    getTemplate() {
        return statusWindowTmpl({
            message: 'Connecting to Server...',
        });
    }

    postRender() {
        this.networking = networking.connect(() => {
            this.initGamesList();
        });
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
        this.appContainer.innerHTML = statusWindowTmpl({message: 'Whaiting for opponent'});
        this.networking.addEvent('OPPONENT_FOUND', this.initGame.bind(this));
    }

    updateGameList(data) {
        const listContainer = this.appContainer.getElementsByClassName('games-container')[0];
        const context = {};

        for(const game in data.games) {
            context[game] = {
                rating: data.games,
                username: game,
            };
        }
        listContainer.innerHTML = gamesListTmpl({games:context});
    }


    handleListSelect(event) {
        if(event.target.classList.contains('btn-game-item')) {
            this.connectToRoom(event.target.getAttribute('data-name'));
        }
    }

    connectToRoom(roomName) {
        this.networking.dropAllEvents();
        this.appContainer.innerHTML = statusWindowTmpl({message: 'Connectiong to room'});
        this.networking.send('JOIN_GAME', {player: roomName});
        this.networking.addEvent('CONNECTED', this.initGame.bind(this));
    }

    initGame(data) {
        this.appContainer.innerHTML = 'game started';
    }
}
