export default class GameScores {
    constructor(player1, player2, scores1, scores2, win, appContainer) {
        this.appContainer = appContainer;

        this.player1 = player1;
        this.player2 = player2;
        this.scores1 = scores1;
        this.scores2 = scores2;
        this.win = win;
    }

    show() {
        const template = require('./game-scores.pug');

        const winnerScore = (this.scores1 > this.scores2) ? this.scores1 : this.scores2;
        const winnerName = (this.scores1 > this.scores2) ? this.player1 : this.player2;
        const looserScore = (this.scores1 < this.scores2) ? this.scores1 : this.scores2;
        const looserName = (this.scores1 < this.scores2) ? this.player1 : this.player2;
        const gameOverText = (this.scores1 > this.scores2) ? 'You win :)' : 'You Loose :(';

        const data = {
            gameOverText: gameOverText,
            winnerName: winnerName,
            looserName: looserName,
            winnerScore: winnerScore,
            looserScore: looserScore,
            win: this.win,
        };

        this.appContainer.innerHTML = template(data);
    }
}
