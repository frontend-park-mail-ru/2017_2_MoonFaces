const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementsByClassName('logout')[0];

window.addNodeValidation(loginForm.querySelector('[name=login]'), 'login');
window.addNodeValidation(loginForm.querySelector('[name=password]'), 'password');

loginForm.addEventListener('submit', function (event) {
    const errors = loginForm.getElementsByClassName('error-row');
    if(errors.length === 0) {
        window.User.signIn(
            loginForm.querySelector('[name=login]').value,
            loginForm.querySelector('[name=password]').value,
            function(error, response) {
                window.removeError(loginForm);
                if(error) {
                    window.addError(loginForm, JSON.parse(error.responseText).description);
                } else {
                    window.User.isAuthenticated = true;
                    window.User.login = response.login;
                    window.User.email = response.email;
                    window.User.score = response.score;
                    window.renderProfile();
                    window.Pages.showPage('profile');
                }
            }
        );
    }
    event.returnValue = false;
});

logoutButton.addEventListener('click', function (event) {
    window.User.logOut(
        function () {window.Pages.showPage('login');}
    );
    event.returnValue = false;
});