import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendWelcomeEmail = async (name: string, email: string) => {
    try {
        await transporter.sendMail({
            from: `"Jargon Translator" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Jargon Translator! 🎉',
            html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
  
  <!-- Header -->
  <div style="background-color: #111827; padding: 32px 40px;">
    <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.3px;">Jargon Translator</h1>
    <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">Decode the language behind the words</p>
  </div>

  <!-- Body -->
  <div style="padding: 40px;">
    <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 12px;">Welcome aboard, ${name}.</h2>
    <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
      Thank you for joining <strong>Jargon Translator</strong>. Your account has been successfully created. 
      We built this tool for one simple reason — corporate, legal, and HR language is often designed to obscure meaning. 
      We help you see through it.
    </p>

    <!-- Divider -->
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 24px;" />

    <!-- Features -->
    <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.05em;">What you can do</p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 16px; background: #f9fafb; border-radius: 6px; margin-bottom: 8px; display: block;">
          <p style="margin: 0; font-size: 14px; color: #111827; font-weight: 500;">📧 Corporate Emails</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">Find out what your manager is actually saying between the lines.</p>
        </td>
      </tr>
      <tr><td style="padding: 4px 0;"></td></tr>
      <tr>
        <td style="padding: 12px 16px; background: #f9fafb; border-radius: 6px; display: block;">
          <p style="margin: 0; font-size: 14px; color: #111827; font-weight: 500;">💼 Job Listings</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">Understand what a role truly demands before you apply.</p>
        </td>
      </tr>
      <tr><td style="padding: 4px 0;"></td></tr>
      <tr>
        <td style="padding: 12px 16px; background: #f9fafb; border-radius: 6px; display: block;">
          <p style="margin: 0; font-size: 14px; color: #111827; font-weight: 500;">⚖️ Legal Documents</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">Decode terms and conditions, contracts, and notices in plain English.</p>
        </td>
      </tr>
      <tr><td style="padding: 4px 0;"></td></tr>
      <tr>
        <td style="padding: 12px 16px; background: #f9fafb; border-radius: 6px; display: block;">
          <p style="margin: 0; font-size: 14px; color: #111827; font-weight: 500;">🏢 HR Communications</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #6b7280;">Cut through performance review language and policy documents.</p>
        </td>
      </tr>
    </table>

    <!-- CTA -->
    <div style="margin: 32px 0 0; text-align: center;">
      <a href="${process.env.CLIENT_URL}" 
         style="display: inline-block; background-color: #111827; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 15px; font-weight: 500; letter-spacing: 0.2px;">
        Start Translating →
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
    <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6;">
      You are receiving this email because you recently created an account on Jargon Translator. 
      If this was not you, please disregard this email.
    </p>
    <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0;">
      © 2025 Jargon Translator. All rights reserved.
    </p>
  </div>

</div>
      `,
        });
        console.log(`✅ Welcome email sent to ${email}`);
    } catch (error) {
        console.error('❌ Email send karne mein error:', error);
    }
};