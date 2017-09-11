'use strict';
import './index.html';
import './style.scss';

const application = document.getElementById('application');

const liveSectionsCollection = application.getElementsByTagName('section');
const liveSectionsArray = Array.from(liveSectionsCollection);

const signup = document.getElementsByClassName('signup')[0];
const records = document.getElementsByClassName('records')[0];
const about = document.getElementsByClassName('about')[0];
const mainMenu = document.getElementsByClassName('main')[0];

mainMenu.onclick = function () {
    liveSectionsArray
        .find(section => section.hidden === false)
        .hidden = true;

    liveSectionsArray
        .find(section => section.id === 'login')
        .hidden = false;

    mainMenu.hidden = true;
};

signup.onclick = function () {
    event.target.parentElement.hidden = true;
    liveSectionsArray
        .find(section => section.id === 'signup')
        .hidden = false;

    mainMenu.hidden = false;
};

records.onclick = function () {
    event.target.parentElement.hidden = true;
    const nextSection = liveSectionsArray
        .find(section => section.id === 'records')
        .hidden = false;

    mainMenu.hidden = false;
};


about.onclick = function () {
    event.target.parentElement.hidden = true;
    const nextSection = liveSectionsArray
        .find(section => section.id === 'about')
        .hidden = false;

    mainMenu.hidden = false;
};
