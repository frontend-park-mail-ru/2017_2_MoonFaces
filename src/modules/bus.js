class Bus {

    constructor() {
        if (Bus.__instatnce) {
            return Bus.__instatnce;
        }
        this.listeners = {};
        Bus.__instance = this;
    }

    on(event, listener) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
        return function() {
            this.off(event, listener);
        }.bind(this);
    }

    off(event, listener) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event] = this.listeners[event].filter((element) => {
                return element !== listener;
            });
        }
    }

    emit(event, payload) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => {
                listener({
                    event: event,
                    payload: payload,
                });
            });
        }
    }

}

export default new Bus();
