import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { sendWelcomeEmail } from '../services/mail.service';
import { User } from '../types';

const generateToken = (user: { id: number; email: string; name: string; avatar?: string | null }) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};

// ✅ Register — Email & Password
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Fill All Fields' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters ' });
      return;
    }

    // Check karo user already exist karta hai ya nahi
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email is Already registered' });
      return;
    }


    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 12);

    // User banao
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Welcome email bhejo
    await sendWelcomeEmail(user.name, user.email);

    // Token banao
    const token = generateToken(user);

    res.status(201).json({
      message: 'Account ban gaya!',
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
       console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login — Email & Password
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // User dhundo
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Password check karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Wrong Password' });
      return;
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Google OAuth Callback
export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    // Pehli baar Google se login — welcome email bhejo
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    
    const token = generateToken(user);

    // Frontend pe redirect karo token ke saath
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/login?error=something_went_wrong`);
  }
};

// ✅ Get Current User
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, name: true, email: true, avatar: true, created_at: true },
    });

    res.json({ user: dbUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};