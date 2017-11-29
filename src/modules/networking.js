class Networking {
    constructor() {
        if (Networking.__instatnce) {
            return Networking.__instatnce;
        }
        Networking.__instance = this;
    }

    connect(callback) {
        this.ws = new WebSocket(this.getWSUrl());
        return this.ws;
    }

    async auth(username) { // temporary costil while multiplayer on node
        this.ws.send(JSON.stringify({
            type: 'auth', payload: {
                username: username
            }
        }));
    }

    disconnect() {
        this.ws.close();
        delete this.ws;
    }

    getWSUrl() {
        const domain = window.location.hostname;
        return `ws://${domain}:8081`;
    }
}

export default new Networking();
