const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
    window.User.signIn(
        loginForm.querySelector('[name=login]').value,
        loginForm.querySelector('[name=password]').value,
        function(xhr){document.Pages.showPage('profile');}
    );
    event.returnValue = false;
});