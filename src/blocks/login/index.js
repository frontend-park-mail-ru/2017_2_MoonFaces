const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementsByClassName('logout')[0];

window.addNodeValidation(loginForm.querySelector('[name=login]'), 'login');
window.addNodeValidation(loginForm.querySelector('[name=password]'), 'password');

loginForm.addEventListener('submit', function (event) {
    window.removeError(loginForm);

    const errors = loginForm.getElementsByClassName('error-row');
    if (errors.length === 0) {
        window.User.signIn(
            loginForm.querySelector('[name=login]').value,
            loginForm.querySelector('[name=password]').value).then(
            response => {
                window.User.is_authenticated = true;
                window.User.login = response.login;
                window.User.email = response.email;
                window.User.score = response.score;
                window.renderProfile();
                window.Pages.showPage('profile');
            },
            error => {
                window.addError(loginForm, 'Произошла ошибка');
            });
    }
    event.returnValue = false;
});

logoutButton.addEventListener('click', function (event) {
    window.User.logOut().then(
        response => {
            window.User.is_authenticated = false;
            window.Pages.showPage('login');
        },
        error => {
        }
    );
    event.returnValue = false;
});