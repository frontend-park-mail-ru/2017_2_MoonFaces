import EventEmitter from './eventEmitter';

const ee = new EventEmitter();

export default class Transport {
    constructor() {
        if (Transport.instance) {
            return Transport.instance;
        }
        const address = 'ws://127.0.0.1:8080/multi';
        //const address = 'ws://bacterio-back.herokuapp.com/multi';

        this.ws = new WebSocket(address);
        this.ws.onopen = () => {
            console.log(`Success connect to socket ${address}`);
        };
        this.ws.onclose = (event) => {
            console.log(`Socket closed with code ${event.code}`);
        };
        this.ws.onmessage = (event) => { this.handleMessage(event); };

        Transport.instance = this;
    }

    handleMessage(event) {
        const messageText = event.data;
        const message = JSON.parse(messageText);
        // if (message.type === 'com.aerohockey.mechanics.base.ServerSnap') {
        ee.emit(message.type, message);
        // }
        // else {
        //   //console.log(message);
        //   ee.emit('print', messageText);
        // }
    }

    send(type, content) {
        //console.log(JSON.stringify({ type, content }));
        this.ws.send(JSON.stringify({ type, content }));
        // this.ws.send(JSON.stringify({
        // type: 'com.aerohockey.mechanics.requests.JoinGame$Request',
        // content: '{}',
        // }));
    }


}