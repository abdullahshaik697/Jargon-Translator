import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './db';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://jargon-translator.onrender.com/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Pehle check karo user already exist karta hai ya nahi
      let user = await prisma.user.findUnique({
        where: { google_id: profile.id },
      });

      if (user) {
        // User exist karta hai — seedha return karo
        return done(null, user);
      }

      // Naya user banao
      user = await prisma.user.create({
        data: {
          google_id: profile.id,
          email: profile.emails?.[0].value!,
          name: profile.displayName,
          avatar: profile.photos?.[0].value,
        },
      });

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;