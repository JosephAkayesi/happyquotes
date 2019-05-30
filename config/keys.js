// Use environment variables
require('dotenv').config()

if(process.env.NODE_ENV){
    module.exports = {
        mongoURI: process.env.PROD_MONGOURI,
        secretOrKey: process.env.PROD_SECRET,
        magicPassword: process.env.PROD_MAGICPASSWORD,
        cloudName: process.env.PROD_CLOUDINARYCLOUDNAME,
        apiKey: process.env.PROD_CLOUDINARYAPIKEY,
        apiSecret: process.env.PROD_CLOUDINARYAPISECRET
    }
}
else {
    module.exports = {
        mongoURI: process.env.DEV_MONGOURI,
        secretOrKey: process.env.DEV_SECRET,
        magicPassword: process.env.DEV_MAGICPASSWORD,
        cloudName: process.env.DEV_CLOUDINARYCLOUDNAME,
        apiKey: process.env.DEV_CLOUDINARYAPIKEY,
        apiSecret: process.env.DEV_CLOUDINARYAPISECRET
    }
}