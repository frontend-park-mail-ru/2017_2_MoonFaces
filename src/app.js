import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
import Router from './modules/router';

import SigninView from './views/signin-view/signin';
import AboutView from './views/about-view/about';
(() => {

    const app = document.getElementById('app');

    const router = new Router(app);
    router
        .addRoute('/', SigninView)
        .addRoute('/about', AboutView);
    router.start();

})();