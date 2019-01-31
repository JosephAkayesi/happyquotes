if(process.env.NODE_ENV){
    module.exports = {
        mongoURI: 'mongodb://joseph:joseph94@ds046027.mlab.com:46027/todo',
        secretOrKey: 'secret'
    }
}
else {
    module.exports = {
        mongoURI:  'mongodb://localhost/happyquotes',
        secretOrKey: 'secret'
    }
}