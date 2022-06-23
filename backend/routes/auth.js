const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = "http://localhost:3000/"


router.get('/google', passport.authenticate("google", {    scope: [
    'profile',
    'https://www.googleapis.com/auth/userinfo.email'
]}));



router.get("/login/success", (req,res) => {
    res.status(200).json({
        success: false,
        message: 'successfull',
        user: req.user,
        cokkies: req.cookies
    })
});

router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    })
});

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

module.exports = router