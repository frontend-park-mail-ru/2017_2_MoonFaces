import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import gameItemsTmpl from './gameItems.pug';
import User from '../../services/user-service';
import WSBus from '../../modules/wsBus';
import gamesListViewTmpl from './gamesListView.pug';
import gamesListTmpl from './game-list.pug';
import statusWindowTmpl from './multiplayer-status.pug';
import networking from '../../modules/networking';
import gamaViewTmpl from './gameView.pug';
import Client from './client';

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
        // const getWSUrl = () => `ws://${window.location.hostname}:8081`;
        // this.ws = new WebSocket(getWSUrl());
        // this.wsBus = new WSBus(this.ws);
        
        // this.ws.onopen = () => {
        //     console.log('connection established');
        //     // networking.auth(User.login);
        //     this.wsBus.addEvent('UPDATE_LIST', this.updateGameList);
        //     this.wsPostOpen();
        // };
        // this.updateGameList([['Nagibator', 404], ['MrRobot777', 201], ['xXxPro100xXx', 99]]);
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
        // const listContainer = this.appContainer.getElementsByClassName('games-container')[0];
        // const context = {};

        // for(const game in data.games) {
        //     context[game] = {
        //         rating: data.games[game],
        //         username: game,
        //     };
        // }
        // listContainer.innerHTML = gamesListTmpl({games:context});

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
        this.appContainer.innerHTML = gamaViewTmpl({username: user.login, opponent: data.opponent});
        const client = new Client(
            this.appContainer.getElementsByClassName('game_field-grid')[0],
            this.appContainer.getElementsByClassName('game_field-field')[0],
            this.appContainer.getElementsByClassName('game_player-score')[0],
            this.appContainer.getElementsByClassName('game_opponent-score')[0],
            document.getElementsByClassName('game_end-turn')[0],
            this.appContainer,
            data.game_field
        );
    }
}
