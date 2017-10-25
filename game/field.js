'use strict';

const neutralColor = '#ffffff';
const playerColor = 'rgba(0,179,0, 1)';
const opponentColor = 'rgba(255,121,51, 1)';

const fieldSize = 8;
const outerBorderWidth = 3;
const innerBorderWidth = 2;

const canvas = document.getElementsByClassName('background')[0];
const canvasStroke = document.getElementsByClassName('stroke')[0];
const marginTop = innerHeight / 20;
const canvasInnerMargin = 2;

canvas.style.marginTop = (marginTop - 8).toString() + "px";
canvas.style.marginBottom = canvas.style.marginTop;
canvas.height = innerHeight * 0.90;
canvas.width = innerHeight * 0.90;
canvas.style.position = 'fixed';
canvas.style.zIndex = -2;

canvasStroke.style.marginTop = (marginTop - 8).toString() + "px";
canvasStroke.style.marginBottom = canvas.style.marginTop;
canvasStroke.height = innerHeight * 0.90;
canvasStroke.width = innerHeight * 0.90;
canvasStroke.style.position = 'fixed';
canvasStroke.style.zIndex = -1;

const marginLeft = (innerWidth - canvas.width) / 2;
const context = canvas.getContext( '2d' );
const contextStroke = canvasStroke.getContext( '2d' );
context.strokeStyle = neutralColor;
context.lineWidth = outerBorderWidth;

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

const saveArea = (i_min, i_current, j_min, j_current, matrix) => {
    for (let i = i_min; i <= i_current; i++) {
        for (let j = j_min; j <= j_current; j++) {
            matrix[i][j] = 1;
        }
    }
};

const createMatrix = (rows, cols) => {
    let array = [];
    for(let i = 0; i < rows; i++) {
        array[i] = [];
        for(let j = 0; j < cols; j++) {
            array[i][j] = 0;
        }
    }
    return array;
};

const clearMatrix = (array) => {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            array[i][j] = 0;
        }
    }
};

const evalResult = (field1, field2, result) => {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            result[i][j] = field1[i][j] ^ field2[i][j];
        }
    }
};

const playerMatrix = createMatrix(8, 8);
const opponentMatrix = createMatrix(8, 8);
const resultMatrix = createMatrix(8, 8);
const currentField = createMatrix(8, 8);
const nextMatrix = createMatrix(8, 8);

let squareSide = 0;
let horizontal = fieldSize;
let vertical = fieldSize;

if(innerWidth >= innerHeight) {
    squareSide = (canvas.height - 2 * canvasInnerMargin) / vertical;
} else {
    squareSide = (canvas.width - 2 * canvasInnerMargin) / horizontal;
}

const smallSquareSide = squareSide / 3;

const drawCell = (row, col, empty) => {
    // Draw outer square
    context.fillStyle = neutralColor;
    context.fillRect(col * (squareSide), row * (squareSide), squareSide, squareSide);

    // Draw inner square
    if (col < horizontal / 2) {
        context.strokeStyle = playerColor;
        context.fillStyle = playerColor;
    } else {
        context.strokeStyle = opponentColor;
        context.fillStyle = opponentColor;
    }

    context.lineWidth = innerBorderWidth;
    if(empty === true) {
        context.strokeRect(canvasInnerMargin + col * (squareSide) + outerBorderWidth,
            canvasInnerMargin + row * (squareSide) + outerBorderWidth,
            squareSide - 2 * outerBorderWidth,
            squareSide - 2 * outerBorderWidth);
    } else {
        context.fillRect(canvasInnerMargin + col * (squareSide) + outerBorderWidth,
            canvasInnerMargin + row * (squareSide) + outerBorderWidth,
            squareSide - 2 * outerBorderWidth,
            squareSide - 2 * outerBorderWidth);
    }
    // Return default settings
    context.lineWidth = outerBorderWidth;
    context.strokeStyle = neutralColor;
    context.fillStyle = neutralColor;
};


const drawNextGenerationCell = (row, col, empty) => {
    // Draw outer square
    context.fillStyle = neutralColor;

    context.lineWidth = innerBorderWidth;
    if(empty === true) {
        context.fillStyle = neutralColor;
    } else {

        if (col < horizontal / 2) {
            context.fillStyle = playerColor;
        } else {
            context.fillStyle = opponentColor;
        }
    }

    context.fillRect(smallSquareSide + canvasInnerMargin + col * (squareSide) + outerBorderWidth,
        smallSquareSide + canvasInnerMargin + row * (squareSide) + outerBorderWidth,
        smallSquareSide - 2 * outerBorderWidth,
        smallSquareSide - 2 * outerBorderWidth);

    // Return default settings
    context.lineWidth = outerBorderWidth;
    context.strokeStyle = neutralColor;
    context.fillStyle = neutralColor;
};

const generateMatrix = () => {
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (Math.random() <= 0.3) {
                currentField[i][j] = 1;
            }
        }
    }
};

const drawMatrix = () => {
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (currentField[i][j] === 1) {
                drawCell(i, j, false);
            } else {
                drawCell(i, j, true);
            }

            if (nextMatrix[i][j] === 1) {
                drawNextGenerationCell(i, j, false);
            } else {
                drawNextGenerationCell(i, j, true);
            }
        }
    }
};

const countNeighboors = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let neighboorRow = row + i;
            let neighboorCol = col + j;

            if (neighboorRow === -1) {
                neighboorRow = fieldSize - 1;
            }

            if (neighboorCol === -1) {
                neighboorCol = fieldSize - 1;
            }

            if (neighboorRow === fieldSize) {
                neighboorRow = 0;
            }

            if (neighboorCol === fieldSize) {
                neighboorCol = 0;
            }

            if (!(i === 0 && j === 0) && currentField[neighboorRow][neighboorCol] === 1) {
                count++;
            }
        }
    }
    if (count >= 2 && count <= 3) {
        nextMatrix[row][col] = 1;
    } else {
        nextMatrix[row][col] = 0;
    }
};

const evalNextMatrix = () => {
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            countNeighboors(i, j);
        }
    }
};

generateMatrix();
evalNextMatrix();
drawMatrix();

canvasStroke.addEventListener("mousedown", () => {
    i_min = undefined;
    j_min = undefined;
    let loop;

    const startLoop = event => {
        loop = animation(event);
    };
    canvasStroke.addEventListener("mousemove", startLoop);
    canvasStroke.addEventListener("mouseup", () => {

        cancelAnimationFrame(loop);
        loop = undefined;
        canvasStroke.removeEventListener("mousemove", startLoop);
    });
});

let i_min;
let j_min;
let i_current;
let j_current;

function animation(event) {
    const x1 = event.clientX - Math.floor(marginLeft);
    const y1 = event.clientY - Math.floor(marginTop);

    i_current = Math.floor(y1 / (context.lineWidth / 3 + squareSide));
    j_current = Math.floor(x1 / (context.lineWidth / 3 + squareSide));

    if(i_min === undefined) {
        i_min = i_current;
        j_min = j_current;
    }

    contextStroke.clearRect(0, 0, canvasStroke.width, canvasStroke.height);

    if (i_current >= i_min && j_current >= j_min) {
        contextStroke.strokeStyle = '#000000';
        contextStroke.lineWidth = 4;
        contextStroke.strokeRect(canvasInnerMargin + j_min * (squareSide),
            canvasInnerMargin + i_min * (squareSide),
            (j_current - j_min + 1) * squareSide,
            (i_current - i_min + 1) * squareSide);
    }
}

const playerInfo = document.getElementsByClassName("player")[0];
playerInfo.style.width = ((innerWidth - canvas.width) / 2).toString() + "px";
playerInfo.style.height = canvas.height.toString() + "px";
playerInfo.style.float = "left";
playerInfo.style.display = "flex";
playerInfo.style.marginTop = canvas.style.marginTop;
playerInfo.style.marginLeft = '-8px';
playerInfo.zIndex = 0;

playerInfo.style.flexDirection = "column";
playerInfo.style.alignItems = "center";
playerInfo.style.justifyContent = "space-around";


const opponentInfo = document.getElementsByClassName("opponent")[0];
opponentInfo.style.width = ((innerWidth - canvas.width) / 2).toString() + "px";
opponentInfo.style.height = (canvas.height * 2 / 3).toString() + "px";
opponentInfo.style.float = "right";
opponentInfo.style.display = "flex";
opponentInfo.style.marginTop = canvas.style.marginTop;
opponentInfo.style.marginLeft = '-8px';
opponentInfo.zIndex = 0;

opponentInfo.style.flexDirection = "column";
opponentInfo.style.alignItems = "center";
opponentInfo.style.justifyContent = "space-around";

const countScore = (element, isPlayer) => {
    let score = 0;
    if (isPlayer) {
        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize / 2; j++) {
                score += currentField[i][j];
            }
        }
    } else {
        for (let i = 0; i < fieldSize; i++) {
            for (let j = fieldSize / 2; j < fieldSize; j++) {
                score += currentField[i][j];
            }
        }
    }
    element.textContent = score.toString();
};

const playerName = document.createElement('h1');
playerName.textContent = "Player";
playerInfo.appendChild(playerName);

const playerScore = document.createElement('h2');
countScore(playerScore, true);

const button = document.createElement('input');
button.type = "button";
button.value = "End turn";
playerInfo.appendChild(playerScore);
playerInfo.appendChild(button);

const opponentName = document.createElement('h1');
opponentName.textContent = "Bot (easy)";
opponentInfo.appendChild(opponentName);

const opponentScore = document.createElement('h2');
countScore(opponentScore, false);
opponentInfo.appendChild(opponentScore);

button.addEventListener("click", () => {
    clearMatrix(resultMatrix);
    contextStroke.clearRect(0, 0, canvasStroke.width, canvasStroke.height);
    contextStroke.strokeRect(canvasInnerMargin + j_min * (squareSide),
        canvasInnerMargin + i_min * (squareSide),
        (j_current - j_min + 1) * squareSide,
        (i_current - i_min + 1) * squareSide);
    saveArea(i_min, i_current, j_min, j_current, playerMatrix);

    const op_min_i = randomInt(0, 7);
    const op_min_j = randomInt(0, 7);

    const offset_i = randomInt(0, 7 - op_min_i);
    const offset_j = randomInt(0, 7 - op_min_j);

    contextStroke.lineWidth = 4;
    contextStroke.strokeRect(canvasInnerMargin + op_min_j * (squareSide),
        canvasInnerMargin + op_min_i * (squareSide),
        (offset_j + 1) * squareSide,
        (offset_i + 1) * squareSide);

    saveArea(op_min_i, op_min_i + offset_i, op_min_j, op_min_j + offset_j, opponentMatrix);

    evalResult(playerMatrix, opponentMatrix, resultMatrix);

    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            if (resultMatrix[i][j]) {
                currentField[i][j] = nextMatrix[i][j];
            }
        }
    }

    evalNextMatrix();
    drawMatrix();
    clearMatrix(playerMatrix);
    clearMatrix(opponentMatrix);

    countScore(playerScore, true);
    countScore(opponentScore, false);
});
