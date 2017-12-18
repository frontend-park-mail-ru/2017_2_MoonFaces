import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import gamesListTmpl from './games-list.pug';
import gameItemsTmpl from './gameItems.pug';
// import networking from '../../modules/networking';
import User from '../../services/user-service';
import WSBus from '../../modules/wsBus';

export default class MultiplayerView extends BaseView {

    getTemplate() {
        const data = {
            username: user.login,
        };
        // this.stateGameList = 1;
        // this.state = this.stateGameList;
        return gamesListTmpl(data);
    }

    postRender() {
        const getWSUrl = () => `ws://${window.location.hostname}:8081`;
        this.ws = new WebSocket(getWSUrl());
        this.wsBus = new WSBus(this.ws);
        
        this.ws.onopen = () => {
            console.log('connection established');
            // networking.auth(User.login);
            this.wsBus.addEvent('UPDATE_LIST', this.updateGameList);
            this.wsPostOpen();
        };
        this.updateGameList([['Nagibator', 404], ['MrRobot777', 201], ['xXxPro100xXx', 99]]);
    }

    updateGameList(payload) {
        // this.listContainer = document.getElementsByClassName('games-container')[0];
        this.listContainer = document.getElementById('games-container');
        const data = {
            games: payload
        };
        this.listContainer.innerHTML = gameItemsTmpl(data);
        for (const game in payload) {
            this.form = new Form(document.getElementById(`join-game-${payload[1]}`));
        }
    }

    // wsPostOpen() {
    //     const createGame = document.getElementsByClassName('create-game')[0];
    //     createGame.addEventListener('click', (event) => {
    //         this.ws.send(JSON.stringify({
    //             type: 'CREATE_GAME',
    //             payload: {}
    //         }));
    //     });
    // }
}