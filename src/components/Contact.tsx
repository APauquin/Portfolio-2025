import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Contact.css";

// Fixed Modal component with proper TypeScript types
interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isSuccess: boolean;
}

// Modal component for displaying messages
const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message, isSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${isSuccess ? 'success' : 'error'}`}>
        <div className="modal-header">
          <h3>{isSuccess ? 'Success!' : 'Attention Required'}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            {isSuccess ? 'Great!' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    contactName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    isSuccess: false
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    // Check if the environment variable is properly loaded
    console.log("RECAPTCHA SITE KEY:", import.meta.env.VITE_RECAPTCHA_SITE_KEY);

    // Check if it's empty or undefined
    if (!import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
      console.error("reCAPTCHA site key is missing. Please check your .env file.");
      setCaptchaError("Site key is missing. Contact the administrator.");
    }
  }, []);

  const RECAPTCHA_TEST_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  // Logic to determine which key to use
  const isDevelopment = import.meta.env.DEV === true;
  const recaptchaSiteKey = isDevelopment
    ? RECAPTCHA_TEST_KEY
    : import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    console.log("Environment:", isDevelopment ? "Development" : "Production");

    if (!recaptchaSiteKey) {
      console.error("No reCAPTCHA site key available, even for development");
      setCaptchaError("Site key is missing. Contact the administrator.");
    }
  }, [recaptchaSiteKey]);

  // Enhanced captcha handling for development
  const handleCaptchaChange = (token: string | null) => {
    console.log("reCAPTCHA callback triggered:", token ? "Token received" : "No token");
    setCaptchaToken(token);

    if (token) {
      setCaptchaError(null);
    }
  };

  // Pre-made message options - Fixed typo in second preset
  const presetMessages = [
    t('contact.preset1', "I would like to schedule a call."),
    t('contact.preset2', "Please contact me via email."),
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, message: e.target.value });
  };

  const closeModal = () => {
    setModalState({
      ...modalState,
      isOpen: false
    });
  };

  const showModal = (message: string, isSuccess: boolean) => {
    setModalState({
      isOpen: true,
      message,
      isSuccess
    });
  };

  const validate = () => {
    // Check if name is filled
    if (!formData.contactName) {
      showModal(t('contact.errorMissingName', "Please enter your name."), false);
      return false;
    }

    // Check if either email or phone is filled
    if (!formData.email && !formData.phoneNumber) {
      showModal(t('contact.errorContactMethod', "Please provide either an email address or phone number."), false);
      return false;
    }

    // reCAPTCHA validation
    if (!captchaToken) {
      showModal(t('contact.errorCaptcha', "Please verify that you are human by completing the CAPTCHA."), false);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    setIsSubmitting(true);
  
    try {
      // Get API URL from environment variable or use fallback
      const apiUrl = import.meta.env.VITE_BACKEND_URL
        ? `${import.meta.env.VITE_BACKEND_URL}/api/send-email`
        : 'http://localhost:3001/api/send-email';
      
      console.log('Submitting form to API:', apiUrl);
      console.log('Form data being sent:', {
        contactName: formData.contactName,
        companyName: formData.companyName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        captchaToken: captchaToken ? 'Token exists' : 'No token'
      });
  
      // Send the form data to the backend
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: formData.contactName,
          companyName: formData.companyName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
          captchaToken: captchaToken
        })
      });
      
      console.log('Response status:', response.status);
      
      // Parse the response
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
  
      // Success
      showModal(t('contact.successMessage', "Your message has been sent! I'll get back to you soon."), true);
  
      // Reset form
      setFormData({
        contactName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setCaptchaToken(null);
  
      // Reset the reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
  
    } catch (error) {
      console.error('Error submitting form:', error);
      showModal(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.',
        false
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="contact-container">
      <h1 className="page-title">{t('contact.title', 'Contact')}</h1>

      <MessageModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        message={modalState.message}
        isSuccess={modalState.isSuccess}
      />

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-columns">
          <div className="form-column left-column">
            <div className="form-group">
              <label htmlFor="contactName">
                {t('contact.nameLabel', 'Your Name')} <span className="required">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                required
                placeholder={t('contact.namePlaceholder', 'Enter your full name')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">
                {t('contact.companyLabel', 'Company Name')}
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder={t('contact.companyPlaceholder', 'Enter your company name')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                {t('contact.emailLabel', 'Email')} <span className="required-alt">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('contact.emailPlaceholder', 'Enter your email address')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                {t('contact.phoneLabel', 'Phone Number')} <span className="required-alt">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={t('contact.phonePlaceholder', 'Enter your phone number')}
              />
            </div>
            <p className="contact-helper-text">* {t('contact.contactMethodHelper', 'Either email or phone number is required')}</p>
          </div>

          <div className="form-column right-column">
            <div className="form-group">
              <label htmlFor="messageSelect">
                {t('contact.selectMessageLabel', 'Select a Message')}
              </label>
              <select
                id="messageSelect"
                name="messageSelect"
                onChange={handlePresetChange}
                defaultValue=""
              >
                <option value="" disabled>
                  {t('contact.selectMessagePlaceholder', '-- Select a pre-made message --')}
                </option>
                {presetMessages.map((message, index) => (
                  <option key={index} value={message}>
                    {message}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">
                {t('contact.messageLabel', 'Your Message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t('contact.messagePlaceholder', 'Enter your message or select a pre-made message above')}
                rows={5}
              />
            </div>
          </div>
        </div>

        <div className="captcha-section">
          <div className="form-group captcha-container">
            <label>
              {t('contact.captchaLabel', 'Human Verification')} <span className="required">*</span>
            </label>
            {captchaError && (
              <div className="captcha-error">{captchaError}</div>
            )}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaSiteKey}
              onChange={handleCaptchaChange}
              onExpired={() => setCaptchaToken(null)}
              onErrored={() => {
                console.error("reCAPTCHA error occurred");
                setCaptchaError("An error occurred with the CAPTCHA. Please try again.");
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('contact.submitting', 'Sending...')
            : t('contact.submit', 'Send Message')}
        </button>
      </form>
    </div>
  );
};

export default Contact;