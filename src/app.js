import './index.html';
import './style.scss';
import './images/background.jpg'
import './fonts/consola.ttf'
'use strict';


const app = (function () {
    const importedNavigation = require('./js/navigation');
    const importedValidation = require('./js/validation.js');

    return {
        importedNavigation : importedNavigation,
        importedValidation : importedValidation
    }
})();

module.exports = app;