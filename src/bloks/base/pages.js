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