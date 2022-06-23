const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "320616914224-d9grtevvf2o6ul7d8r3pvj2udnsi7u2o.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


const FACEBOOK_APP_ID = "1404651690036249";
const FACEBOOK_APP_SECRET = "faff535843d9ce6f7ecacbf3af0f977c";



passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   done(null, profile)
  }
));

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ['id', 'emails', 'name', 'picture'] 
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);



passport.serializeUser((user,done)=>{
    done(null,user)
});

passport.deserializeUser((user, done) => {
    done(null, user);
  });