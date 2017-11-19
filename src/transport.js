const WebSocket = require('ws');

export default class Transport {
    constructor() {
        const address = 'ws://127.0.0.1:8080/game';
        //const address = 'wss://bacterio-back.herokuapp.com/game';

        this.ws = new WebSocket(address);
        this.ws.onopen = () => {
            console.log(`Success connect to socket ${address}`);
        };
        this.ws.onclose = (event) => {
            console.log(`Socket closed with code ${event.code}`);
        };
        this.ws.onmessage = (event) => { this.handleMessage(event); };

    }

    send(type, content) {
        if (this.ws.readyState === this.ws.CONNECTING) {
            setTimeout(() => {
                this.ws.send(JSON.stringify({ type, content }));
            }, 1000);
            return;
        }
        this.ws.send(JSON.stringify({type, content}));
    }

    closeSocket() {
        this.ws.close();
    }

}
