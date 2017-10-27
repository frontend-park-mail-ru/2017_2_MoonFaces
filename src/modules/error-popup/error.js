export default class Error {
    constructor(errorText) {
        this.errorText = errorText;

        const body = document.querySelector('body');
        this.errorNode = body.getElementsByClassName('error-node')[0];
        this.renderError();
    }

    renderError() {
        const template = require('./error.pug');

        const data = {
            error: this.errorText,
        };

        this.errorNode.innerHTML = template(data);
    }
}
