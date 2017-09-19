'use strict';

class User {
    constructor() {
        this.authenticated = false;
    }

    is_authenticated(callback = () =>{}) {
        Http.Get('/current', function (error, response) {
            window.User.authenticated = error === null;
            callback();
        });
    }

    sign_up(login, email, password, callback) {
        Http.Post('/signup', {login, email, password},
            function (xhr) {
                window.User.is_authenticated(callback);
                callback(xhr);
            }
        );
    }

    login(login, password, callback) {
        Http.Post('/signin', {login, password},
            function (xhr) {
                window.User.is_authenticated(callback);
                callback(xhr);
            });
    }
}

window.User = new User();