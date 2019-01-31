const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Admins = mongoose.model('admins');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
        Admins.findById(jwtPayload.id)
            .then(admin => {
                if(admin){
                    return done(null, admin);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    }))
}