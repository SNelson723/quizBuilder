import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';
import axios from 'axios';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Passport Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: import.meta.process.env.VITE_GOOGLE_CLIENT_ID,
//     clientSecret: import.meta.process.env.VITE_GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback",
//     passReqToCallback: true
//   },
//   (request, accessToken, refreshToken, profile, done) => {
//     // Replace this with your user creation/finding logic
//     User.findOrCreate({ googleId: profile.id }, (err, user) => {
//       return done(err, user);
//     });
//   }
// ));

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));

// Google OAuth routes
// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// app.get('/auth/google/callback', passport.authenticate('google', {
//   successRedirect: '/auth/google/success',
//   failureRedirect: '/auth/google/failure'
// }));

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