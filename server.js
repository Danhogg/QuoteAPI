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
// Get all quotes for unspecified author or all of the quotes from a specfic author
app.get('/api/quotes', (req, res, next) => {
    const quotesFiltered = quotes.filter(author => {
        return author.person === req.query.person
    })
    if (req.query.person) {
        res.send({quotes: quotesFiltered})
    } 
    else {
        res.send({quotes})
    }
})

app.listen(PORT)
console.log(`Listening on port: ${PORT}`)
