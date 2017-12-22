import BaseView from '../../modules/baseView';
import TutorialTmpl from './tutorial.pug';
import user from '../../services/user-service';

export default class TutorialView extends BaseView {

    getTemplate() {
        return TutorialTmpl({
            back:(user.authorized)? '/profile': '/',
        });
    }

}
