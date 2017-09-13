'use strict';

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

const transitFromMainMenu = (sectionName) => {
    setSectionHidden('login', true);
    setSectionHidden(sectionName, false);
    mainMenu.style.visibility = "visible";
};

mainMenu.onclick = () => {
    liveSectionsArray
        .find(section => section.hidden === false)
        .hidden = true;
    setSectionHidden('login', false);
    mainMenu.style.visibility = "hidden";
};

signup.onclick = () => transitFromMainMenu('signup');
records.onclick = () => transitFromMainMenu('records');
about.onclick = () => transitFromMainMenu('about');