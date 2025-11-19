/**
 * Service Request Service
 * 
 * Production-ready service for handling service request form submissions.
 * Integrates EmailJS for email delivery and ImgBB for photo uploads.
 * 
 * EmailJS credentials are hardcoded for compatibility with both Lovable.dev
 * and local Cursor development environments.
 */

import emailjs from '@emailjs/browser';
import type { EmailJSParams } from './emailjs';

/**
 * EmailJS Configuration
 * Hardcoded for compatibility with local development
 */
const EMAILJS_PUBLIC_KEY = "9C9GJ2KpivqW5UtEs";
const EMAILJS_SERVICE_ID = "service_7ahywr7";
const EMAILJS_TEMPLATE_ID = "template_9oeegni";

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
      throw new Error(`ImgBB upload failed: ${response.statusText}`);
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
    } catch (photoError) {
      // Log error but continue with submission using "No photo"
      console.error('Photo upload error:', photoError);
      // Continue with "No photo" - don't block submission if photo upload fails
      photoUrl = "No photo";
    }
  }

  // Prepare EmailJS payload
  const emailPayload: EmailJSParams = {
    full_name: formData.full_name,
    phone: formData.phone,
    address: formData.address,
    service_type: formData.service_type,
    description: formData.description || "No description provided",
    photo: photoUrl
  };

  try {
    // Send email via EmailJS with hardcoded credentials
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailPayload,
      EMAILJS_PUBLIC_KEY
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
