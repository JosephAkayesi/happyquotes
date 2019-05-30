const app = require('express')()
const keys = require('../config/keys')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const path = require('path')
const admins = require('../routes/api/admins')
const quotes = require('../routes/api/quotes')

// Cors middleware
app.use(cors())

// Body Parser Middleware
app.use(bodyParser.urlencoded({ limit: '60mb', extended: false }))
app.use(bodyParser.json({ limit: '60mb', extended: false }))

// Helmet Middleware
app.use(helmet())

// Db Config
const db = require('../config/keys').mongoURI;

//Cloudinary Config
cloudinary.config({ cloud_name: keys.cloudName, api_key: keys.apiKey, api_secret: keys.apiSecret })

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`Error: ${err.message}`))

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('../config/passport')(passport)

// Use Routes
app.use('/api/quotes', quotes)
app.use('/api/admins', admins)

// @route   GET /
// @desc    Test server route
// @access  Public
app.get('/', (req, res) => {
    res.json({msg: 'Test route works'})
})

const port = process.env.PORT || 5000

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => { console.log(`Server running on port ${port}`) })
}

module.exports = app