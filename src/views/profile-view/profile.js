import BaseView from '../../modules/baseView';
import user from '../../services/user-service';
import router from '../../modules/router';
import Transport from '../../transport';

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

        const multiplayer = document.getElementsByClassName('multiplayer')[0];
        multiplayer.addEventListener('click', () => {
            const transport = new Transport();

            const type = 'test';
            const content = {
                login: 'qwerty1',
                id: 123
            };
            transport.send(type, content);
        });
    }

}

export default ProfileView;
