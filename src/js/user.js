'use strict';

class User {
    constructor() {
        this.authenticated = false;
    }

    is_authenticated(callback) {
        Http.Get('/me', function (error, response) {
            window.User.authenticated = error === null;
            callback();

        });
    }

    sign_up(login, email, password, callback) {
        Http.Post('/signup', {login, email, password}, callback);
    }

    login(login, email, password, callback) {
        Http.Post('/login', {login, password}, callback);
    }
}

window.User = new User();