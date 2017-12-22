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
        this.preClose();
        this.events.forEach((unsub) => {
            unsub();
        });
    }

    setPage() {

    }

    render() {
        this.appContainer.innerHTML = this.getTemplate();
        this.postRender();
    }

    preClose() {

    }
}

export default BaseView;
