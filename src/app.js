'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const app = express();
const imdb = require('imdb-api');
let movieTitle = process.argv.slice(2)[0]


// IMDB has its own methods
const cli = new imdb.Client({apiKey: `${process.env.MOVIES_API_KEY}`});

cli.search({'name': movieTitle}).then((search) => {
    for (const result of search.results) {
        console.log(result);
    }
});

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

// Testing server route
app.get('/test', (res, req) => res.status(200).send('hello'));


let start = (port = process.env.PORT) => {
    app.listen(port, () => {
        console.log(`Server Up on ${port}`);
    });
};

module.exports = {app,start};
