class BaseView {
    constructor(appContainer) {
        this.appContainer = appContainer;
    }

    getTemplate() {

    }


    pause() {

    }

    resume() {

    }

    render() {
        this.appContainer.innerHTML = this.getTemplate();
    }
}

export default BaseView;