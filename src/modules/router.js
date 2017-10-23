class Router {
    constructor(rootElement) {
        this.currentView = null;
        this.routes = [];
        this.rootElement = rootElement;
    }

    addRoute(route, view) {
        this.routes.push({
            route: route,
            view: view,
        });
        return this;
    }

    start() {
        window.onpopstate = function(e) {
            this.go(window.location.pathname);
        }.bind(this);

        this.rootElement.addEventListener('click', function(event) {
            if (event.target.tagName.toLowerCase() !== 'a') {
                return;
            }
            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);
        }.bind(this));

        this.go(window.location.pathname);
    }

    go(route) {
        this.routes.find(function(item) {
            if (route !== item.route) {
                return false;
            }

            if (window.location.pathname !== item.route) {
                window.history.pushState({}, '', item.route);
            }

            if (typeof item.view === 'function') {
                item.view = new item.view(this.rootElement);
                item.view.render();
            }

            this.currentView = item.view;
            item.view.render();

            return true;

        }.bind(this));
    }
}

export default Router;