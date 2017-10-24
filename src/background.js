'use strict';

const strokeColor = '#4da6ff';

const canvas = document.getElementsByClassName('background')[0];

canvas.style.margin = '-31px 0';
canvas.style.position = 'fixed';
canvas.style.zIndex = -1;
canvas.width = innerWidth * 1.1;
canvas.height = innerHeight * 1.1;

const context = canvas.getContext( '2d' );
context.strokeStyle = strokeColor;
context.lineWidth = 3;

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
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

let squareSide = 0;
let horizontal = 0;
let vertical = 0;

if(innerWidth >= innerHeight) {
    vertical = 11;
    squareSide = window.innerHeight / vertical;
    horizontal = Math.floor(innerWidth / squareSide) + 3;
} else {
    horizontal = 8;
    squareSide = window.innerWidth / horizontal;
    vertical = Math.floor(innerHeight / squareSide) + 3;
}

for (let i = 0; i <= horizontal; i++) {
    for (let j = 0; j <= vertical; j++) {
        context.strokeRect(i * (squareSide), j * (squareSide), squareSide, squareSide);
    }
}

let cells = createMatrix(vertical + 1, horizontal + 1);

const animate = (draw, duration) => {
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

    });
};

const blink = (col, row) => {
    animate((timePassed) => {
        context.clearRect(col * squareSide, row * squareSide, squareSide, squareSide);
        if (timePassed <= 3000) {
            context.fillStyle = 'rgba(84, 90, 177,' + (timePassed / 3000) + ')';
        } else {
            context.fillStyle = 'rgba(84, 90, 177,' + ((6000 - timePassed) / 3000) + ')';
        }
        context.fillRect(col * squareSide, row * squareSide, squareSide, squareSide);
        context.strokeRect(col * squareSide, row * squareSide, squareSide, squareSide);
        if(timePassed > 5990) {
            cells[row][col] = 0;
        }
    }, 6000);
};


let fps = 50;
let then = performance.now();
let interval = 1000/fps;

function generateRandomField() {
    requestAnimationFrame(generateRandomField);
    let now = performance.now();
    let delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        const i = randomInt(0, vertical);
        const j = randomInt(0, horizontal);
        if (cells[i][j] !== 1) {
            cells[i][j] = 1;
            blink(j, i);
        }
    }
}

generateRandomField();