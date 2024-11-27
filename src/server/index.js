import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';
import axios from 'axios';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from './auth.js';
import dotenv from 'dotenv';
import { sequelize, User } from './db/index.js';
import session from 'express-session';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

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

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/auth/google/failure'
}));

//is logged in loader get end point
app.get('/api/isloggedin', (req, res) => {
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// temp user routes => move these to their own files before you overcrowd this file
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