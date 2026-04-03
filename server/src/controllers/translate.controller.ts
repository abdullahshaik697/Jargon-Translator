import { Request, Response } from 'express';
import prisma from '../config/db';
import { translateJargon } from '../services/groq.service';
import { User } from '../types';

// ✅ Translate
export const translate = async (req: Request, res: Response) => {
  try {
    const { text, mode } = req.body;
    const user = req.user as User;

    if (!text || !mode) {
      res.status(400).json({ message: 'Text aur mode required hai' });
      return;
    }

    if (text.length > 2000) {
      res.status(400).json({ message: 'Text 2000 characters se zyada nahi ho sakta' });
      return;
    }

    const results = await translateJargon(text, mode);

    const translation = await prisma.translation.create({
      data: {
        user_id: user.id,
        mode,
        input_text: text,
        output_json: results as any,
      },
    });

    res.status(201).json({
      message: 'Translation successful!',
      translation,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ History
export const getHistory = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const history = await prisma.translation.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: 'desc' },
      take: 20,
    });

    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Delete
export const deleteTranslation = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const { id } = req.params;

    const translation = await prisma.translation.findUnique({
      where: { id: Number(id) },
    });

    if (!translation) {
      res.status(404).json({ message: 'Translation not found' });
      return;
    }

    if (translation.user_id !== user.id) {
      res.status(403).json({ message: 'Not your translation' });
      return;
    }

    await prisma.translation.delete({ where: { id: Number(id) } });

    res.json({ message: 'Translation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};