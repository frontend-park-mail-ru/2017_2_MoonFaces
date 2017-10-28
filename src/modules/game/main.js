class Game {
    start() {
        this.playerScore = document.getElementsByClassName('game_player-score')[0];
        this.opponentScore = document.getElementsByClassName('game_opponent-score')[0];

        this.endTurn = document.getElementsByClassName('game_end-turn')[0];

        this.neutralColor = '#fff';
        this.playerColor = 'hsl(120, 50%, 50%)';
        this.opponentColor = 'hsl(255, 50%,50%)';
        this.frameColor = '#f84';

        this.fieldSize = 8;

        this.outerBorderWidth = 3;
        this.innerBorderWidth = 2;

        this.canvas = document.getElementsByClassName('game_field-grid')[0];
        this.canvasStroke = document.getElementsByClassName('game_field-field')[0];
        this.canvasInnerMargin = 2;

        this.canvas.height = 400;
        this.canvas.width = 400;

        this.canvasStroke.height = 400;
        this.canvasStroke.width = 400;

        this.context = this.canvas.getContext('2d');
        this.contextStroke = this.canvasStroke.getContext('2d');
        this.context.strokeStyle = this.neutralColor;
        this.context.lineWidth = this.outerBorderWidth;

        this.playerMatrix = this.createMatrix(this.fieldSize, this.fieldSize);
        this.opponentMatrix = this.createMatrix(this.fieldSize, this.fieldSize);
        this.resultMatrix = this.createMatrix(this.fieldSize, this.fieldSize);
        this.currentField = this.createMatrix(this.fieldSize, this.fieldSize);
        this.nextMatrix = this.createMatrix(this.fieldSize, this.fieldSize);

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
        this.iMax = undefined;
        this.jMax = undefined;

        this.canvasStroke.addEventListener('mousedown', () => {
            this.iStart = undefined;
            this.jStart = undefined;
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
        });

        this.endTurn.addEventListener('click', (event) => {
            event.preventDefault();
            this.clearMatrix(this.resultMatrix);
            this.contextStroke.clearRect(0, 0, this.canvasStroke.width, this.canvasStroke.height);
            this.contextStroke.strokeRect(this.canvasInnerMargin + this.jMin * (this.squareSide),
                this.canvasInnerMargin + this.iMin * (this.squareSide),
                (this.jMax - this.jMin + 1) * this.squareSide,
                (this.iMax - this.iMin + 1) * this.squareSide);
            this.saveArea(this.iMin, this.iMax, this.jMin, this.jMax, this.playerMatrix);

            const opMinI = this.randomInt(0, 7);
            const opMinJ = this.randomInt(0, 7);

            const iOffset = this.randomInt(0, 7 - opMinI);
            const jOffset = this.randomInt(0, 7 - opMinJ);

            this.contextStroke.lineWidth = 4;
            this.contextStroke.strokeRect(this.canvasInnerMargin + opMinJ * (this.squareSide),
                this.canvasInnerMargin + opMinI * (this.squareSide),
                (jOffset + 1) * this.squareSide,
                (iOffset + 1) * this.squareSide);

            this.saveArea(opMinI, opMinI + iOffset, opMinJ, opMinJ + jOffset, this.opponentMatrix);

            this.evalResult(this.playerMatrix, this.opponentMatrix, this.resultMatrix);

            for (let i = 0; i < this.fieldSize; i++) {
                for (let j = 0; j < this.fieldSize; j++) {
                    if (this.resultMatrix[i][j]) {
                        this.currentField[i][j] = this.nextMatrix[i][j];
                    }
                }
            }

            this.evalNextMatrix();
            this.drawMatrix();
            this.clearMatrix(this.playerMatrix);
            this.clearMatrix(this.opponentMatrix);

            this.countScore(this.playerScore, true);
            this.countScore(this.opponentScore, false);
        });

        this.countScore(this.playerScore, true);
        this.countScore(this.opponentScore, false);
    }

    randomInt(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    generateMatrix() {
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = 0; j < this.fieldSize / 2; j++) {
                if (Math.random() <= 0.5) {
                    this.currentField[i][j] = 1;
                    this.currentField[i][this.fieldSize - 1 - j] = 1;
                }
            }
        }
    }

    evalResult(field1, field2, result) {
        for(let i = 0; i < this.fieldSize; i++) {
            for(let j = 0; j < this.fieldSize; j++) {
                result[i][j] = field1[i][j] ^ field2[i][j];
            }
        }
    }

    createMatrix(rows, cols) {
        return new Array(rows).fill(0).map(() => {
            return new Array(cols).fill(0);
        });
    }

    evalNextMatrix() {
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = 0; j < this.fieldSize; j++) {
                this.countNeighboors(i, j);
            }
        }
    }

    clearMatrix(array) {
        for(let i = 0; i < this.fieldSize; i++) {
            for(let j = 0; j < this.fieldSize; j++) {
                array[i][j] = 0;
            }
        }
    }

    saveArea(iMin, iCurrent, jMin, jCurrent, matrix) {
        for (let i = iMin; i <= iCurrent; i++) {
            for (let j = jMin; j <= jCurrent; j++) {
                matrix[i][j] = 1;
            }
        }
    }

    countNeighboors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const trimCell = (cell) => {
                    if (cell === -1) {cell = this.fieldSize - 1;}
                    if (cell === this.fieldSize) {cell = 0;}
                    return cell;
                };
                const neighboorRow = trimCell(row + i);
                const neighboorCol = trimCell(col + j);

                if (!(i === 0 && j === 0) && this.currentField[neighboorRow][neighboorCol] === 1) {
                    count++;
                }
            }
        }
        if (count === 3) {  // Dead cell to live
            this.nextMatrix[row][col] = 1;
        } else if (count === 2 && this.currentField[row][col] === 1) {  // Live cell stay live
            this.nextMatrix[row][col] = 1;
        } else {
            this.nextMatrix[row][col] = 0;  // Live(or not) cell to die
        }
    }


    drawMatrix() {
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


    drawNextGenerationCell(row, col, isEmpty) {
        // Draw outer square
        this.context.fillStyle = this.neutralColor;

        this.context.lineWidth = this.innerBorderWidth;
        if (isEmpty === true) {
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
    }


    drawCell(row, col, isEmpty) {
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
        if (isEmpty === true) {
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
    }

    animation(event) {
        const elementParams = this.canvas.getBoundingClientRect();

        const x1 = event.clientX - elementParams.left;
        const y1 = event.clientY - elementParams.top;

        const coordinateToCellNumber = (c) => {return Math.floor(c / (this.context.lineWidth / 3 + this.squareSide));};
        this.iCurrent = coordinateToCellNumber(y1);
        this.jCurrent = coordinateToCellNumber(x1);

        if (this.iStart === undefined) {
            this.iStart = this.iCurrent;
            this.jStart = this.jCurrent;
        }

        this.iMin = Math.min(this.iStart, this.iCurrent);
        this.jMin = Math.min(this.jStart, this.jCurrent);
        this.iMax = Math.max(this.iStart, this.iCurrent);
        this.jMax = Math.max(this.jStart, this.jCurrent);

        this.contextStroke.clearRect(0, 0, this.canvasStroke.width, this.canvasStroke.height);

        this.contextStroke.strokeStyle = this.frameColor;
        this.contextStroke.lineWidth = 4;
        this.contextStroke.strokeRect(this.canvasInnerMargin + this.jMin * (this.squareSide),
            this.canvasInnerMargin + this.iMin * (this.squareSide),
            (this.jMax - this.jMin + 1) * this.squareSide,
            (this.iMax - this.iMin + 1) * this.squareSide);
    }

    countScore(element, isPlayer) {
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

export default Game;