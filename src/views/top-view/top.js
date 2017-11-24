import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import topTmpl from './top.pug';

class TopView extends BaseView {
    constructor(appContainer) {
        super(appContainer);
        this.topPage = 0;
    }

    setPage(page) {
        this.topPage = parseInt(page);
    }

    render() {

        user.getTopUsers(parseInt(this.topPage - 1)).then(
            (response) => {
                const data = {
                    users: response.users,
                    next: (( response.pages > this.topPage) ? parseInt(this.topPage) + 1 : false),
                    prev: ((this.topPage > 0) ? parseInt(this.topPage) -1 : false),
                    authorized: user.authorized,
                };
                this.appContainer.innerHTML = topTmpl(data);
            }
        );

    }

}

export default TopView;
