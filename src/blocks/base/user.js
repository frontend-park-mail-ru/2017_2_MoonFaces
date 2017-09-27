'use strict';

export class User {
    constructor() {
        Http.Get('/current', function (error, response) {
            let user = window.User;
            if(error){
                user.is_authenticated = false;
                window.Pages.showPage('login');
            }else{
                user.is_authenticated = true;
                user.login = response.login;
                user.email = response.email;
                user.score = response.score;
                window.Pages.showPage('profile');
            }

        });
    }

    signUp(login, email, password, callback) {
        Http.Post('/signup', {login, email, password},
            function (error, response) {
                callback(error, response);
            }
        );
    }

    signIn(login, password, callback) {
        Http.Post('/signin', {login, password},
            function (error, response) {
                callback(error, response);
            });
    }
}
