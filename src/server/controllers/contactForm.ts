// src/server/controllers/contactForm.ts

import { Request, Response } from 'express';
import { sanitize } from '../utils/sanitize';
import { verifyCaptcha } from '../services/recaptcha';
import { sendEmail } from '../services/email';

/**
 * Contact form controller - handles form submission and email sending
 * @param req Express request
 * @param res Express response
 */
export const contactFormController = async (req: Request, res: Response): Promise<void> => {
  console.log('📨 Received contact form submission');
  
  try {
    // Extract form data from request body
    const { contactName, companyName, email, phoneNumber, message, captchaToken } = req.body;
    console.log('Form data received:', { contactName, companyName, email, phoneNumber });
    
    // Sanitize all inputs to prevent XSS attacks
    const sanitizedName = sanitize(contactName);
    const sanitizedCompany = sanitize(companyName);
    const sanitizedEmail = sanitize(email);
    const sanitizedPhone = sanitize(phoneNumber);
    const sanitizedMessage = sanitize(message);
    
    // Validate required fields
    if (!sanitizedName) {
      console.log('Validation failed: Name is required');
      res.status(400).json({
        success: false,
        message: 'Name is required'
      });
      return;
    }
    
    // Check if either email or phone is provided
    if (!sanitizedEmail && !sanitizedPhone) {
      console.log('Validation failed: Email or phone is required');
      res.status(400).json({
        success: false,
        message: 'Either email or phone number is required'
      });
      return;
    }
    
    // Verify CAPTCHA
    console.log('Verifying CAPTCHA token...');
    const isHuman = await verifyCaptcha(captchaToken);
    console.log('CAPTCHA verification result:', isHuman);
    
    if (!isHuman) {
      console.log('CAPTCHA verification failed');
      res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed'
      });
      return;
    }
    
    // Set recipient email from environment variable
    const recipientEmail = process.env.EMAIL_RECIPIENT;
    console.log('Will send email to:', recipientEmail);
    
    // Prepare email data
    const emailData = {
      name: sanitizedName,
      company: sanitizedCompany,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage
    };
    
    // Send the email
    try {
      const messageId = await sendEmail(recipientEmail!, emailData);
      console.log('Email sent successfully! Message ID:', messageId);
      
      // Send success response
      res.status(200).json({
        success: true,
        message: 'Email sent successfully'
      });
    } catch (emailError: any) {
      console.error('Email sending error:', emailError);
      
      // Return specific error response
      res.status(500).json({
        success: false,
        message: `Failed to send email: ${emailError.message}`
      });
    }
  } catch (error: any) {
    console.error('Overall error in contact form:', error);
    
    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Failed to process form submission. Please try again later.'
    });
  }
};

export default {
  contactFormController
};