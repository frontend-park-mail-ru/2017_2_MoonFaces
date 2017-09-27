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
            document.getElementById(sectionName).style.display = 'block';
        }

    }

    document.Pages = new Pages();

})();


const topPlayers = document.getElementsByClassName('records')[0];
const about = document.getElementsByClassName('about')[0];
const signup = document.getElementsByClassName('signup')[0];
const main = Array.from(document.getElementsByClassName('main'));

signup.addEventListener('click', (event) => {
    event.preventDefault();
    document.Pages.showPage('signup')
});

topPlayers.addEventListener('click', (event) => {
    event.preventDefault();
    document.Pages.showPage('records')
});

about.addEventListener('click', (event) => {
    event.preventDefault();
    document.Pages.showPage('about')
});

for (let button of main) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        document.Pages.showPage('login')
    })
}