import User from '../models/users.model';
import passport from 'passport';

require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// passport.use('signup', new LocalStrategy({
//     usernameField : 'email',
//     passwordField : 'password'
// }, async (email, password, done) => {
//     try {
//         //Save the information provided by the user to the the database
//         const user = await UserModel.create({ email, password });
//         //Send the user information to the next middleware
//         return done(null, user);
//     } catch (error) {
//         done(error);
//     }
// }));

//Create a passport middleware to handle User login
passport.use('login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, async (login, password, done) => {
    try {
        //Find the user associated with the login provided by the user
        const user = await User.findOne({ where: { login } });
        if (!user) {
            //If the user isn't found in the database, return a message
            return done(null, false, { message: 'User not found' });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.validPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        //Send the user information to the next middleware
        return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
        return done(error);
    }
}));

//This verifies that the token sent by the user is valid
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}, async (token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));

module.exports = passport;
