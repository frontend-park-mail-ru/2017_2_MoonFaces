'use strict';
import './index.html';
import './style.scss';
import './images/background.jpg'
import './fonts/consola.ttf'

const application = document.getElementById('application');

const liveSectionsCollection = application.getElementsByTagName('section');
const liveSectionsArray = Array.from(liveSectionsCollection);

const signup = document.getElementsByClassName('signup')[0];
const records = document.getElementsByClassName('records')[0];
const about = document.getElementsByClassName('about')[0];
const mainMenu = document.getElementsByClassName('main')[0];

const setSectionHidden = (id, bool) => liveSectionsArray
    .find(section => section.id === id)
    .hidden = bool;

mainMenu.onclick = function () {
    liveSectionsArray
        .find(section => section.hidden === false)
        .hidden = true;
    setSectionHidden('login', false);
    mainMenu.hidden = true;
};

signup.onclick = function () {
    setSectionHidden('login', true);
    setSectionHidden('signup', false);
    mainMenu.hidden = false;
};

records.onclick = function () {
    setSectionHidden('login', true);
    setSectionHidden('records', false);
    mainMenu.hidden = false;
};


about.onclick = function () {
    setSectionHidden('login', true);
    setSectionHidden('about', false);
    mainMenu.hidden = false;
};


//отсюда новый модуль будет
const email = document.getElementsByName('email')[0];
const passwordsCollection = document.getElementsByName('password');
const passwordsArray = Array.from(passwordsCollection);
const passwordRepeat = document.getElementsByName('password-repeat')[0];

email.onchange = function () {
    if(!/^\w+@[a-z]+\.[a-z]+$/g.test(email.value))
        alert('Invalid email');
};

passwordsArray.map((password) => {
    password.onchange = () => {
        if (password.value.length < 8)
            alert('Your password must be at least 8 characters long');
    }
});

passwordRepeat.onchange = () => {
    if (passwordRepeat !== passwordsArray[1])
        alert('Passwords does not match');
};