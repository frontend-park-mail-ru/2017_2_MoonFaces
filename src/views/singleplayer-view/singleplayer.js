import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import Singleplayer from '../../modules/game/single';
import singleplayerTmpl from './singleplayer.pug';


class SingleplayerView extends BaseView {

    getTemplate() {
        const data = {
            username: user.login,
        };

        return singleplayerTmpl(data);
    }

    postRender() {
        this.game = new Singleplayer(
            document.getElementsByClassName('game_field-grid')[0],
            document.getElementsByClassName('game_field-field')[0],
            document.getElementsByClassName('game_player-score'),
            document.getElementsByClassName('game_opponent-score'),
            document.getElementsByClassName('game_end-turn')[0],
            document.getElementsByClassName('game_user-name')[0],
            document.getElementsByClassName('game_opponent-name')[0],
            this.appContainer,
        );
        this.game.start();
    }

}

export default SingleplayerView;
