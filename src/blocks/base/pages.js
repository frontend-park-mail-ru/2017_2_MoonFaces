(function(){

    class Pages{
        constructor(){
            this.sections = Array.from(document.getElementsByTagName('section'));


        }

        hideAll(){
            for(let section of this.sections){
                section.style.display = 'none';
            }
        }

        showPage(sectionName){
            this.hideAll();
            if (sectionName === 'login' && window.User.is_authenticated === true) {
                document.getElementById('profile').style.display = 'block';
            } else {
                document.getElementById(sectionName).style.display = 'block';
            }
        }

    }

    window.Pages = new Pages();

})();


const topPlayers = Array.from(document.getElementsByClassName('records'));
const about = Array.from(document.getElementsByClassName('about'));
const signup = document.getElementsByClassName('signup')[0];
const main = Array.from(document.getElementsByClassName('main'));

signup.addEventListener('click', (event) => {
    event.preventDefault();
    window.Pages.showPage('signup');
});

topPlayers.map (
    button => button.addEventListener('click', (event) => {
        event.preventDefault();
        window.Pages.showPage('records');
    })
);

about.map (
    button => button.addEventListener('click', (event) => {
        event.preventDefault();
        window.Pages.showPage('about');
    })
);

main.map(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        window.Pages.showPage('login');
    });
});