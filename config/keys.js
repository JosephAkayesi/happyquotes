if(process.env.NODE_ENV){
    module.exports = {
        mongoURI: 'mongodb://joseph:joseph94@ds046027.mlab.com:46027/todo',
        secretOrKey: 'secret',
        magicPassword: 'crystal',
        cloudName: 'tutcan',
        apiKey: '451298485553267',
        apiSecret: 'og2iz8NaKlSgAxIwpRfFsF-0czQ'
    }
}
else {
    module.exports = {
        mongoURI:  'mongodb://localhost/happyquotes',
        secretOrKey: 'secret',
        magicPassword: 'crystal',
        cloudName: 'tutcan',
        apiKey: '451298485553267',
        apiSecret: 'og2iz8NaKlSgAxIwpRfFsF-0czQ'
    }
}
