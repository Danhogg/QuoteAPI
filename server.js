const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// GETs a random quote
app.get('/api/quotes/random', (req, res, next) => {
    res.send({quote: getRandomElement(quotes)})
})

app.listen(PORT)
console.log(`Listening on port: ${PORT}`)
