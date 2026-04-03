import { Router } from 'express';
import { register, login, googleCallback, getMe } from '../controllers/auth.controllers';
import { verifyToken } from '../middlewares/auth';
import { authLimiter } from '../middlewares/rateLimit';
import passport from '../config/passport';

const router = Router();

// Email & Password
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
    session: false
  }),
  googleCallback
);

// Protected
router.get('/me', verifyToken, getMe);

export default router;