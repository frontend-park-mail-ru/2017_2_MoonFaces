export default class User {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
    }

    getUsername(){
        return this.username;
    }

    getSocket(){
        return this.socket;
    }
}
