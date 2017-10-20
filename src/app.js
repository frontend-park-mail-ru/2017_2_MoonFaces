import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
import Router from './modules/router';
import BaseView from './modules/baseView';
import SigninView from './views/signin-view/signin';
(() => {

    const app = document.getElementById('app');

    const router = new Router(app);
    router
        .addRoute('/', SigninView)
        .addRoute('/about', BaseView);
    router.start();

})();