import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Define TypeScript interfaces for better type checking
interface EmailData {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
}

// Create email transporter with the configuration that works
const createTransporter = () => {
    // Log the configuration being used (for debugging)
    console.log('Creating email transporter with:');
    console.log('- EMAIL_USER:', process.env.EMAIL_USER);
    console.log('- EMAIL_APP_PASSWORD is set:', process.env.EMAIL_APP_PASSWORD ? 'Yes' : 'No');
    
    // Use the working configuration from your single-file implementation
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
};

// Initialize and verify transporter
const transporter = createTransporter();

// Verify SMTP connection on startup
export const verifyEmailConfig = async (): Promise<boolean> => {
    try {
        return await new Promise<boolean>((resolve, reject) => {
            transporter.verify((error) => {
                if (error) {
                    console.error('SMTP connection error:', error);
                    console.log('Email service will not be available. Check your Gmail credentials.');
                    reject(error);
                    return false;
                } else {
                    console.log('SMTP server is ready to accept messages');
                    resolve(true);
                    return true;
                }
            });
        });
    } catch (error) {
        console.error('Email verification error:', error);
        return false;
    }
};

// Test email configuration
export const testEmailConfig = async (): Promise<boolean> => {
    try {
        console.log('Testing email configuration...');
        console.log('Email user:', process.env.EMAIL_USER);
        console.log('Email password is set:', process.env.EMAIL_APP_PASSWORD ? 'Yes' : 'No');

        // Verify connection
        const isConnected = await verifyEmailConfig();
        if (!isConnected) {
            return false;
        }

        // Optional: Send a test email
        if (process.env.EMAIL_USER) {
            const testMailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send to yourself for testing
                subject: 'Test Email Configuration',
                html: '<h1>Test Email</h1><p>This confirms your email configuration is working.</p>',
            };

            const info = await transporter.sendMail(testMailOptions);
            console.log('Test email sent successfully! Message ID:', info.messageId);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Email test error:', error);
        return false;
    }
};

// Send email function
export const sendEmail = async (recipientEmail: string, data: EmailData): Promise<string> => {
    try {
        console.log('Attempting to send email to:', recipientEmail);

        // Configure email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Your Gmail address
            to: recipientEmail, // Recipient email
            subject: `Contact from ${data.name}${data.company ? ` at ${data.company}` : ''}`,
            html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Contact Name:</strong> ${data.name}</p>
        <p><strong>Company Name:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        <p><strong>Phone Number:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully! Message ID:', info.messageId);
        return info.messageId;
    } catch (emailError: any) {
        console.error('Email sending error:', emailError);
        console.error('Error details:', emailError.message);
        throw new Error(`Failed to send email: ${emailError.message}`);
    }
};

// Initialize on import
verifyEmailConfig().catch(error => {
    console.error('Failed to verify email configuration on startup:', error);
});

export default {
    sendEmail,
    testEmailConfig,
    verifyEmailConfig
};