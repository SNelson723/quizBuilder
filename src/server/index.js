import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));

// General api endpoints
app.get('/getQuiz', (req, res) => {
  const { url, amount, difficulty, category, type , api_key } = req.query;
  console.log(url, amount, difficulty, category, type, api_key);
  const finalUrl = `${url}amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}&token=${api_key}`;
  res.send("Working on it")
});

viteExpress.listen(app, PORT, () => {console.log(`Server is listening at ${PORT}`)});