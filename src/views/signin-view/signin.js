import BaseView from '../../modules/baseView';

class SigninView extends BaseView {

    getTemplate() {
        const template =require('./signin.pug');
        return template();
    }

}

export default SigninView;