const express = require('express')
const app = express()
const keys = require('../config/keys')
const Database = require('../config/database')
const Middleware = require('../config/middleware')
const Cloudinary = require('../config/cloudinary')
const path = require('path')
const Routes = require('../config/routes')

// Cors middleware
app.use(Middleware.Cors().initialize)

// Body Parser Middleware
app.use(Middleware.BodyParser().initialize.urlEncoded)
app.use(Middleware.BodyParser().initialize.json)

// Helmet Middleware
app.use(Middleware.Helmet().initialize)

//Cloudinary Config
Cloudinary.initializeCloudinary(keys)

// Connect to MongoDB
Database.connectDatabase(keys.mongoURI)

// Passport Middleware
app.use(Middleware.Passport().initialize);

// Passport Config
require('../config/passport')(Middleware.Passport().getVariable)

// Use Routes
app.use('/api/quotes', Routes.Quote().use)
app.use('/api/admins', Routes.Admin().use)

const port = process.env.PORT || 5000

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
}

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => { console.log(`Server running on port ${port}`) })
}

module.exports = app