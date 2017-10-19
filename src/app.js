import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
import Router from './modules/router';
import BaseView from './modules/baseView';
(() => {

    const app = document.getElementById('app');

    const router = new Router(app);
    router
        .addRoute('/ss', BaseView)
        .addRoute('/kek', BaseView);
    router.start();

})();