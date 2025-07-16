import axios from 'axios';

/**
 * Verifies a reCAPTCHA token
 * @param token The reCAPTCHA token to verify
 * @returns Promise<boolean> Whether the token is valid
 */
export const verifyCaptcha = async (token: string | null): Promise<boolean> => {
  // If no token is provided, verification fails
  if (!token) {
    console.log('No reCAPTCHA token provided');
    return false;
  }

  // Get secret key from environment variables
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not set in environment variables');
    return false;
  }

  // Construct verification URL
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    // Verify token with Google's API
    console.log('Verifying reCAPTCHA token...');
    const response = await axios.post(verificationURL);

    // Log verification result
    const isValid = response.data.success === true;
    console.log('reCAPTCHA verification result:', isValid);

    if (!isValid && response.data['error-codes']) {
      console.log('reCAPTCHA error codes:', response.data['error-codes']);
    }

    return isValid;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
};

/**
 * Tests if the reCAPTCHA service is configured correctly
 * @returns boolean Whether the service is configured correctly
 */
export const testRecaptchaConfig = (): boolean => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not set in environment variables');
    return false;
  }

  console.log('reCAPTCHA configuration:');
  console.log('- Secret key is set:', !!secretKey);
  console.log('- reCAPTCHA verification is enabled');

  return true;
};

export default {
  verifyCaptcha,
  testRecaptchaConfig
};