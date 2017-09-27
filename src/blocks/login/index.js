const loginForm = document.getElementById('login-form');

window.addNodeValidation(loginForm.querySelector('[name=login]'), 'login');
window.addNodeValidation(loginForm.querySelector('[name=password]'), 'password');

loginForm.addEventListener('submit', function (event) {
    window.User.signIn(
        loginForm.querySelector('[name=login]').value,
        loginForm.querySelector('[name=password]').value,
        function(){document.Pages.showPage('profile');}
    );
    event.returnValue = false;
});