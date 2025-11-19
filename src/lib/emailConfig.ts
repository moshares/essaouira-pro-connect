// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template with the following variables:
//    - {{full_name}} - customer's full name
//    - {{phone}} - customer's phone number
//    - {{address}} - customer's address
//    - {{service_type}} - type of service requested
//    - {{description}} - problem description
//    - {{photo}} - photo URL (or "No photo")
// 5. Get your Service ID, Template ID, and Public Key
// 6. The values below are hardcoded for compatibility with local/production environments

export const emailConfig = {
  serviceId: 'service_7ahywr7', // Your EmailJS service ID
  templateId: 'template_9oeegni', // Your EmailJS template ID
  publicKey: '9C9GJ2KpivqW5UtEs', // Your EmailJS public key
};

// Example EmailJS template content:
/*
Subject: New Service Request: {{service_type}}

Hello,

You have received a new service request from the Essaouira Home Services website:

Customer Name: {{full_name}}
Phone: {{phone}}
Address: {{address}}
Service Type: {{service_type}}

Description:
{{description}}

Photo: {{photo}}

---
This message was sent from the Essaouira Home Services request form.
*/

