import BaseView from '../../modules/baseView';

class AboutView extends BaseView {

    getTemplate() {
        const template = require('./about.pug');
        return template();
    }

}

export default AboutView;
