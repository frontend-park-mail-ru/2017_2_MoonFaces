(function () {

    const signUpForm = document.getElementById('signup-form');

    window.addNodeValidation(signUpForm.querySelector('[name=login]'), 'login');
    window.addNodeValidation(signUpForm.querySelector('[name=email]'), 'email');
    window.addNodeValidation(signUpForm.querySelector('[name=password]'), 'password');
    window.addNodeValidation(signUpForm.querySelector('[name=password-repeat]'), 'passwordMatch');

    signUpForm.addEventListener('submit', function (event) {
        window.User.signUp(
            signUpForm.querySelector('[name=login]').value,
            signUpForm.querySelector('[name=email]').value,
            signUpForm.querySelector('[name=password]').value,
            function(error) {
                window.removeError(signUpForm);
                if(error) {
                    window.addError(signUpForm, JSON.parse(error.responseText).description);
                } else {
                    window.Pages.showPage('login');
                }
            }
        );
        event.returnValue = false;
    });
})();
