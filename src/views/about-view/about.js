import BaseView from '../../modules/baseView';
import aboutTmpl from './about.pug';

class AboutView extends BaseView {

    getTemplate() {
        return aboutTmpl();
    }

}

export default AboutView;
