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
        this.authorized = null;
        this.bindBus();
    }

    bindBus() {
        this.bus.on('user:signin', (formData) => {
            const data = formData.payload;
            this.signIn(
                data['login'],
                data['password']
            ).then((response) => {
                this.login = response.login;
                this.email = response.email;
                this.score = response.score;
                this.authorized = true;
                router.go('/profile');
            }).catch(errorPromise => {
                return errorPromise.then((error) => {
                    alert(error.description);
                });
            });
        });

        this.bus.on('user:signup', (formData) => {
            const data = formData.payload;
            this.signUp(
                data['login'],
                data['email'],
                data['password']
            ).then(() => {
                router.go('/');
            }).catch(errorPromise => {
                return errorPromise.then((error) => {
                    alert(error.description);
                });
            });
        });
    }

    signUp(login, email, password) {
        return Http.Post('/signup', {login, email, password});
    }


    signIn(login, password) {
        return Http.Post('/signin', {login, password});
    }

    logOut() {
        this.authorized = false;
        return Http.Post('/logout', {});
    }

    isAuthenticated() {
        return Http.Get('/current').then((response) => {
            this.authorized = true;
            this.login = response.login;
            this.email = response.email;
            this.score = response.score;
        }, () => {
            this.authorized = false;
        });
    }
}

export default new User();
