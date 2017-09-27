'use strict';

export class User {
    constructor() {
        Http.Get('/current', function (error, response) {
            let user = window.User;
            if(error){
                user.is_authenticated = false;
                document.Pages.showPage('login');
            }else{
                user.is_authenticated = true;
                user.login = response.login;
                user.email = response.email;
                user.score = response.score;
                document.Pages.showPage('profile');
            }
        });
    }

    signUp(login, email, password, callback) {
        Http.Post('/signup', {login, email, password},
            function (xhr) {
                callback(xhr);
            }
        );
    }


    signIn(login, password, callback) {
        Http.Post('/signin', {login, password},
            function (xhr) {
                window.User.is_authenticated=true;
                callback(xhr);
            });
    }

    logOut(callback) {
        Http.Post('/logout', {},
            function (xhr) {
                window.User.is_authenticated=false;
                callback(xhr);
            }
        );
    }
}
