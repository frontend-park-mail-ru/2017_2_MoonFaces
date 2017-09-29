'use strict';

export class User {
    constructor() {
        Http.Get('/current').then((response) => {
            window.User.isAuthenticated = true;
            window.User.login = response.login;
            window.User.email = response.email;
            window.User.score = response.score;
            window.renderProfile();
            window.Pages.showPage('profile');
        }, () => {
            window.User.isAuthenticated = false;
            window.Pages.showPage('login');
        });
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
}
