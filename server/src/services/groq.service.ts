import Groq from 'groq-sdk';
import { TranslationResult } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export const translateJargon = async (text: string, mode: string): Promise<TranslationResult[]> => {

    const modeContext: Record<string, string> = {
        corporate: 'corporate office emails and business communication',
        job: 'job listings and recruitment posts',
        legal: 'legal documents, contracts and terms & conditions',
        hr: 'HR communications, performance reviews and company policies',
        vc: 'startup and venture capital pitch language',
    };

    const context = modeContext[mode] || 'general professional communication';

    const prompt = `You are a brutally honest translator who exposes the gap between what ${context} says and what it actually means.

Analyze the following text and break it into individual sentences or phrases. For each one, provide a translation.

Return a JSON array where each item has:
- "original": the original sentence or phrase
- "translation": what it ACTUALLY means in plain, honest English
- "red_flag": true or false — is this a warning sign?
- "severity": one of "mild", "spicy", or "alarm"

Be sharp, specific, and occasionally witty — but always grounded in truth. Expose the system, not people.

Text to translate:
"""
${text}
"""

Return ONLY a valid JSON array. No markdown, no explanation, no preamble.`;

    const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
        temperature: 0.7,
        max_tokens: 2000,
    });

    const content = response.choices[0].message.content || '[]';

    const cleaned = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    const result: TranslationResult[] = JSON.parse(cleaned);
    return result;
};