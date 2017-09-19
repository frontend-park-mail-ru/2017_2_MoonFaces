const signUpForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');


signUpForm.addEventListener('submit', function (event) {
    window.User.sign_up(
        signUpForm.querySelector('[name=login]').value,
        signUpForm.querySelector('[name=email]').value,
        signUpForm.querySelector('[name=password]').value,
        function(xhr){window.navigation.navigation();}
    );
    event.returnValue = false;
});

loginForm.addEventListener('submit', function (event) {
    window.User.login(
        loginForm.querySelector('[name=login]').value,
        loginForm.querySelector('[name=password]').value,
        function(xhr){window.navigation.navigation();}
    );
    event.returnValue = false;
});