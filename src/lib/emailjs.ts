/**
 * EmailJS Types
 * 
 * Type definitions for EmailJS integration
 */

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
  [key: string]: unknown;
}
