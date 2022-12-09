const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.send('logout');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.send(info);
        else {
            req.logIn(user, e => {
                if (e) next(e);
                res.send(user);
            })
        }
    })(req, res, next);
});

router.post('/register', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.send(info);
        else {
            return res.send(user);
        }
    })(req, res, next);
});

module.exports = router