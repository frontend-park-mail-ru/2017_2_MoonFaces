import './background.js';
import './index.html';
import './style.scss';
import './fonts/consola.ttf';
import router from './modules/router';

import user from './services/user-service';

import SigninView from './views/signin-view/signin';
import AboutView from './views/about-view/about';
import TopView from './views/top-view/top';
import SignupView from './views/signup-view/signup';

(() => {

    const app = document.getElementById('app');

    router.setRootElement(app);

    const privateRoutes = [
        '/profile',
    ];
    router
        .addRoute('/', SigninView)
        .addRoute('/about', AboutView)
        .addRoute('/top', TopView)
        .addRoute('/signup', SignupView);
    router.start();


    if(user.isAuthenticated()) {
        if(window.location.pathname === '/') {
            router.go('/profile');
        }
    } else {
        if(privateRoutes.includes(window.location.pathname)) {
            router.go('/');
        }
    }

})();