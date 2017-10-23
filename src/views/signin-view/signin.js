import BaseView from '../../modules/baseView';
import Form from '../../modules/form';


class SigninView extends BaseView {

    constructor(appContainer) {
        super(appContainer);
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
            console.log(formData);
        });
    }

}

export default SigninView;