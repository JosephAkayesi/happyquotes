const router =  require('express').Router()

// @route   GET api/quotes/test
// @desc    Tests quotes route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Quotes route works'}))

module.exports = router;
