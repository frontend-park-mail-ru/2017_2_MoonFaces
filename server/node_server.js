'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const app = express();


app.use(morgan('dev'));
// app.use(express.static('dist'));
app.use(body.json());
app.use(cookie());
app.use(express.static("dist", {
        setHeaders: (res) => {
            res.setHeader('Access-Control-Allow-Origin', 'https://bacterio-back.herokuapp.com/');
        }
    }
));


const users = {
    'kek': {
        login: 'kek',
        email: 'kek@mail.ru',
        password: 'qweqqweq',
        score: 72,
    },
};
const ids = {};

app.post('/signup', function (req, res) {
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

app.post('/login', function (req, res) {
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

app.get('/current', function (req, res) {
    const id = req.cookies['sessionid'];

    res.json(users['kek']);

    return;

    const login = ids[id];
    if (
        !login ||
        !users[login]
    ) {
        return res.status(401).end();
    }

    res.json(users[login]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});