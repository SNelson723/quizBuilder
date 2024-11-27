import { sequelize, User } from './db/index.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.VITE_GOOGLE_CLIENT_ID,
  clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
  try {
    // console.log(profile);
    // Use findOrCreate with the correct structure

    // START HERE AND MOVE THIS TO THE HOME PAGE SO THE DATA WILL PERSIST
    const user = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        userName: profile.displayName,
        googleId: profile.id,
        image_url: profile.picture
      }
    });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;