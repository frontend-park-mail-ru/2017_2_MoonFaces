(function() {

    const signUpForm = document.getElementById('signup-form');

    window.addNodeValidation(signUpForm.querySelector('[name=login]'), 'login');
    window.addNodeValidation(signUpForm.querySelector('[name=email]'), 'email');
    window.addNodeValidation(signUpForm.querySelector('[name=password]'), 'password');
    window.addNodeValidation(signUpForm.querySelector('[name=password-repeat]'), 'passwordMatch');

    signUpForm.addEventListener('submit', function(event) {
        window.removeError(signUpForm);
        window.User.signUp(
            signUpForm.querySelector('[name=login]').value,
            signUpForm.querySelector('[name=email]').value,
            signUpForm.querySelector('[name=password]').value).then(
            (response) => {
                window.Pages.showPage('login');
            }
        ).catch(errorPromise => errorPromise.then(error => {
            window.addError(signUpForm, error.description);
        }));
        event.returnValue = false;
    });
})();
