'use strict';

import multiplayer from './multiplayer/main';
import express from 'express';
import fallback from 'express-history-api-fallback';
import body from 'body-parser';
import cookie from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(body.json());
app.use(cookie());
app.use((req, res, next) => {
    if (req.get('host').split(':')[0] !== 'localhost' && req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});

app.use(express.static('dist',
    {
        setHeaders: (res) => {
            res.setHeader('Access-Control-Allow-Origin', 'https://bacterio-back.herokuapp.com/', 'http://bacterio-back.herokuapp.com/');
        }
    }
));

app.use(fallback('index.html', {root: 'dist'}));

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
