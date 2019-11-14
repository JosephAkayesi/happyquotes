class Cloudinary{
    constructor(){
        this.cloudinary = require('cloudinary')
    }

    initializeCloudinary(keys){
        return this.cloudinary.config({ cloud_name: keys.cloudName, api_key: keys.apiKey, api_secret: keys.apiSecret })
    }
}

module.exports = new Cloudinary()