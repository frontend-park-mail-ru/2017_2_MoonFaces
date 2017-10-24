class Themes {
    constructor() {
        const template = require('./themes.pug');
        const body = document.querySelector('body');
        this.cssBlock = null;
        this.node = document.createElement('section');
        this.node.setAttribute('class', 'themes');
        this.node.innerHTML = template();
        body.appendChild(this.node);
        this.cssDefault = 'style.css';
        this.cssDark = 'dark.css';
        this.current = this.getCurrent();
    }

    run() {
        this.addTheme();
        this.node.addEventListener('click', () => {
            if(this.current === this.cssDefault) {
                this.current =  this.cssDark;
            }else{
                this.current =  this.cssDefault;
            }
            this.setCurrent();
        });
    }

    setCurrent() {
        localStorage.setItem('theme', this.current);
        this.cssBlock.setAttribute('href', this.current);
    }

    getCurrent() {
        let theme = localStorage.getItem('theme');
        if(theme) {
            return theme;
        }
        return 'style.css';
    }

    addTheme() {
        const head = document.querySelector('head');
        this.cssBlock = document.createElement('link');
        this.cssBlock.setAttribute('rel', 'stylesheet');
        this.cssBlock.setAttribute('href', this.current);
        head.appendChild(this.cssBlock);
    }
}

export default Themes;