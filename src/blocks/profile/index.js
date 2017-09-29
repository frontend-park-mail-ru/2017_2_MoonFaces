window.renderProfile = () => {

    const templateContainer = document.getElementById('profile-template');
    templateContainer.innerHTML = '';

    let topPlayers = require('./profile.pug');

    let data = {user:
        {
            name: window.User.login,
            email: window.User.email,
            score: window.User.score
        }};


    templateContainer.innerHTML = topPlayers(data);

};
