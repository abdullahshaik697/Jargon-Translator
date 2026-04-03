import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Test route
app.get('/', (req, res) => {
  res.json({ message: '✅ Jargon Translator API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});