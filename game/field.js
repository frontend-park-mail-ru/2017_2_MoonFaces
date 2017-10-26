'use strict';



const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

const saveArea = (iMin, iCurrent, jMin, jCurrent, matrix) => {
    for (let i = iMin; i <= iCurrent; i++) {
        for (let j = jMin; j <= jCurrent; j++) {
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

canvasStroke.addEventListener('mousedown', () => {
    iMin = undefined;
    jMin = undefined;
    let loop;

    const startLoop = event => {
        loop = animation(event);
    };
    canvasStroke.addEventListener('mousemove', startLoop);
    canvasStroke.addEventListener('mouseup', () => {

        cancelAnimationFrame(loop);
        loop = undefined;
        canvasStroke.removeEventListener('mousemove', startLoop);
    });
});

let iMin;
let jMin;
let iCurrent;
let jCurrent;

function animation(event) {
    const x1 = event.clientX - Math.floor(marginLeft);
    const y1 = event.clientY - Math.floor(marginTop);

    iCurrent = Math.floor(y1 / (context.lineWidth / 3 + squareSide));
    jCurrent = Math.floor(x1 / (context.lineWidth / 3 + squareSide));

    if(iMin === undefined) {
        iMin = iCurrent;
        jMin = jCurrent;
    }

    contextStroke.clearRect(0, 0, canvasStroke.width, canvasStroke.height);

    if (iCurrent >= iMin && jCurrent >= jMin) {
        contextStroke.strokeStyle = '#000000';
        contextStroke.lineWidth = 4;
        contextStroke.strokeRect(canvasInnerMargin + jMin * (squareSide),
            canvasInnerMargin + iMin * (squareSide),
            (jCurrent - jMin + 1) * squareSide,
            (iCurrent - iMin + 1) * squareSide);
    }
}

const playerInfo = document.getElementsByClassName('player')[0];
playerInfo.style.width = ((innerWidth - canvas.width) / 2).toString() + 'px';
playerInfo.style.height = canvas.height.toString() + 'px';
playerInfo.style.float = 'left';
playerInfo.style.display = 'flex';
playerInfo.style.marginTop = canvas.style.marginTop;
playerInfo.style.marginLeft = '-8px';
playerInfo.zIndex = 0;

playerInfo.style.flexDirection = 'column';
playerInfo.style.alignItems = 'center';
playerInfo.style.justifyContent = 'space-around';


const opponentInfo = document.getElementsByClassName('opponent')[0];
opponentInfo.style.width = ((innerWidth - canvas.width) / 2).toString() + 'px';
opponentInfo.style.height = (canvas.height * 2 / 3).toString() + 'px';
opponentInfo.style.float = 'right';
opponentInfo.style.display = 'flex';
opponentInfo.style.marginTop = canvas.style.marginTop;
opponentInfo.style.marginLeft = '-8px';
opponentInfo.zIndex = 0;

opponentInfo.style.flexDirection = 'column';
opponentInfo.style.alignItems = 'center';
opponentInfo.style.justifyContent = 'space-around';

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
playerName.textContent = 'Player';
playerInfo.appendChild(playerName);

const playerScore = document.createElement('h2');
countScore(playerScore, true);

const button = document.createElement('input');
button.type = 'button';
button.value = 'End turn';
playerInfo.appendChild(playerScore);
playerInfo.appendChild(button);

const opponentName = document.createElement('h1');
opponentName.textContent = 'Bot (easy)';
opponentInfo.appendChild(opponentName);

const opponentScore = document.createElement('h2');
countScore(opponentScore, false);
opponentInfo.appendChild(opponentScore);

button.addEventListener('click', () => {
    clearMatrix(resultMatrix);
    contextStroke.clearRect(0, 0, canvasStroke.width, canvasStroke.height);
    contextStroke.strokeRect(canvasInnerMargin + jMin * (squareSide),
        canvasInnerMargin + iMin * (squareSide),
        (jCurrent - jMin + 1) * squareSide,
        (iCurrent - iMin + 1) * squareSide);
    saveArea(iMin, iCurrent, jMin, jCurrent, playerMatrix);

    const opMinI = randomInt(0, 7);
    const opMinJ = randomInt(0, 7);

    const iOffset = randomInt(0, 7 - opMinI);
    const jOffset = randomInt(0, 7 - opMinJ);

    contextStroke.lineWidth = 4;
    contextStroke.strokeRect(canvasInnerMargin + opMinJ * (squareSide),
        canvasInnerMargin + opMinI * (squareSide),
        (jOffset + 1) * squareSide,
        (iOffset + 1) * squareSide);

    saveArea(opMinI, opMinI + iOffset, opMinJ, opMinJ + jOffset, opponentMatrix);

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
