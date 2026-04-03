import rateLimit from 'express-rate-limit';

export const translateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: 'Only 10 requests are allowed in 15 minutes (Rate Limit), Come back later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    message: 'Only 5 user are allowed to login in 15 minutes (Rate Limit), Come back later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});