import BaseView from '../../modules/baseView';
import user from '../../services/user-service';

class ProfileView extends BaseView {

    getTemplate() {
        const template = require('./profile.pug');

        let data = {user:
            {
                name: user.login,
                email: user.email,
                score: user.score
            }};

        return template(data);
    }

}

export default ProfileView;