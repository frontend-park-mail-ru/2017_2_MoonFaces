'use strict';

const strokeColor = '#4da6ff';

const canvas = document.getElementsByClassName('background')[0];

canvas.style.margin = '-31px 0';
canvas.style.position = 'fixed';
canvas.style.zIndex = -1;
canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext( '2d' );
context.strokeStyle = strokeColor;
context.lineWidth = 3;

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
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

for (let i = 0; i < horizontal; i++) {
    for (let j = 0; j < vertical; j++) {
        context.strokeRect(i * (squareSide), j * (squareSide), squareSide, squareSide);
    }
}

const animate = (draw, duration) => {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }

    });
};

const blink = (col, row) => {
    animate((timePassed) => {
        context.clearRect(col * squareSide, row * squareSide, squareSide, squareSide);
        if (timePassed <= 2000) {
            context.fillStyle = 'rgba(84, 90, 177,' + (timePassed / 2000) + ')';
        } else {
            context.fillStyle = 'rgba(84, 90, 177,' + ((4000 - timePassed) / 2000) + ')';
        }
        context.fillRect(col * squareSide, row * squareSide, squareSide, squareSide);
        context.strokeRect(col * squareSide, row * squareSide, squareSide, squareSide);
    }, 4000);
};

setInterval(() => {
    const i = randomInt(0, vertical - 1);
    const j = randomInt(0, horizontal - 1);
    blink(j, i);
}, 1000);