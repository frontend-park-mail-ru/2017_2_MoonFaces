const loginForm = document.getElementById('login-form')

window.addNodeValidation(loginForm.querySelector('[name=login]'), 'login');
window.addNodeValidation(loginForm.querySelector('[name=password]'), 'password');

loginForm.addEventListener('submit', function (event) {
    const errors = loginForm.getElementsByClassName('error-row');
    if(errors.length === 0){
        window.User.signIn(
            loginForm.querySelector('[name=login]').value,
            loginForm.querySelector('[name=password]').value,
            function(error, response){
                if(error){
                    alert(error.responseText);
                }else{
                    window.User.is_authenticated = true;
                    window.User.login = response.login;
                    window.User.email = response.email;
                    window.User.score = response.score;
                    window.Pages.showPage('profile');
                }
            }
        );
    }
    event.returnValue = false;
});