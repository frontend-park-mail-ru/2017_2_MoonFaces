class Background {
    constructor(theme) {
        this.strokeColor = '#4da6ff';
        this.squareColor = {
            r: 83,
            g: 90,
            b: 177,
        };

        this.loadTheme(theme);

        this.canvas = document.getElementsByClassName('background')[0];

        this.canvas.style.margin = '-31px 0';
        this.canvas.style.position = 'fixed';
        this.canvas.style.zIndex = -1;
        this.canvas.width = innerWidth * 1.1;
        this.canvas.height = innerHeight * 1.1;

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
            this.squareSide = window.innerHeight / this.vertical;
            this.horizontal = Math.floor(innerWidth / this.squareSide) + 3;
        } else {
            this.horizontal = 8;
            this.squareSide = window.innerWidth / this.horizontal;
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
        let array = [];
        for(let i = 0; i < rows; i++) {
            array[i] = [];
            for(let j = 0; j < cols; j++) {
                array[i][j] = 0;
            }
        }
        return array;
    }

    blink(col, row) {
        this.animate((timePassed) => {
            this.context.strokeStyle = this.strokeColor;
            this.context.clearRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            if (timePassed <= 3000) {
                this.context.fillStyle = 'rgba(' +
                    this.squareColor.r + ', ' +
                    this.squareColor.g + ', ' +
                    this.squareColor.b + ', ' +
                    (timePassed / 3000) + ')';
            } else {
                this.context.fillStyle = 'rgba(' +
                    this.squareColor.r + ', ' +
                    this.squareColor.g + ', ' +
                    this.squareColor.b + ', ' +
                    ((6000 - timePassed) / 3000) + ')';
            }
            this.context.fillRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            this.context.strokeRect(col * this.squareSide, row * this.squareSide, this.squareSide, this.squareSide);
            if(timePassed > 5990) {
                this.cells[row][col] = 0;
            }
        }, 6000);
    }

    animate(draw, duration) {
        let start = performance.now();
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
        let now = performance.now();
        let delta = now - this.then;

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
        const a = {
            grid: this.strokeColor,
            squares:
                {
                    r: this.squareColor.r,
                    g: this.squareColor.g,
                    b: this.squareColor.b,
                }
        } = theme;
        this.drawGrid();
    }

    drawGrid() {
        for (let i = 0; i <= this.horizontal; i++) {
            for (let j = 0; j <= this.vertical; j++) {
                this.context.strokeStyle = this.strokeColor;
                this.context.strokeRect(i * (this.squareSide), j * (this.squareSide), this.squareSide, this.squareSide);
            }
        }
    }
}

export default Background;
