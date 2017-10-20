import BaseView from '../../modules/baseView';

class SigninView extends BaseView {

    getTemplate() {
        const template =require('./signin.pug');
        const data = {};
        return template(data);
    }

}

export default SigninView;