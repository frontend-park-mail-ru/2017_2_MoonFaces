class Networking {
    constructor() {
        this.events = {};
    }

    connect(callback) {
        this.ws = new WebSocket(this.getWSUrl());
        this.bindSocket();
        this.ws.onopen = callback;
        return this;
    }

    send(method, data={}) {
        data['type'] = method;
        this.ws.send(JSON.stringify(data));
    }

    disconnect() {
        this.ws.close();
        delete this;
    }

    getWSUrl() {
        // return `ws://${window.location.hostname}/multiplayer`;
        return `ws://localhost:8080/multiplayer`;
    }

    bindSocket() {
        this.ws.onmessage = (data) => {
            const message = JSON.parse(data.data);
            const key = message.type;
            if(key in this.events) {
                this.events[key](message);
            }
        };
    }

    addEvent(event, callback) {
        this.events[event] = callback;
    }

    deleteEvent(event) {
        delete this.events[event];
    }

    dropAllEvents() {
        this.events = {};
    }
}

export default new Networking();
