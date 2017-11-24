import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import Game from '../../modules/game/main';
import gameTmpl from './game.pug';

class GameView extends BaseView {

    getTemplate() {
        const data = {
            username: user.login,
        };

        return gameTmpl(data);
    }

    postRender() {
        this.game = new Game();
        this.game.start();
    }

}

export default GameView;
