import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';
import axios from 'axios';
import passport from './auth.js';
import dotenv from 'dotenv';
import { sequelize, User, UserProfile } from './db/index.js';
import session from 'express-session';

dotenv.config();

const app = express();
const PORT = 3000;

// Configure express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'quizzia', // Use a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));

// Middleware
app.use(cors());
app.use(express.json());

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/google/failure',
}), (req, res) => {
  // set the current user id
  req.session.userId = req.user.id;
  // console.log('User authenticated:', req.user); // Check if req.user is populated
  res.redirect('/home'); // Redirect to home after successful login
});

//is logged in loader get end point
app.get('/api/isloggedin', (req, res) => {
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get('/api/current-user', async (req, res) => {
  if (req.user) {
    const user = await User.findOrCreate({
      where: { googleId: req.user.id },
      defaults: {
        firstName: req.user.name.givenName,
        lastName: req.user.name.familyName,
        userName: req.user.displayName,
        googleId: req.user.id,
        image_url: req.user.picture,
        email: req.user.email
      }
    });

    res.status(200).send(user[0]);
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});

app.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const profile = await UserProfile.findOne({ where: { userId }});
  res.status(200).send(profile);
});

// destroy the session on logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error('Error logging out:', err);

    req.session.destroy((error) => {
      if (error) console.error('Error destroying session:', error);
      res.send('Logout successful');
    });
  });
});

// temp user routes => move these to their own files before you overcrowd this file
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

// used only to seed users
app.post('/seedUser', async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, userName, googleId, image_url, email } = req.body;
  const user = await User.findOrCreate({
    where: { googleId: googleId },
    defaults: {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      googleId: googleId,
      image_url: image_url,
      email: email
    }
  });
  // console.log(user);
  res.status(201).send("User created");
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

// update user's profile
app.put('/editProfile/:userId', async (req, res) => {
  const { bio, favoriteGenre, occupation} = req.body;
  const { userId } = req.params;

  const values = {};
  const { dataValues } = await UserProfile.findOne({ where: { userId }, attributes: ['bio', 'favoriteGenre', 'occupation']});

  if (dataValues.bio !== bio) values.bio = bio;
  if (dataValues.favoriteGenre !== favoriteGenre) values.favoriteGenre = favoriteGenre;
  if (dataValues.occupation !== occupation) values.occupation = occupation;

  await UserProfile.update(values, { where: { userId }});
  res.sendStatus(201);
});




viteExpress.listen(app, PORT, () => {console.log(`Server is listening at ${PORT}`)});