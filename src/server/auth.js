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
    return done(null, profile);
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