import gameList from './GameList';
import clientsList from './clientsList';

export default class WsHandler {
    constructor(ws, username) {
        this.ws = ws;
        this.events = {};
        this.username = username;
    }

    start() {
        this.addEvent('CREATE_GAME', () => {
            gameList.addGame(this.username);
            this.notifyNewGames();
        });
        this.ws.on('message', (message) => {
            message = JSON.parse(message);
            this.callEvent(message.type, message.payload);
        });
        this.ws.on('close', () => {
            this.clearUserData();
        });
    }

    addEvent(event, callback) {
        this.events[event] = callback;
    }

    deleteEvent(event) {
        delete this.events[event];
    }

    callEvent(event, payload) {
        if(event in this.events) {
            this.events[event](payload);
        }
    }

    notifyNewGames() {
        const listUsers = this.getWsNoGameUsers();
        for(const key in listUsers) {
            listUsers[key].send(JSON.stringify({
                type: 'UPDATE_LIST',
                payload: gameList.getOpenSessions()
            }));
        }
    }

    getWsNoGameUsers() {
        const users = [];
        let current;
        for (const key in clientsList.users) {
            current = clientsList.users[key];
            users.push(current.socket);
        }
        return users;
    }

    clearUserData() {
        // todo: remove user created sessions + send opponent error message
    }
}
