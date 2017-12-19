
connect = () => new WebSocket(this.getWSUrl());

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

getWSUrl = () => {
    const domain = window.location.hostname;
    return `ws://${domain}:8081`;
}
