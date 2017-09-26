import './index.html';
import './style.scss';
import './images/background.jpg';
import './fonts/consola.ttf';
// import './js/user';
// import './js/forms';

import './blocks/base/pages';
import './blocks/top';
import './js/http';
import {User} from './blocks/base/user';

window.remoteBackendUrl = '';
// window.remoteBackendUrl = 'https://bacterio-back.herokuapp.com/restapi';

window.User = new User();
