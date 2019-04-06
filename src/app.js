'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const app = express();
const imdb = require('imdb-api');

// const cli = new imdb.Client({apiKey: `${process.env.MOVIES_API_KEY}`});

imdb.search({
    name: 'Shazam'
}, {
    apiKey: `${process.env.MOVIES_API_KEY}`
}).then(console.log).catch(console.log);

// Esoteric Resources
const errorHandler = require('../src/middleware/500' );
const notFound = require( '../src/middleware/404' );

// App Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Catchalls
app.use(notFound);
app.use(errorHandler);

app.get('/test', (res, req) => res.status(200).send('hello'));


let start = (port = process.env.PORT) => {
    app.listen(port, () => {
        console.log(`Server Up on ${port}`);
    });
};

module.exports = {app,start};
