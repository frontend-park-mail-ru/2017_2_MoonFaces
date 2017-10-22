import BaseView from '../../modules/baseView';

class Signup extends BaseView {

    getTemplate() {
        const template =require('./signup.pug');

        return template();
    }

}

export default Signup;