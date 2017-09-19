import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
import './js/http';
import './js/user';
import './js/forms';

window.remoteBackendUrl = 'https://bacterio-back.herokuapp.com/restapi';

(function () {

    const importedNavigation = require('./js/navigation');
    window.navigation = importedNavigation;
    const importedValidation = require('./js/validation');

    window.User.is_authenticated(importedNavigation.navigation);


})();