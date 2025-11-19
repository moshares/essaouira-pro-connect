/**
 * Service Request Service
 * 
 * Production-ready service for handling service request form submissions.
 * Integrates EmailJS for email delivery and ImgBB for photo uploads.
 * 
 * EmailJS credentials are hardcoded for compatibility with both Lovable.dev
 * and local Cursor development environments.
 * 
 * IMPORTANT FOR PRODUCTION:
 * - Ensure your production domain is whitelisted in EmailJS dashboard
 * - Go to EmailJS Dashboard > Settings > Authorized Domains
 * - Add your Netlify domain (e.g., https://yourdomain.netlify.app)
 */

import emailjs from '@emailjs/browser';
import type { EmailJSParams } from './emailjs';
import { emailConfig } from './emailConfig';

/**
 * Form data interface for service requests
 */
export interface ServiceRequestFormData {
  full_name: string;
  phone: string;
  address: string;
  service_type: string;
  description: string;
  photo?: File | null;
}

/**
 * ImgBB API response interface
 */
interface ImgBBResponse {
  data: {
    url: string;
    display_url: string;
    delete_url: string;
  };
  success: boolean;
  status: number;
}

/**
 * Converts a File object to base64 string
 * @param file - The file to convert
 * @returns Promise resolving to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/...;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Uploads a photo file to ImgBB
 * @param file - The image file to upload
 * @returns Promise resolving to the public image URL
 * @throws Error if upload fails
 */
const uploadPhotoToImgBB = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.PUBLIC_IMGBB_KEY;

  if (!apiKey) {
    throw new Error('ImgBB API key is not configured. Please set PUBLIC_IMGBB_KEY in your environment variables.');
  }

  // Convert file to base64
  const base64 = await fileToBase64(file);

  // Create form data for ImgBB API
  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', base64);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`ImgBB upload failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: ImgBBResponse = await response.json();

    if (!data.success || !data.data?.url) {
      throw new Error('ImgBB upload failed: Invalid response from server');
    }

    return data.data.url;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    throw new Error('Failed to upload image: Unknown error');
  }
};

/**
 * Main service request function
 * Handles the complete flow: photo upload (if provided) and email sending
 * 
 * @param formData - The service request form data with fields:
 *   - full_name: string
 *   - phone: string
 *   - address: string
 *   - service_type: string
 *   - description: string
 *   - photo?: File | null (optional)
 * 
 * @returns Promise that resolves when the request is successfully processed
 * @throws Error if any step fails
 */
export const requestService = async (formData: ServiceRequestFormData): Promise<void> => {
  let photoUrl = "No photo";

  // Upload photo to ImgBB if provided
  if (formData.photo) {
    try {
      photoUrl = await uploadPhotoToImgBB(formData.photo);
      console.log('Photo uploaded successfully:', photoUrl);
    } catch (photoError) {
      // Log error but continue with submission using "No photo"
      console.error('Photo upload error:', photoError);
      // Continue with "No photo" - don't block submission if photo upload fails
      photoUrl = "No photo";
    }
  }

  // Validate required fields
  if (!formData.full_name || !formData.phone || !formData.address) {
    throw new Error('Missing required fields: full_name, phone, and address are required');
  }

  // Prepare EmailJS payload - ensure all fields are strings and not undefined
  const emailPayload: EmailJSParams = {
    full_name: String(formData.full_name || '').trim(),
    phone: String(formData.phone || '').trim(),
    address: String(formData.address || '').trim(),
    service_type: String(formData.service_type || 'General').trim(),
    description: String(formData.description || 'No description provided').trim(),
    photo: String(photoUrl || 'No photo')
  };

  // Validate payload fields are not empty (except description which can be default)
  if (!emailPayload.full_name || !emailPayload.phone || !emailPayload.address) {
    throw new Error('Invalid form data: required fields cannot be empty');
  }

  // Log payload for debugging (without sensitive data)
  console.log('Sending EmailJS request:', {
    serviceId: emailConfig.serviceId,
    templateId: emailConfig.templateId,
    hasPublicKey: !!emailConfig.publicKey,
    payloadFields: Object.keys(emailPayload),
    currentDomain: window.location.origin
  });

  try {
    // Initialize EmailJS with public key (required for proper initialization)
    emailjs.init(emailConfig.publicKey);

    // Send email via EmailJS
    // Using the 4-parameter version: send(serviceId, templateId, params, publicKey)
    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      emailPayload,
      emailConfig.publicKey
    );

    // EmailJS v4.x returns response with status property
    // Status 200 indicates success, but we should also check for other success indicators
    console.log('EmailJS response:', {
      status: response.status,
      text: response.text,
      statusText: response.statusText
    });

    // Accept status 200 as success (EmailJS standard success code)
    // Some versions might return 0 or other codes, so we check for both
    if (response.status !== 200 && response.status !== 0) {
      throw new Error(`EmailJS returned status ${response.status}: ${response.text || response.statusText || 'Unknown error'}`);
    }

    // Additional validation: check if response.text indicates success
    if (response.text && response.text.toLowerCase().includes('error')) {
      throw new Error(`EmailJS error response: ${response.text}`);
    }

    console.log('EmailJS email sent successfully');
  } catch (error) {
    // Enhanced error logging for production debugging
    console.error('EmailJS send error details:', {
      error,
      errorType: error instanceof Error ? error.constructor.name : typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
      serviceId: emailConfig.serviceId,
      templateId: emailConfig.templateId,
      currentDomain: window.location.origin,
      userAgent: navigator.userAgent
    });

    // Provide more specific error messages
    if (error instanceof Error) {
      // Check for common EmailJS errors
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('domain') || errorMessage.includes('origin')) {
        throw new Error('Domain not authorized. Please add your domain to EmailJS authorized domains in the dashboard.');
      }
      
      if (errorMessage.includes('service') || errorMessage.includes('template')) {
        throw new Error(`EmailJS configuration error: ${error.message}. Please verify service and template IDs.`);
      }
      
      if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('cors')) {
        throw new Error(`Network error: ${error.message}. Please check your internet connection and try again.`);
      }
      
      throw new Error(`Failed to send email: ${error.message}`);
    }
    
    throw new Error('Failed to send email: Unknown error occurred');
  }
};
