/**
 * EmailJS Service Utility
 * 
 * Handles sending emails via EmailJS service.
 * Used for service request form submissions.
 */

import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE;

/**
 * EmailJS template parameters interface
 */
export interface EmailJSParams {
  full_name: string;
  phone: string;
  address: string;
  service_type: string;
  description: string;
  photo: string;
}

/**
 * Validates that all required EmailJS environment variables are set
 * @throws Error if any required variable is missing
 */
const validateConfig = (): void => {
  if (!PUBLIC_KEY) {
    throw new Error('VITE_EMAILJS_PUBLIC is not configured');
  }
  if (!SERVICE_ID) {
    throw new Error('VITE_EMAILJS_SERVICE is not configured');
  }
  if (!TEMPLATE_ID) {
    throw new Error('VITE_EMAILJS_TEMPLATE is not configured');
  }
};

/**
 * Sends an email via EmailJS
 * @param params - The email template parameters
 * @returns Promise that resolves when email is sent successfully
 * @throws Error if email sending fails
 */
export const sendEmailViaEmailJS = async (params: EmailJSParams): Promise<void> => {
  validateConfig();

  try {
    // Initialize EmailJS with public key
    emailjs.init(PUBLIC_KEY);

    // Send email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      params,
      PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS returned status ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    throw new Error('Failed to send email: Unknown error');
  }
};

