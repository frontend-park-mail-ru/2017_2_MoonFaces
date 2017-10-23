class BaseView {
    constructor(appContainer) {
        this.appContainer = appContainer;
    }

    getTemplate() {

    }

    postRender() {

    }

    render() {
        this.appContainer.innerHTML = this.getTemplate();
        this.postRender();
    }
}

export default BaseView;