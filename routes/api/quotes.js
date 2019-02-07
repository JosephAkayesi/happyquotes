const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load Quote model
const Quote = require('../../models/Quote')

//Validation
const validateQuoteInput = require('../../validation/quote')

// @route   GET api/quotes/test
// @desc    Tests quotes
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Quotes route works' }))

// @route   POST api/quotes
// @desc    Create quotes
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateQuoteInput(req.body)

    //Check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    const newQuote = new Quote({
        admin: req.user.id,
        quote: req.body.quote,
        author: req.body.author,
        dateAdded: Date.now(),
        lastModified: Date.now()
    })
    
    console.warn(newQuote)
    newQuote.save().then(post => res.json(post))
})

module.exports = router;
