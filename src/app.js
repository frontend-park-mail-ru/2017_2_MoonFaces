import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
import './js/http';
import './js/user';
import './js/forms';

(function () {

    const importedNavigation = require('./js/navigation');
    const importedValidation = require('./js/validation');

    window.User.is_authenticated(importedNavigation.navigation);


})();