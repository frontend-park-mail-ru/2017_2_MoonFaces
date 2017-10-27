import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import Game from '../../modules/game/main';

class GameView extends BaseView {

    getTemplate() {
        const template = require('./game.pug');
        const data = {
            username: user.login,
        };

        return template(data);
    }

    postRender() {
        this.game = new Game();
        this.game.start();
    }

}

export default GameView;
