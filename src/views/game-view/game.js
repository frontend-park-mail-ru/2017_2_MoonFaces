import BaseView from '../../modules/baseView';
import user from '../../services/user-service';

class GameView extends BaseView {

    getTemplate() {
        const template = require('./game.pug');
        const data = {
            username: user.login,
        };

        return template(data);
    }

    postRender() {
        this.playerScore = document.getElementsByClassName('game_player-score')[0];
        this.opponentScore = document.getElementsByClassName('game_opponent-score')[0];


        this.neutralColor = '#ffffff';
        this.playerColor = 'rgba(0,179,0, 1)';
        this.opponentColor = 'rgba(255,121,51, 1)';

        this.fieldSize = 8;
        this.outerBorderWidth = 3;
        this.innerBorderWidth = 2;

        this.canvas = document.getElementsByClassName('game_field-grid')[0];
        this.canvasStroke = document.getElementsByClassName('game_field-field')[0];
        this.marginTop = innerHeight / 20;
        this.canvasInnerMargin = 2;

        this.canvas.height = 400;
        this.canvas.width = 400;
        this.canvas.style.position = 'absolute';
        this.canvas.style.zIndex = 3000;

        this.canvasStroke.height = 400;
        this.canvasStroke.width = 400;
        this.canvasStroke.style.position = 'absolute';
        this.canvasStroke.style.zIndex = 30000;

        this.marginLeft = (innerWidth - this.canvas.width) / 2;
        this.context = this.canvas.getContext('2d');
        this.contextStroke = this.canvasStroke.getContext('2d');
        this.context.strokeStyle = this.neutralColor;
        this.context.lineWidth = this.outerBorderWidth;

        this.playerMatrix = this.createMatrix(8, 8);
        this.opponentMatrix = this.createMatrix(8, 8);
        this.resultMatrix = this.createMatrix(8, 8);
        this.currentField = this.createMatrix(8, 8);
        this.nextMatrix = this.createMatrix(8, 8);


        this.squareSide = 0;
        this.horizontal = this.fieldSize;
        this.vertical = this.fieldSize;

        if(innerWidth >= innerHeight) {
            this.squareSide = (this.canvas.height - 2 * this.canvasInnerMargin) / this.vertical;
        } else {
            this.squareSide = (this.canvas.width - 2 * this.canvasInnerMargin) / this.horizontal;
        }

        this.smallSquareSide = this.squareSide / 3;


        this.generateMatrix();
        this.evalNextMatrix();
        this.drawMatrix();

        this.iMin = undefined;
        this.jMin = undefined;
        this.iCurrent = undefined;
        this.jCurrent = undefined;

        this.canvasStroke.addEventListener('mousedown', function() {
            this.iMin = undefined;
            this.jMin = undefined;
            this.loop = undefined;

            const startLoop = event => {
                this.loop = this.animation(event);
            };
            this.canvasStroke.addEventListener('mousemove', startLoop);
            this.canvasStroke.addEventListener('mouseup', () => {

                cancelAnimationFrame(this.loop);
                this.loop = undefined;
                this.canvasStroke.removeEventListener('mousemove', startLoop);
            });
        }.bind(this));
        this.countScore(this.playerScore, true);
        this.countScore(this.opponentScore, false);
    }

    generateMatrix() {
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = 0; j < this.fieldSize; j++) {
                if (Math.random() <= 0.3) {
                    this.currentField[i][j] = 1;
                }
            }
        }
    }

    createMatrix(rows, cols) {
        let array = [];
        for (let i = 0; i < rows; i++) {
            array[i] = [];
            for (let j = 0; j < cols; j++) {
                array[i][j] = 0;
            }
        }
        return array;
    }

    evalNextMatrix() {
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = 0; j < this.fieldSize; j++) {
                this.countNeighboors(i, j);
            }
        }
    }

    countNeighboors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let neighboorRow = row + i;
                let neighboorCol = col + j;

                if (neighboorRow === -1) {
                    neighboorRow = this.fieldSize - 1;
                }

                if (neighboorCol === -1) {
                    neighboorCol = this.fieldSize - 1;
                }

                if (neighboorRow === this.fieldSize) {
                    neighboorRow = 0;
                }

                if (neighboorCol === this.fieldSize) {
                    neighboorCol = 0;
                }

                if (!(i === 0 && j === 0) && this.currentField[neighboorRow][neighboorCol] === 1) {
                    count++;
                }
            }
        }
        if (count >= 2 && count <= 3) {
            this.nextMatrix[row][col] = 1;
        } else {
            this.nextMatrix[row][col] = 0;
        }
    }


    drawMatrix() {
        console.log('draw matrix');
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = 0; j < this.fieldSize; j++) {
                if (this.currentField[i][j] === 1) {
                    this.drawCell(i, j, false);
                } else {
                    this.drawCell(i, j, true);
                }

                if (this.nextMatrix[i][j] === 1) {
                    this.drawNextGenerationCell(i, j, false);
                } else {
                    this.drawNextGenerationCell(i, j, true);
                }
            }
        }
    }

    drawNextGenerationCell(row, col, empty) {
        console.log('draw gen cell');
        // Draw outer square
        this.context.fillStyle = this.neutralColor;

        this.context.lineWidth = this.innerBorderWidth;
        if (empty === true) {
            this.context.fillStyle = this.neutralColor;
        } else {

            if (col < this.horizontal / 2) {
                this.context.fillStyle = this.playerColor;
            } else {
                this.context.fillStyle = this.opponentColor;
            }
        }

        this.context.fillRect(this.smallSquareSide + this.canvasInnerMargin + col * (this.squareSide) + this.outerBorderWidth,
            this.smallSquareSide + this.canvasInnerMargin + row * (this.squareSide) + this.outerBorderWidth,
            this.smallSquareSide - 2 * this.outerBorderWidth,
            this.smallSquareSide - 2 * this.outerBorderWidth);

        // Return default settings
        this.context.lineWidth = this.outerBorderWidth;
        this.context.strokeStyle = this.neutralColor;
        this.context.fillStyle = this.neutralColor;
    }

    drawCell(row, col, empty) {
        console.log('draw cell');
        // Draw outer square
        this.context.fillStyle = this.neutralColor;
        this.context.fillRect(col * (this.squareSide), row * (this.squareSide), this.squareSide, this.squareSide);

        // Draw inner square
        if (col < this.horizontal / 2) {
            this.context.strokeStyle = this.playerColor;
            this.context.fillStyle = this.playerColor;
        } else {
            this.context.strokeStyle = this.opponentColor;
            this.context.fillStyle = this.opponentColor;
        }

        this.context.lineWidth = this.innerBorderWidth;
        if (empty === true) {
            this.context.strokeRect(this.canvasInnerMargin + col * (this.squareSide) + this.outerBorderWidth,
                this.canvasInnerMargin + row * (this.squareSide) + this.outerBorderWidth,
                this.squareSide - 2 * this.outerBorderWidth,
                this.squareSide - 2 * this.outerBorderWidth);
        } else {
            this.context.fillRect(this.canvasInnerMargin + col * (this.squareSide) + this.outerBorderWidth,
                this.canvasInnerMargin + row * (this.squareSide) + this.outerBorderWidth,
                this.squareSide - 2 * this.outerBorderWidth,
                this.squareSide - 2 * this.outerBorderWidth);
        }
        // Return default settings
        this.context.lineWidth = this.outerBorderWidth;
        this.context.strokeStyle = this.neutralColor;
        this.context.fillStyle = this.neutralColor;
    }

    animation(event) {
        const elementParams = this.canvas.getBoundingClientRect();

        const x1 = event.clientX - elementParams.left;
        const y1 = event.clientY - elementParams.top;

        this.iCurrent = Math.floor(y1 / (this.context.lineWidth / 3 + this.squareSide));
        this.jCurrent = Math.floor(x1 / (this.context.lineWidth / 3 + this.squareSide));

        if (this.iMin === undefined) {
            this.iMin = this.iCurrent;
            this.jMin = this.jCurrent;
        }

        this.contextStroke.clearRect(0, 0, this.canvasStroke.width, this.canvasStroke.height);

        if (this.iCurrent >= this.iMin && this.jCurrent >= this.jMin) {
            this.contextStroke.strokeStyle = '#000000';
            this.contextStroke.lineWidth = 4;
            this.contextStroke.strokeRect(this.canvasInnerMargin + this.jMin * (this.squareSide),
                this.canvasInnerMargin + this.iMin * (this.squareSide),
                (this.jCurrent - this.jMin + 1) * this.squareSide,
                (this.iCurrent - this.iMin + 1) * this.squareSide);
        }
    }

    countScore(element, isPlayer) {
        console.log('countScore');
        let score = 0;
        if (isPlayer) {
            for (let i = 0; i < this.fieldSize; i++) {
                for (let j = 0; j < this.fieldSize / 2; j++) {
                    score += this.currentField[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.fieldSize; i++) {
                for (let j = this.fieldSize / 2; j < this.fieldSize; j++) {
                    score += this.currentField[i][j];
                }
            }
        }
        element.textContent = score.toString();
    }
}

export default GameView;
