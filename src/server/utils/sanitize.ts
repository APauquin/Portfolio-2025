import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes a string input to prevent XSS attacks
 * @param input String to sanitize
 * @returns Sanitized string
 */
export const sanitize = (input: string | undefined | null): string => {
  // If input is empty, return empty string
  if (!input) return '';
  
  // Use sanitize-html to strip all HTML tags and attributes
  return sanitizeHtml(input, {
    allowedTags: [], // No HTML tags allowed
    allowedAttributes: {} // No attributes allowed
  });
};

export default sanitize;