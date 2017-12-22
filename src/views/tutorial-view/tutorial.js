import BaseView from '../../modules/baseView';
import TutorialTmpl from './tutorial.pug';

export default class TutorialView extends BaseView {

    getTemplate() {
        return TutorialTmpl();
    }

}
