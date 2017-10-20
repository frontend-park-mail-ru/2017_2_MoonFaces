import BaseView from '../../modules/baseView';

class TopView extends BaseView {

    getTemplate() {
        const template =require('./top.pug');
        return template();
    }

}

export default TopView;