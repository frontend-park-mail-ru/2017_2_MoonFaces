export default class GameField {
    constructor(grid, field, playerScore, opponentScore) {
        this.neutralColor = '#fff';
        this.playerColor = 'hsl(120, 50%, 50%)';
        this.opponentColor = 'hsl(255, 50%,50%)';
        this.frameColor = '#f84';
        this.fieldSize = 8;

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
                if (this.field[i][j].alive)
                    score += 1;
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
                this.renderCell(i, j);
            }
        }
    }

    renderCell(row, col) {
        const currentCell = this.field[row][col];
        let aliveColor = this.playerColor;
        if (this.fieldSize/2 <= col) aliveColor = this.opponentColor;

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
}
