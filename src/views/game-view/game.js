import BaseView from '../../modules/baseView';

class GameView extends BaseView {

    getTemplate() {
        const template = require('./game.pug');

        return template();
    }

}

export default GameView;
