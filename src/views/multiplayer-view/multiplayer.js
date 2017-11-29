import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import gamesListTmpl from './games-list.pug';
import gameItemsTmpl from './gameItems.pug';
import networking from '../../modules/networking';
import User from '../../services/user-service';
import wsBus from '../../modules/wsBus';

export default class MultiplayerView extends BaseView {

    getTemplate() {
        const data = {
            username: user.login,
        };
        this.stateGameList = 1;
        this.state = this.stateGameList;
        return gamesListTmpl(data);
    }

    postRender() {
        this.ws = networking.connect();
        this.ws.onopen = () => {
            console.log('connection established');
            wsBus.bindSocket(this.ws);
            networking.auth(User.login);
            wsBus.addEvent('UPDATE_LIST', this.updateGameList);
            this.wsPostOpen();
        };
    }

    updateGameList(payload) {
        this.listContainer = document.getElementsByClassName('games-container')[0];
        const data = {
            games: payload
        };
        this.listContainer.innerHTML = gameItemsTmpl(data);
    }

    wsPostOpen() {
        const createGame = document.getElementsByClassName('create-game')[0];
        createGame.addEventListener('click', (event) => {
            this.ws.send(JSON.stringify({
                type: 'CREATE_GAME',
                payload: {}
            }));
        });
    }
}
