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

// Method for adding new quotes
app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote
    const newPerson = req.query.person
    if (newQuote && newPerson) {
        quotes.push({quote: newQuote, person: newPerson})
        res.send({quote: {quote: newQuote, person: newPerson}})
    }
    else {
        res.status(400).send()
    }
})

app.listen(PORT)
console.log(`Listening on port: ${PORT}`)
