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

    addRoute(route, view, multiplePages=false) {
        this.routes.push({
            route: route,
            view: view,
            multiplePages: multiplePages,
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
            if (event.target.dataset['link'] === 'external') {
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
        let page = 0;
        const originalRoute = route;

        this.routes.find((item) => {
            route = originalRoute;
            if (route !== item.route) {
                if(item.multiplePages) {
                    page = route.substr(route.lastIndexOf('/') + 1);
                    route = route.replace( new RegExp(route.substr(route.lastIndexOf('/'))), '' );
                    if(route !== item.route) {
                        return false;
                    }
                }else{
                    return false;
                }
            }

            window.history.pushState({}, '', originalRoute);

            if (typeof item.view === 'function') {
                item.view = new item.view(this.rootElement);
            }
            if(this.currentView) {
                this.currentView.stop();
            }
            this.currentView = item.view;
            if(item.multiplePages) {
                item.view.setPage(((page) ? page : 1));
            }
            item.view.render();

            return true;

        });
    }
}

export default new Router();
