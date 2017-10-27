
class Background {
    constructor(theme) {
        this.strokeColor = '#4gda6ff';
        this.backgroundColor = '#ff0000';
        this.squareColor = {};

        this.loadTheme(theme);

        this.canvas = document.getElementsByClassName('background')[0];

        this.canvas.width = innerWidth * 1.1;
        this.canvas.height = innerHeight * 1.1;

        console.log(innerWidth, innerHeight);

        this.context = this.canvas.getContext( '2d' );
        this.context.lineWidth = 3;

        this.squareSide = 0;
        this.horizontal = 0;
        this.vertical = 0;

        this.fps = 50;
        this.then = performance.now();
        this.interval = 1000/this.fps;

        if(innerWidth >= innerHeight) {
            this.vertical = 11;
            this.squareSide = Math.ceil(window.innerHeight / this.vertical);
            this.horizontal = Math.floor(innerWidth / this.squareSide) + 3;
        } else {
            this.horizontal = 8;
            this.squareSide = Math.ceil(window.innerWidth / this.horizontal);
            this.vertical = Math.floor(innerHeight / this.squareSide) + 3;
        }

        this.drawGrid();

        this.cells = this.createMatrix(this.vertical + 1, this.horizontal + 1);
    }

    randomInt(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    createMatrix(rows, cols) {
        const array = [];
        for(let i = 0; i < rows; i++) {
            array[i] = [];
            for(let j = 0; j < cols; j++) {
                array[i][j] = 0;
            }
        }
        return array;
    }

    rgbToHsl(red, green, blue) {
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = (max + min) / 2;
        let s = (max + min) / 2;
        const l = (max + min) / 2;

        if (max == min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.floor(h * 255), Math.floor(s * 100), Math.floor(l * 100)];
    }

    blink(col, row) {
        this.animate((timePassed) => {
            this.context.strokeStyle = this.strokeColor;
            this.context.clearRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            const timePassedPercent = (-1 * Math.abs(timePassed - 3000) + 3000) / 300;
            const hsl = this.rgbToHsl(this.squareColor.r, this.squareColor.g, this.squareColor.b);
            const h = hsl[0];
            const s = hsl[1];
            const l = hsl[2];
            this.context.fillStyle = `hsla(
                ${h - timePassedPercent * 10},
                ${s}%,
                ${l}%,
                ${((-1 * Math.abs(timePassed - 3000) + 3000) / 3000)}
                )`;
            this.context.fillRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            this.context.strokeRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            if(timePassed > 5990) {
                this.cells[row][col] = 0;
            }
        }, 6000);
    }

    animate(draw, duration) {
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            let timePassed = time - start;
            if (timePassed > duration) {
                timePassed = duration;
            }
            draw(timePassed);
            if (timePassed < duration) {
                requestAnimationFrame(animate);
            }

        }.bind(this));
    }

    generateRandomField() {
        requestAnimationFrame(this.generateRandomField.bind(this));
        const now = performance.now();
        const delta = now - this.then;

        if (delta > this.interval) {
            this.then = now - (delta % this.interval);

            const i = this.randomInt(0, this.vertical);
            const j = this.randomInt(0, this.horizontal);
            if (this.cells[i][j] !== 1) {
                this.cells[i][j] = 1;
                this.blink(j, i);
            }
        }
    }

    start() {
        this.generateRandomField();
    }

    loadTheme(theme) {
        ({
            background: this.backgroundColor,
            grid: this.strokeColor,
            squares:
                {
                    r: this.squareColor.r,
                    g: this.squareColor.g,
                    b: this.squareColor.b,
                }
        } = theme);
        this.drawGrid();
    }

    drawGrid() {
        for (let i = 0; i <= this.horizontal; i++) {
            for (let j = 0; j <= this.vertical; j++) {
                this.context.fillStyle = this.backgroundColor;
                this.context.fillRect(i * this.squareSide, j * this.squareSide, this.squareSide, this.squareSide);
                this.context.strokeStyle = this.strokeColor;
                this.context.strokeRect(i * (this.squareSide), j * (this.squareSide), this.squareSide, this.squareSide);
            }
        }
    }
}

export default Background;
