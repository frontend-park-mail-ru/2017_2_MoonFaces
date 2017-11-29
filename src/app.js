import './index.html';
import './style.scss';
import './dark.scss';
import './fonts/consola.ttf';
import './images/moon.png';
import './images/sun.png';
import 'file-loader?name=site.js!./site.js';
import 'file-loader?name=serviceWorker.js!./serviceWorker.js';
import './pixel.png';

import Themes from './modules/themes/themes';

import router from './modules/router';

import user from './services/user-service';

import SigninView from './views/signin-view/signin';
import AboutView from './views/about-view/about';
import TopView from './views/top-view/top';
import SignupView from './views/signup-view/signup';
import ProfileView from './views/profile-view/profile';
import SingleplayerView from './views/singleplayer-view/singleplayer';
import MultiplayerView from './views/multiplayer-view/multiplayer';

(() => {
    const themes = new Themes();
    themes.run();
    const app = document.getElementById('app');

    router.setRootElement(app);

    const privateRoutes = [
        '/profile',
        '/game/singleplayer',
        '/game/multiplayer',
    ];
    const onlyUnauth = [
        '/',
    ];
    router
        .addRoute('/', SigninView)
        .addRoute('/about', AboutView)
        .addRoute('/top', TopView, true)
        .addRoute('/signup', SignupView)
        .addRoute('/profile', ProfileView)
        .addRoute('/game/singleplayer', SingleplayerView)
        .addRoute('/game/multiplayer', MultiplayerView);


    user.isAuthenticated().then(() => {
        if(user.authorized) {
            if(onlyUnauth.includes(window.location.pathname)) {router.start('/profile');}
            router.start();
        }else{
            if(privateRoutes.includes(window.location.pathname)) {router.start('/');}
            router.start();
        }
    });

})();
