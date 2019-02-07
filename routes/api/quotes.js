const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load Quote model
const Quote = require('../../models/Quote')

//Load Admin model
const Admin =  require('../../models/Admin')

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
    if (!isValid) {
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

// @route   GET api/quotes
// @desc    Get quotes
// @access  Public
router.get('/', (req, res) => {
    Quote.find()
        .sort({ dateAdded: -1 })
        .then(quotes => res.json(quotes))
        .catch(err => res.status(404).json({ noQuotesFound: 'No Quote found with that Id' }))
})

// @route   GET api/quotes/:id
// @desc    Get quotes by id
// @access  Public
router.get('/:id', (req, res) => {
    Quote.findById(req.params.id)
        .then(quote => res.json(quote))
        .catch(err => res.status(404).json({ noQuoteFound: 'No quote found with that Id' }))
})

// @route   DELETE api/quotes/:id
// @desc    Delete quote
// @access  Public
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user.id)
    Admin.findOne({admin: req.user.id})
        .then(admin => {
            Quote.findById(req.params.id)
                .then(quote => {
                    if(quote.admin.toString() !== req.user.id){
                        return res.status(401).json({notAuthorized: 'Admin not authorized'})
                    }
                    quote.remove()
                        .then(() => res.json({success: true}))
                })
                .catch(err => res.status(404).json({noQuoteFound: 'No quote found'}))
        })
        
})

module.exports = router;
