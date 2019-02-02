const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load input validation
const validateRegisterInput = require('../../validation/register')

// Load admin model
const Admin = require('../../models/Admin')

// @route   GET api/admins/test
// @desc    Tests admins route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Admins route works' }))

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

     // Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // if(req.body.magicPassword !== 'crystal') {
    //     console.log('Magic password invalid')
    //     return
    // }

    Admin.findOne({ email: req.body.email })
        .then(admin => {
            if (admin) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d: 'mm' //Default
                });

                const newAdmin = new Admin({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin.save()
                            .then(admin => res.json(admin))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// @route   GET api/admins/login
// @desc    Login admin / Returning JWT token
// @access  Public
router.post('/login', (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);

    //Check Validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    const email = req.body.email;
    const password = req.body.password;

    //Find Admin by email
    Admin.findOne({ email })
        .then(admin => {
            if (!admin) {
                // errors.email = 'User not found';
                return res.status(404).json({ msg: 'User not found' });
            }

            //Check Password
            bcrypt.compare(password, admin.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User Matched
                        const payload = { id: admin.id, name: admin.name, username: admin.username, avatar: admin.avatar }; //Create JWT Payload

                        //Sign Token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        });
                    }
                    else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });

            // bcrypt.compare(password, admin.password)
            //     .then(isMatch => {
            //         if (isMatch) {
            //             res.json({ msg: 'Success' })
            //         }
            //         else {
            //             return res.status(400).json({ password: 'Password incorrect' })
            //         }
            //     })

        });
});

// @route   GET api/admins/current
// @desc    Return current admin
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email
    })
})

module.exports = router;
