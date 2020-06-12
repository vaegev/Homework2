import User from '../models/users.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';

require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;

// Create a passport middleware to handle User login
passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, async (login, password, done) => {
    try {
        // Find the user associated with the login provided by the user
        const user = await User.findOne({ where: { login } });
        if (!user) {
            // If the user isn't found in the database, return a message
            return done(null, false, { message: 'User not found' });
        }
        // Validate password and make sure it matches with the corresponding hash stored in the database
        // If the passwords match, it returns a value of true.
        const validate = await user.validPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        // Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
}));

const JWTMiddleware = (req, res, next) => {
    if (!req.get('Authorization')) {
        res.status(401).json({ error: 'Unauthorized' });
    } else {
        try {
            const decode = jwt.verify(req.get('Authorization'), process.env.SECRET_KEY);
            if (decode.user) {
                req.user = decode.user;
                next();
            }
        } catch (e) {
            res.status(403).json({ error: 'Forbidden' });
        }
    }
};


module.exports = { passport, JWTMiddleware };
