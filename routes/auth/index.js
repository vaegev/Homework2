import express from 'express';
import {passport} from '../../services/auth.service';
import jwt from 'jsonwebtoken';
require('dotenv').config();


const router = express.Router();

/* POST login. */
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occurred');
                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                // We don't want to store the sensitive information such as the
                // user password in the token so we pick only the email and id
                const body = { id: user.id, login: user.login };
                console.log(body);
                // Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
                // Send back the token to the user
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;
