import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';

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
  console.log(req.query)
});

viteExpress.listen(app, PORT, () => {console.log(`Server is listening at ${PORT}`)});