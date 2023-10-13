// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import { isValidToken } from './utils/isValidToken';
import cors from 'cors'; // Import the 'cors' package

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/validate-token', (req, res) => {
  const token = req.body.token;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Invalid token provided' });
  } else {
    const isValid = isValidToken(token);
    res.json({ isValid });
  }
});


app.listen(port, () => {
  console.log(`ValidatorService is running on port ${port}`);
});
