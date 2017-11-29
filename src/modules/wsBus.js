class WsBus {
    constructor() {
        if(WsBus.__instance) {
            return WsBus.__instance;
        }
        WsBus.__instance = this;
        this.events = {};
    }

    bindSocket(ws) {
        this.ws = ws;
        this.ws.onmessage = (data) => {
            const message = JSON.parse(data.data);
            const key = message.type;
            const payload = message.payload;
            if(key in this.events) {
                this.events[key](payload);
            }
        };
    }

    addEvent(event, callback) {
        this.events[event] = callback;
    }

    deleteEvent(event) {
        delete this.events[event];
    }

}

export default new WsBus();
