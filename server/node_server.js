'use strict';

const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.send('404 Achievement unlocked: explorer');
});

app.listen(process.env.PORT || '3000', () => {
    console.log('Hasshin');
});