import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
import Router from './modules/router';

import SigninView from './views/signin-view/signin';
import AboutView from './views/about-view/about';
import TopView from './views/top-view/top';

(() => {

    const app = document.getElementById('app');

    const router = new Router(app);
    router
        .addRoute('/', SigninView)
        .addRoute('/about', AboutView)
        .addRoute('/top', TopView);
    router.start();

})();