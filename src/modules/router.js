class Router {
    constructor() {
        if (Router.__instatnce) {
            return Router.__instatnce;
        }
        Router.__instance = this;
        this.currentView = null;
        this.routes = [];
        this.rootElement = null;
    }

    setRootElement(rootElelement) {
        this.rootElement = rootElelement;
    }

    addRoute(route, view) {
        this.routes.push({
            route: route,
            view: view,
        });
        return this;
    }

    start(path=null) {
        window.onpopstate = function() {
            this.go(window.location.pathname);
        }.bind(this);

        this.rootElement.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() !== 'a') {
                return;
            }
            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);
        });
        if(path) {
            this.go(path);
        }
        this.go(window.location.pathname);
    }

    go(route) {
        this.routes.find((item) => {
            if (route !== item.route) {
                return false;
            }

            if (window.location.pathname !== item.route) {
                window.history.pushState({}, '', item.route);
            }

            if (typeof item.view === 'function') {
                item.view = new item.view(this.rootElement);
            }
            if(this.currentView) {
                this.currentView.stop();
            }
            this.currentView = item.view;
            item.view.render();

            return true;

        });
    }
}

export default new Router();
