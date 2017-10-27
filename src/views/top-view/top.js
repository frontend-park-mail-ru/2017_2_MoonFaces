import BaseView from '../../modules/baseView';
import user from '../../services/user-service';

class TopView extends BaseView {
    constructor(appContainer) {
        super(appContainer);
        this.topPage = 0;
    }

    setPage(page){
        this.topPage = parseInt(page);
    }

    render() {
        const template = require('./top.pug');

        user.getTopUsers(parseInt(this.topPage - 1)).then(
            (response) => {
                const data = {
                    users: response.users,
                    next: (( response.pages > this.topPage) ? parseInt(this.topPage) + 1 : false),
                    prev: ((this.topPage > 0) ? parseInt(this.topPage) -1 : false),
                };
                this.appContainer.innerHTML = template(data);
            }
        );

    }

}

export default TopView;
