import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import router from '../../modules/router';

class ProfileView extends BaseView {

    getTemplate() {
        const template = require('./profile.pug');

        const data = {user:
            {
                name: user.login,
                email: user.email,
                score: user.score
            }};

        return template(data);
    }

    postRender() {
        const logout = document.getElementsByClassName('logout')[0];
        logout.addEventListener('click', () => {
            user.logOut();
            router.go('/');
        });
    }

}

export default ProfileView;
