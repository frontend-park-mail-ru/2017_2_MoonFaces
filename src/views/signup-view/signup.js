import BaseView from '../../modules/baseView';


class Signup extends BaseView {

    constructor(appContainer) {
        super(appContainer);
    }


    getTemplate() {
        const template = require('./signup.pug');

        return template();
    }

}

export default Signup;