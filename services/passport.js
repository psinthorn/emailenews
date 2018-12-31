const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./../configs/keys");
const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//Tell passport to use GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleSecretKey,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const excitingUser = await User.findOne({ googleID: profile.id });
      if (excitingUser) {
        return done(null, excitingUser);
      }
      const newUser = await new User({ googleID: profile.id }).save();
      done(null, newUser);
    }
  )
);

//#if you need to use Async/Await you can refactoring code as below
// async (accessToken, refreshToken, profile, done) => {
//   const excitingUser = await User.findOne({ googleID: profile.id });
//   if (excitingUser) {
//     done(null, excitingUser);
//   } else {
//     const newUser = await new User({ googleID: profile.id }).save();
//     done(null, newUser);
//   }
// }

//#Use traditional Promise
// (accessToken, refreshToken, profile, done) => {
//   User.findOne({ googleID: profile.id }).then(excitingUser => {
//     if (excitingUser) {
//       done(null, excitingUser);
//     } else {
//       new User({ googleID: profile.id }).save().then(newUser => {
//         done(null, newUser);
//       });
//     }
//   });
// }
