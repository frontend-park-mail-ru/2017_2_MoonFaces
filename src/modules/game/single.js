import GameField from './game-field';

export default class SinglePlayer {
    constructor(grid, field, playerScore, opponentScore, endTurn, userName, opponentName) {
        this.gameField = new GameField(grid, field);
        this.playerScore = playerScore;
        this.opponentScore = opponentScore;
        this.endTurn = endTurn;
        this.field = this.gameField.getField();
    }

    start() {
        this.generateRandomMatrix();
        this.gameField.renderField();
        this.iteration();

        this.endTurn.addEventListener('click', () => {
            this.gameField.opponentSelection = {};
            this.gameField.opponentSelection.xMin = this.randomInt(0, 7);
            this.gameField.opponentSelection.yMin = this.randomInt(0, 7);
            this.gameField.opponentSelection.xMax = this.gameField.opponentSelection.xMin + this.randomInt(0, 7 - this.gameField.opponentSelection.xMin);
            this.gameField.opponentSelection.yMax = this.gameField.opponentSelection.yMin + this.randomInt(0, 7 - this.gameField.opponentSelection.yMin);

            this.gameField.renderPlayerSelection(this.gameField.opponentSelection, true);

            const userMatrix = this.getAreaMatrix(this.gameField.userSelection);
            const opponentMatrix = this.getAreaMatrix(this.gameField.opponentSelection);

            const resultMatrix = this.getResultMatrix(userMatrix, opponentMatrix);

            this.nextGeneration(resultMatrix);
            this.gameField.clearField();
            this.iteration();

        });
    }

    getResultMatrix(player, opponent) {
        const result = this.getEmptyMatrix(this.gameField.fieldSize, this.gameField.fieldSize);
        for(let i = 0; i < this.gameField.fieldSize; i++) {
            for(let j = 0; j < this.gameField.fieldSize; j++) {
                result[i][j] = player[i][j] ^ opponent[i][j];
            }
        }
        return result;
    }

    generateRandomMatrix() {
        for (let i = 0; i < this.gameField.fieldSize; i++) {
            for (let j = 0; j < this.gameField.fieldSize / 2; j++) {
                if (Math.random() <= 0.5) {
                    this.field[i][j].alive = true;
                    this.field[i][this.gameField.fieldSize - 1 - j].alive = true;
                }
            }
        }
    }

    iteration() {
        this.gameField.renderField();
        this.playerScore.innerHTML = this.gameField.getPlayerScore();
        this.opponentScore.innerHTML = this.gameField.getOpponentScore();
    }

    randomInt(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    getAreaMatrix(selection) {
        const result = this.getEmptyMatrix(this.gameField.fieldSize, this.gameField.fieldSize);

        if(!selection) {
            return result;
        }

        for (let j = selection.xMin; j <= selection.xMax; j++) {
            for (let i = selection.yMin; i <= selection.yMax; i++) {
                result[i][j] = 1;
            }
        }
        return result;
    }

    getEmptyMatrix(size1, size2) {
        return new Array(size1).fill(0).map(() => {
            return new Array(size2).fill(0);
        });
    }

    nextGeneration(resultMatrix) {
        for (let i = 0; i < this.gameField.fieldSize; i++) {
            for (let j = 0; j < this.gameField.fieldSize; j++) {
                if (resultMatrix[i][j]) {
                    if(this.field[i][j].change) {
                        this.field[i][j].alive = !this.field[i][j].alive;
                    }
                }
            }
        }
    }
}
