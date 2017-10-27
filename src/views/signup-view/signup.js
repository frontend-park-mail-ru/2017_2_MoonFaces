import BaseView from '../../modules/baseView';
import Form from '../../modules/form';
import bus from '../../modules/bus';

class Signup extends BaseView {

    constructor(appContainer) {
        super(appContainer);
        this.bus = bus;
        this.events = [];
    }

    postRender() {
        this.form = new Form(document.getElementById('signup-form'), ['login', 'email', 'password', 'password-repeat']);
        this.form.addFieldValidation('login', 'login');
        this.form.addFieldValidation('email', 'email');
        this.form.addFieldValidation('password', 'password');
        this.form.addFieldValidation('password-repeat', 'passwordMatch');


        this.form.onsubmit((formData) => {
            this.bus.emit('user:signup', formData);
        });
        console.log(this.events);
    }

    getTemplate() {
        const template = require('./signup.pug');

        return template();
    }

}

export default Signup;
