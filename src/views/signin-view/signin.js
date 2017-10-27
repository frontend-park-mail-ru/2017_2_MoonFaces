import BaseView from '../../modules/baseView';
import Form from '../../modules/form';
import bus from '../../modules/bus';

class SigninView extends BaseView {

    constructor(appContainer) {
        super(appContainer);
        this.bus = bus;
    }

    getTemplate() {
        const template =require('./signin.pug');
        return template();
    }

    postRender() {
        this.form = new Form(document.getElementById('login-form'), ['login', 'password']);
        this.form.addFieldValidation('login', 'login');
        this.form.addFieldValidation('password', 'password');

        this.form.onsubmit((formData) => {
            this.bus.emit('user:signin', formData);
        });
    }

}

export default SigninView;
