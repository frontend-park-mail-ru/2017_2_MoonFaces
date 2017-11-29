import RequestLogger from './utils/requestLogger';
import User from './User';

class ClientsList {
    constructor() {
        if(ClientsList.__instance){
            return ClientsList.__instance;
        }
        ClientsList.__instance = this;
        this.users = {};
    }

    addUser(username, ws) {
        if(username in this.users) {
            console.log(RequestLogger.error('User already authorized'));
            return;
        }
        this.users[username] = new User(username, ws);
        return this.users[username];
    }

    deleteUser(username) {
        delete this.users[username];
    }

    getUser(username){
        return this.users[username];
    }
}

export default new ClientsList();
