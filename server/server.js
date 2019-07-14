const express = require('express')
const app = express()
const keys = require('../config/keys')
const mongoose = require('mongoose')
const Middleware = require('../config/middleware')
const cloudinary = require('cloudinary')
const path = require('path')
const admins = require('../routes/api/admins')
const quotes = require('../routes/api/quotes')

// Cors middleware
app.use(Middleware.Cors().initialize)

// Body Parser Middleware
app.use(Middleware.BodyParser().initialize.urlEncoded)
app.use(Middleware.BodyParser().initialize.json)

// Helmet Middleware
app.use(Middleware.Helmet().initialize)

// Db Config
const db = require('../config/keys').mongoURI;

//Cloudinary Config
cloudinary.config({ cloud_name: keys.cloudName, api_key: keys.apiKey, api_secret: keys.apiSecret })

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`Error: ${err.message}`))

// Passport Middleware
app.use(Middleware.Passport().initialize);

// Passport Config
require('../config/passport')(Middleware.Passport().getVariable)

// Use Routes
app.use('/api/quotes', quotes)
app.use('/api/admins', admins)

const port = process.env.PORT || 5000

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('/*', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => { console.log(`Server running on port ${port}`) })
}

module.exports = app

