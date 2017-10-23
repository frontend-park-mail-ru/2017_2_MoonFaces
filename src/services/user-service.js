import Http from '../modules/http';
import bus from '../modules/bus';
import router from '../modules/router';

class User {
    constructor() {
        if (User.__instatnce) {
            return User.__instatnce;
        }
        this.listeners = {};
        User.__instance = this;
        this.bus = bus;
        this.bindBus();
    }

    bindBus() {
        this.bus.on('user:signup', function(formData) {
            let data = formData.payload;
            this.signUp(
                data['login'],
                data['email'],
                data['password']
            ).then((response) => {
                router.go('/');
            }).catch(errorPromise => errorPromise.then(function(error) {
                alert(error.description);
            }));
        }.bind(this));
    }

    signUp(login, email, password) {
        return Http.Post('/signup', {login, email, password});
    }


    signIn(login, password) {
        return Http.Post('/signin', {login, password});
    }

    logOut() {
        return Http.Post('/logout', {});
    }

    isAuthenticated() {
        Http.Get('/current').then((response) => {
            this.authorized = true;
            this.login = response.login;
            this.email = response.email;
            this.score = response.score;
            window.Pages.showPage('profile');
        }, () => {
            this.authorized = false;
        });
        return this.authorized;
    }
}

export default new User();