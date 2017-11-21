export default class GameField {
    constructor(grid, field) {
        this.neutralColor = '#fff';
        this.playerColor = 'hsl(120, 50%, 50%)';
        this.opponentColor = 'hsl(255, 50%,50%)';
        this.fieldSize = 8;
        this.frameOpponentColor = '#f22';
        this.frameUserColor = '#f84';

        this.userSelection = null;
        this.opponentSelection = null;

        this.cGrid = grid;
        this.cField = field;

        this.ctxField = this.cField.getContext('2d');

        this.field = this.createField(this.fieldSize, this.fieldSize);

        this.cGrid.height = 400;
        this.cGrid.width = 400;

        this.cField.height = 400;
        this.cField.width = 400;

        this.cellPadding = 4;
        this.cellBorder = 2;
        this.squareSide = (this.cField.width) / this.fieldSize - this.cellPadding;
        this.smallSquareSide = this.squareSide / 3;
        this.clearField();
        this.renderField();
        this.bindActions();
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
                if (this.field[i][j].alive) {score += 1;}
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

    clearField() {
        this.ctxField.fillStyle = this.neutralColor;
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
                    change: false
                };
            });
        });
    }

    renderField() {
        for (let i = 0; i < this.fieldSize; i++) {
            for (let j = 0; j < this.fieldSize; j++) {
                this.countNeighbors(i, j);
                this.renderCell(i, j);
            }
        }
        if(this.userSelection) {
            this.renderPlayerSelection(this.userSelection);
        }
        if(this.opponentSelection){
            this.renderPlayerSelection(this.opponentSelection, true);
        }
    }

    renderCell(row, col) {
        const currentCell = this.field[row][col];
        let aliveColor = this.playerColor;
        if (this.fieldSize/2 <= col) {aliveColor = this.opponentColor;}

        if (currentCell.alive) {
            this.ctxField.strokeStyle = aliveColor;
            this.ctxField.fillStyle = aliveColor;
        } else {
            this.ctxField.strokeStyle = this.neutralColor;
            this.ctxField.fillStyle = this.neutralColor;
        }
        this.ctxField.fillRect(
            col * (this.squareSide) + col * this.cellPadding + this.cellPadding/2,
            row * (this.squareSide) + row * this.cellPadding + this.cellPadding/2,
            this.squareSide,
            this.squareSide
        );

        if (currentCell.change) {
            if (currentCell.alive) {
                this.ctxField.strokeStyle = this.neutralColor;
                this.ctxField.fillStyle = this.neutralColor;
            } else {
                this.ctxField.strokeStyle = aliveColor;
                this.ctxField.fillStyle = aliveColor;
            }

            this.ctxField.fillRect(
                this.smallSquareSide + col * (this.squareSide) + col * this.cellPadding + this.cellPadding/2,
                this.smallSquareSide + row * (this.squareSide) + row * this.cellPadding + this.cellPadding/2,
                this.smallSquareSide,
                this.smallSquareSide
            );
        }

        this.ctxField.strokeStyle = aliveColor;
        this.ctxField.lineWidth = this.cellBorder;

        this.ctxField.strokeRect(
            col * (this.squareSide) + col * this.cellPadding + this.cellPadding/2,
            row * (this.squareSide) + row * this.cellPadding + this.cellPadding/2,
            this.squareSide,
            this.squareSide
        );
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const trimCell = (cell) => {
                    if (cell === -1) {cell = this.fieldSize - 1;}
                    if (cell === this.fieldSize) {cell = 0;}
                    return cell;
                };
                const neighborRow = trimCell(row + i);
                const neighborCol = trimCell(col + j);

                if (!(i === 0 && j === 0) && this.field[neighborRow][neighborCol].alive === true) {
                    count++;
                }
            }
        }
        if (count === 3) {  // Dead cell to live
            this.field[row][col].change = true;
        } else if (count === 2 && this.field[row][col].alive === true) {  // Live cell stay live
            this.field[row][col].change = true;
        } else {
            this.field[row][col].change = false;  // Live(or not) cell to die
        }
    }

    bindActions() {
        this.cField.addEventListener('mousedown', () => {
            this.iStart = undefined;
            this.jStart = undefined;
            this.loop = undefined;

            const startLoop = event => {
                this.loop = this.animation(event);
            };
            this.cField.addEventListener('mousemove', startLoop);
            this.cField.addEventListener('mouseup', (e) => {
                startLoop(e);
                cancelAnimationFrame(this.loop);
                this.loop = undefined;
                this.cField.removeEventListener('mousemove', startLoop);
            });
        });
    }

    animation(event) {
        const elementParams = this.cField.getBoundingClientRect();

        const x1 = event.clientX - elementParams.left;
        const y1 = event.clientY - elementParams.top;

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
        this.clearField();
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

    saveOpponentSelection(jMin, iMin, jMax, iMax) {
        this.opponentSelection = {
            xMin: jMin,
            yMin: iMin,
            xMax: jMax,
            yMax: iMax
        };
    }

    renderPlayerSelection(selection, opponent = false) {
        if(!selection) {
            return;
        }

        if(opponent) {
            this.ctxField.strokeStyle = this.frameOpponentColor;
        }else{
            this.ctxField.strokeStyle = this.frameUserColor;
        }
        this.ctxField.lineWidth = 4;

        const getDiff = (min, max) => {
            return max - min + 1;
        };

        this.ctxField.strokeRect(
            selection.xMin * (this.squareSide) + selection.xMin * this.cellPadding,
            selection.yMin * (this.squareSide) + selection.yMin * this.cellPadding,
            getDiff(selection.xMin, selection.xMax) * this.squareSide + getDiff(selection.xMin, selection.xMax) * this.cellPadding,
            getDiff(selection.yMin, selection.yMax) * this.squareSide + getDiff(selection.yMin, selection.yMax) * this.cellPadding
        );

    }
}
