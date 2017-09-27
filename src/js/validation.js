'use strict';

const email = document.getElementsByName('email')[0];
const passwordsCollection = document.getElementsByName('password');
const passwordsArray = Array.from(passwordsCollection);
const passwordRepeat = document.getElementsByName('password-repeat')[0];

email.onchange = () => {
    if(!/^\w+@[a-z]+\.[a-z]+$/g.test(email.value))
        alert('Invalid email');
};

passwordsArray.map(password => {
    password.onchange = () => {
        if (password.value.length < 8)
            alert('Your password must be at least 8 characters long');
    };
});

passwordRepeat.onchange = () => {
    if (passwordRepeat.value !== passwordsArray[1].value)
        alert('Passwords do not match');
};