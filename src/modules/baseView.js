class BaseView {
    constructor(appContainer) {
        this.appContainer = appContainer;
        this.events = [];
    }

    getTemplate() {

    }

    postRender() {

    }

    stop() {
        this.events.forEach((unsub) => {
            unsub();
        });
    }

    render() {
        this.appContainer.innerHTML = this.getTemplate();
        this.postRender();
    }
}

export default BaseView;
