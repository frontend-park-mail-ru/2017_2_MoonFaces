import GameSession from './GameSession';
import clientsList from './clientsList';

class GameList {
    constructor() {
        if(GameList.__instance) {
            return GameList.__instance;
        }
        GameList.__instance = this;
        this.games = {};
    }

    getOpenSessions() {
        const openGames = [];
        for(const key in this.games) {
            if(this.games[key].players.length === 1) {
                openGames.push(key);
            }
        }
        return openGames;
    }

    addGame(username) {
        this.games[username] = new GameSession();
        this.games[username].addPlayer(clientsList.getUser(username));
    }
}

export default new GameList();
