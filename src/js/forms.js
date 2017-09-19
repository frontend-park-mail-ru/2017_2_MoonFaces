const signUpForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');


signUpForm.addEventListener('submit', function (event) {
    window.User.sign_up(
        signupForm.querySelector('[name=login]').value,
        signupForm.querySelector('[name=email]').value,
        signupForm.querySelector('[name=password]').value,
        function(s){console.log(s)}
    );
    event.returnValue = false;
});

loginForm.addEventListener('submit', function (event) {
    window.User.login(
        signupForm.querySelector('[name=login]').value,
        signupForm.querySelector('[name=email]').value,
        signupForm.querySelector('[name=password]').value,
        function(s){console.log(s)}
    );
    event.returnValue = false;
});