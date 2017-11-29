import gameList from './GameList';

export default class WsHandler {
    constructor(ws, username) {
        this.ws = ws;
        this.events = {};
        this.username = username;
    }

    start() {
        this.addEvent('CREATE_GAME', () => {
            gameList.addGame(this.username);
        });
        this.ws.on('message', (message) => {
            message = JSON.parse(message);
            this.callEvent(message.type, message.payload);
        });
    }

    addEvent(event, callback){
        this.events[event] = callback;
    }

    deleteEvent(event){
        delete this.events[event];
    }

    callEvent(event, payload) {
        if(event in this.events) {
            this.events[event](payload);
        }
    }
}
