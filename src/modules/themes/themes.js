import Background from '../../background';

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
        this.background = null;
        this.bgColorsDefault = {
            background: '#fff',
            grid: '#3c78c0',
            squares: {
                r: 83,
                g: 90,
                b: 177,
            }
        };
        this.bgColorsDark = {
            background: '#232032',
            grid: '#000',
            squares: {
                r: 250,
                g: 200,
                b: 150,
            }
        };
        this.bgTheme = null;
        this.current = this.getCurrent();
    }

    run() {
        this.addTheme();
        this.node.addEventListener('click', () => {
            if(this.current === this.cssDefault) {
                this.current =  this.cssDark;
                this.bgTheme = this.bgColorsDark;
            }else{
                this.current =  this.cssDefault;
                this.bgTheme = this.bgColorsDefault;
            }
            this.setCurrent();
            this.background.loadTheme(this.bgTheme);
        });
        this.background = new Background(this.bgTheme);
        this.background.start();
    }

    setCurrent() {
        localStorage.setItem('theme', this.current);
        this.cssBlock.setAttribute('href', this.current);
    }

    getCurrent() {
        const theme = localStorage.getItem('theme');
        if(theme) {
            if(theme === this.cssDark) {
                this.bgTheme = this.bgColorsDark;
            }else{
                this.bgTheme = this.bgColorsDefault;
            }
            return theme;
        }
        this.bgTheme = this.bgColorsDefault;
        return this.cssDefault;
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
