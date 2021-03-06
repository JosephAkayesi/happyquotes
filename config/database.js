class Database {
    constructor() {
        this.mongoose = require('mongoose')
    }

    connectDatabase(db) {
        this.mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true  })
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(`Error: ${err.message}`))
    }
}

module.exports = new Database()