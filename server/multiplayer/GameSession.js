export default class GameSession {
    constructor() {
        this.players = [];
        this.scores = {};
    }

    addPlayer(user) {
        this.players.push(user);
        this.scores[user.username] = 0;
    }
}
