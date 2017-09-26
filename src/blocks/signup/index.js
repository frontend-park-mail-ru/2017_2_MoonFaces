const signUpForm = document.getElementById('signup-form');


signUpForm.addEventListener('submit', function (event) {
    window.User.signUp(
        signUpForm.querySelector('[name=login]').value,
        signUpForm.querySelector('[name=email]').value,
        signUpForm.querySelector('[name=password]').value,
        function(xhr){window.navigation.navigation();}
    );
    event.returnValue = false;
});