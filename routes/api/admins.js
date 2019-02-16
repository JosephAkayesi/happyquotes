const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

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
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Admin.findOne()
        .or([{ email: req.body.email }, { username: req.body.username }])
        .then(admin => {
            if (admin !== null && admin.email.toLowerCase === req.body.email.toLowerCase) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            }
            else if (admin !== null && admin.username.toLowerCase === req.body.username.toLowerCase) {
                errors.username = 'Username already exists'
                return res.status(400).json(errors)
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size
                    r: 'pg', // Rating
                    d: 'mm' // Default
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
                            .then(() => {
                                const username = req.body.username
                                const email = req.body.email
                                const password = req.body.password

                                // Find Admin by email or username -> Login admin after register
                                Admin.findOne()
                                    .or([{ email: email }, { username: username }])
                                    .then(admin => {
                                        if (!admin) {
                                            errors.usernameOrEmail = 'User not found';
                                            return res.status(404).json(errors);
                                        }

                                        // Check Password
                                        bcrypt.compare(password, admin.password)
                                            .then(isMatch => {
                                                if (isMatch) {
                                                    // User Matched
                                                    const payload = { id: admin.id, name: admin.name, username: admin.username, avatar: admin.avatar }; //Create JWT Payload

                                                    // Sign Token
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
                                    });
                            })
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
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;

    //Find Admin by email
    Admin.findOne()
        .or([{ email: usernameOrEmail }, { username: usernameOrEmail }])
        .then(admin => {
            if (!admin) {
                errors.usernameOrEmail = 'User not found';
                return res.status(404).json(errors);
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
