'use strict';

const express = require('express');
const fallback = require('express-history-api-fallback');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();


app.use(morgan('dev'));
app.use(body.json());
app.use(cookie());
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});
app.use(express.static('dist', {
    setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://bacterio-back.herokuapp.com/', 'http://bacterio-back.herokuapp.com/');
    }
}
));
app.use(fallback('index.html', { root: 'dist' }));


const users = {};
const ids = {};

app.post('/signup', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const login = req.body.login;
    if (
        !password ||
        !email ||
        !login ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/^\w+@[a-z]+\.[a-z]+$/)
    ) {
        return res.status(400).json({error: 'Не валидные данные пользователя'});
    }
    if (users[login]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    const id = uuid();
    const user = {login, password, email, score: 0};
    ids[id] = login;
    users[login] = user;

    res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.post('/signin', (req, res) => {
    const password = req.body.password;
    const login = req.body.login;
    if (!password || !login) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[login] || users[login].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    const id = uuid();
    ids[id] = login;

    res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.get('/current', (req, res) => {
    const id = req.cookies['sessionid'];

    const login = ids[id];
    if (
        !login ||
        !users[login]
    ) {
        return res.status(401).end();
    }

    res.json(users[login]);
});

app.get('/top', (req, res) => {
    const data = {users:[
        {name: 'John', score: '82'},
        {name: 'Billy', score: '33'},
        {name: 'Klark', score: '28'},
        {name: 'Bob', score: '16'},
        {name: 'Kerson', score: '10'}
    ]};
    return res.json(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
