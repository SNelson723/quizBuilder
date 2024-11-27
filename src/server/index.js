import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';
import axios from 'axios';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import dotenv from 'dotenv';
import { sequelize, User } from './db/index.js';
import session from 'express-session'; // Import express-session

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
// app.use(cors());
// app.use(express.json());
// app.use(passport.initialize());

app.use(cors());
app.use(passport.initialize());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });

// console.log(process.env.VITE_GOOGLE_CLIENT_ID, process.env.VITE_GOOGLE_CLIENT_SECRET)

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.VITE_GOOGLE_CLIENT_ID,
  clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
  try {
    // Use findOrCreate with the correct structure
    const [user, created] = await User.findOrCreate({
      where: { googleId: profile.id }, // This is the 'where' clause
      defaults: { // This is the 'defaults' clause
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        user_name: profile.displayName,
      }
    });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
));

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/auth/google/failure'
}));

// temp user routes
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

// General api endpoints
app.get('/getQuiz', async (req, res) => {
  let hasAppended = false;
  let finalUrl = '';

  for (const key in req.query) {
    if (req.query[key]) {

      if (!hasAppended && key !== 'url') {
        finalUrl += `${key}=${req.query[key]}`;
        hasAppended = true;

      } else if (key === 'url') {
        finalUrl = req.query[key];

      } else {
        if (key === 'api_key') {
          finalUrl += `&token=${req.query[key]}`;
        } else {
          finalUrl += `&${key}=${req.query[key]}`;
        }
      }
    }
  }

  try {
    // console.log(finalUrl);
    const { data } = await axios.get(finalUrl);
    console.log(data.results);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
});

viteExpress.listen(app, PORT, () => {console.log(`Server is listening at ${PORT}`)});