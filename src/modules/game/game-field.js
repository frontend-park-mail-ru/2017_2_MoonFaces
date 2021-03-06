export default class GameField {
    constructor(grid, field, playerName=null, opponentName=null) {
        this.fieldSize = 8;
        this.neutralColor = '#fff';
        const playerHue = (playerName) ? this.nameToHue(playerName) : 120;
        this.playerColor = `hsl(${playerHue}, 50%, 50%)`;
        const opponentHue = (opponentName) ? this.nameToHue(opponentName) : 255;
        this.opponentColor = `hsl(${opponentHue}, 50%, 50%)`;
        this.frameUserColor = 'hsl(130, 70%, 30%)';
        this.frameOpponentColor = 'hsl(265, 70%, 30%)';
        this.frameNeutralColor = 'hsla(130, 100%, 100%, 0.4)';

        this.userSelection = null;
        this.opponentSelection = null;

        this.cField = field;

        this.ctxField = this.cField.getContext('2d');

        this.field = this.createField(this.fieldSize, this.fieldSize);

        this.maxCanvasSize = 450;
        this.setCanvasSize(window.innerWidth - 20);
        window.addEventListener('resize', () => {return this.setCanvasSize(window.innerWidth - 20);});

        this.renderField();
        this.bindActions();

        this.lastRenderTime = new Date().getTime();
        this.cellAnimationTime = 350;

        setInterval(() => {return this.renderField();}, 1000 / 20);
    }


    nameToHue(name) {
        let hash = 5381;
        let i = name.length;

        while(i) {
            hash = (hash * 33) ^ name.charCodeAt(--i);
        }

        return (hash >>> 0) % 255;
    }


    setCanvasSize(size) {
        size = Math.min(size, this.maxCanvasSize);
        this.cField.height = size;
        this.cField.width = size;
        this.cellPadding = 4;
        this.cellBorder = 2;
        this.squareSide = (this.cField.width) / this.fieldSize - this.cellPadding;
        this.smallSquareSide = this.squareSide / 5;
        this.selectionBorderThickness = 5;
    }

    getField() {
        return this.field;
    }

    setField(field) {
        this.field = field;
    }

    getScore(offset, limit) {
        let score = 0;
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = offset; j < limit; j++) {
                if (this.field[i][j].alive) { score += 1; }
            }
        }
        return score;
    }

    getPlayerScore() {
        return this.getScore(0, this.fieldSize/2);
    }

    getOpponentScore() {
        return this.getScore(this.fieldSize/2, this.fieldSize);
    }

    toggleCell(row, col) {
        this.field[row][col].alive = !this.field[row][col].alive;
        this.field[row][col].animationTime = this.cellAnimationTime;
    }


    clearField() {
        this.changeColor(this.neutralColor);
        this.ctxField.fillRect(
            0,
            0,
            this.cField.width,
            this.cField.height
        );
    }

    createField(rows, cols) {
        return new Array(rows).fill(0).map(() => {
            return new Array(cols).fill(0).map(() => {
                return {
                    alive: false,
                    change: false,
                    animationTime: 0
                };
            });
        });
    }

    renderField() {
        this.clearField();

        const currentTime = new Date().getTime();
        const delta = currentTime - this.lastRenderTime;
        this.lastRenderTime = currentTime;

        this.forEachCell((row, col) => {
            this.setNextCellState(row, col);
            this.renderCell(row, col, delta);
        });

        this.renderSelections(this.userSelection, this.opponentSelection);
    }

    changeColor(color) {
        this.ctxField.strokeStyle = color;
        this.ctxField.fillStyle = color;
    }

    drawSquare(color, row, col, size, fill=true) {
        this.changeColor(color);
        const drawFunction = fill ? this.ctxField.fillRect : this.ctxField.strokeRect;
        drawFunction.call(this.ctxField,
            col * this.squareSide + col * this.cellPadding + this.cellPadding/2 + this.squareSide/2 - size/2,
            row * this.squareSide + row * this.cellPadding + this.cellPadding/2 + this.squareSide/2 - size/2,
            size,
            size
        );
    }

    renderCell(row, col, delta) {
        const currentCell = this.field[row][col];
        const aliveColor = this.fieldSize/2 > col ? this.playerColor : this.opponentColor;
        const squaresDifference = this.squareSide - this.smallSquareSide;

        if (currentCell.animationTime >= 0) {
            currentCell.animationTime -= delta;
        }
        const remainingAnimationTime = this.cellAnimationTime - currentCell.animationTime;

        // Number from 0 to 1, representing animation status.
        let animationStep = (currentCell.animationTime > 0) ? remainingAnimationTime / this.cellAnimationTime : 1;
        animationStep = Math.pow(animationStep, 2);  // Because tweening is cool.

        if (currentCell.alive) {
            this.drawSquare(aliveColor, row, col, this.smallSquareSide + squaresDifference * animationStep);
        } else {
            this.drawSquare(this.neutralColor, row, col, this.squareSide);

            if (animationStep < 1) {
                this.drawSquare(aliveColor, row, col, this.smallSquareSide + squaresDifference * (1 - animationStep));
                this.drawSquare(this.neutralColor, row, col, this.smallSquareSide * 0.9);
            }
        }

        if (currentCell.change) {
            const inversedColor = currentCell.alive ? this.neutralColor : aliveColor;
            this.drawSquare(inversedColor, row, col, this.smallSquareSide);
        }

        this.ctxField.lineWidth = this.cellBorder;
        this.drawSquare(aliveColor, row, col, this.squareSide, false);
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const trimCell = (coordinate) => {
                    if (coordinate === -1) {
                        coordinate = this.fieldSize - 1;
                    }
                    if (coordinate === this.fieldSize) {
                        coordinate = 0;
                    }
                    return coordinate;
                };
                const neighborRow = trimCell(row + i);
                const neighborCol = trimCell(col + j);

                if (!(i === 0 && j === 0) && this.field[neighborRow][neighborCol].alive) {
                    count++;
                }
            }
        }

        return count;
    }

    setNextCellState(row, col) {
        const count = this.countNeighbors(row, col);

        if (count === 3 && !this.field[row][col].alive) {
            this.field[row][col].change = true;
        } else if (this.field[row][col].alive && (count > 3 || count < 2) ) {
            this.field[row][col].change = true;
        } else {
            this.field[row][col].change = false;
        }
    }

    bindActions() {
        const startLoop = event => {
            this.animation(event);
        };
        this.cField.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.iStart = undefined;
            this.jStart = undefined;

            this.opponentSelection = null;

            this.cField.addEventListener('touchmove', startLoop);
            this.cField.addEventListener('touchend', (e) => {
                this.stopAnimation(startLoop, e);
            });
        });

        this.cField.addEventListener('mousedown', () => {
            this.iStart = undefined;
            this.jStart = undefined;

            this.opponentSelection = null;

            this.cField.addEventListener('mousemove', startLoop);
            this.cField.addEventListener('mouseup', (e) => {
                this.stopAnimation(startLoop, e);
            });
        });
    }

    stopAnimation(startLoop, event) {
        this.animation(event);
        cancelAnimationFrame(this.animation(event));
        this.cField.removeEventListener('mousemove', startLoop);
        this.cField.removeEventListener('touchmove', startLoop);
    }

    animation(event) {
        const elementParams = this.cField.getBoundingClientRect();

        const clientX = (event.clientX) ? event.clientX : event.touches[0].pageX;
        const clientY = (event.clientY) ? event.clientY : event.touches[0].pageY;

        const x1 = clientX - elementParams.left;
        const y1 = clientY - elementParams.top;

        const coordinateToCellNumber = (c) => {
            return Math.floor(c / (this.ctxField.lineWidth / 3 + this.squareSide + 2 * this.cellBorder));
        };
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

        this.saveUserSelection(this.jMin, this.iMin, this.jMax, this.iMax);
        this.renderField();
    }

    saveUserSelection(jMin, iMin, jMax, iMax) {
        this.userSelection = {
            xMin: jMin,
            yMin: iMin,
            xMax: jMax,
            yMax: iMax
        };
    }

    getUserSelection() {
        return this.userSelection;
    }

    forEachCell(f) {
        this.field.forEach((row, y) => {return row.forEach((col, x) => {return f(y, x);});});
    }

    renderSelections(playerSelection, opponentSelection) {
        const cellInSelection = (row, col, selection) => {
            if (!selection) {return false;}
            const colInSelection = (selection.xMin <= col) && (col <= selection.xMax);
            const rowInSelection = (selection.yMin <= row) && (row <= selection.yMax);
            return (rowInSelection && colInSelection);
        };

        this.forEachCell((row, col) => {
            const cellInPlayerSelection = cellInSelection(row, col, playerSelection);
            const cellInOpponentSelection = cellInSelection(row, col, opponentSelection);
            if (cellInPlayerSelection ^ cellInOpponentSelection) {this.drawSquare(this.frameNeutralColor, row, col, this.squareSide + this.cellPadding);}
        });

        const drawSelectionFrame = (color, selection) => {
            this.ctxField.strokeStyle = color;
            this.ctxField.lineWidth = this.selectionBorderThickness;

            const getDiff = (min, max) => {return max - min + 1;};
            this.ctxField.strokeRect(
                selection.xMin * (this.squareSide) + selection.xMin * this.cellPadding,
                selection.yMin * (this.squareSide) + selection.yMin * this.cellPadding,
                getDiff(selection.xMin, selection.xMax) * this.squareSide + getDiff(selection.xMin, selection.xMax) * this.cellPadding,
                getDiff(selection.yMin, selection.yMax) * this.squareSide + getDiff(selection.yMin, selection.yMax) * this.cellPadding
            );   
        };

        if (playerSelection) {
            drawSelectionFrame(this.frameUserColor, playerSelection);
        }
        if (opponentSelection) {
            drawSelectionFrame(this.frameOpponentColor, opponentSelection);
        }
    }

    loadFromArray(arrayField) {
        for(let i = 0; i < this.fieldSize; i++) {
            for(let j = 0; j < this.fieldSize; j++) {
                if(this.field[i][j].alive != arrayField[i][j]) {
                    this.toggleCell(i, j);
                }
            }
        }
    }

    setOpponentSelection(opponentSelection) {
        this.opponentSelection = opponentSelection;
    }
}
