'use strict';
export function navigation() {

    const application = document.getElementById('application');
    const liveSectionsCollection = application.getElementsByTagName('section');
    const liveSectionsArray = Array.from(liveSectionsCollection);

    const signup = document.getElementsByClassName('signup')[0];
    const records = document.getElementsByClassName('records')[0];
    const about = document.getElementsByClassName('about')[0];
    const mainMenuList = Array.from(document.getElementsByClassName('main'));

    const setSectionHidden = (id, display) => liveSectionsArray
        .find(section => section.id === id)
        .style.display = display;

    const transitFromMainMenu = sectionName => {
        setSectionHidden('login', 'none');
        setSectionHidden(sectionName, 'block');
    };

    const showMainMenu = () => {
        liveSectionsArray
            .find(section => section.style.display === 'block')
            .style.display = 'none';
        setSectionHidden('login', 'block');
    };

    const showProfilePage = () => {
        liveSectionsArray
            .find(section => section.style.display === 'block')
            .style.display = 'none';
        setSectionHidden('profile', 'block');
    };

    for (var mainMenu of mainMenuList) {
        mainMenu.onclick = () => {
            showMainMenu();
        };
    }

    signup.onclick = () => transitFromMainMenu('signup');
    records.onclick = () => transitFromMainMenu('records');
    about.onclick = () => transitFromMainMenu('about');

    if(window.User.authenticated){
        transitFromMainMenu('profile');
    }
}
