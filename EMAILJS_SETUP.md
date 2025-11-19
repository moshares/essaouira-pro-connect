# EmailJS Integration Setup Guide

This project uses EmailJS for handling service request form submissions and ImgBB for photo uploads.

## Environment Variables Setup

1. Copy the `env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your actual credentials:

   ```env
   # EmailJS Configuration
   PUBLIC_EMAILJS_PUBLIC=9C9GJ2KpivqW5UtEs
   PUBLIC_EMAILJS_SERVICE=service_7ahywr7
   PUBLIC_EMAILJS_TEMPLATE=template_9oeegni

   # ImgBB API Key (get from https://api.imgbb.com/)
   PUBLIC_IMGBB_KEY=your_imgbb_api_key_here
   ```

## EmailJS Configuration

The following EmailJS credentials are already configured:
- **Service ID**: `service_7ahywr7`
- **Template ID**: `template_9oeegni`
- **Public Key**: `9C9GJ2KpivqW5UtEs`

### EmailJS Template Variables

Your EmailJS template should use these variable names:
- `{{full_name}}` - Customer's full name
- `{{phone}}` - Customer's phone number
- `{{address}}` - Customer's address
- `{{service_type}}` - Type of service requested
- `{{description}}` - Problem description
- `{{photo}}` - Photo URL (or "No photo" if not provided)

## ImgBB Setup

1. Sign up at https://api.imgbb.com/
2. Get your API key from the dashboard
3. Add it to `.env.local` as `PUBLIC_IMGBB_KEY`

## Implementation Details

### Form Fields
- `full_name` - Required
- `phone` - Required
- `address` - Required
- `service_type` - Required (pre-filled from URL parameter)
- `description` - Optional
- `photo` - Optional (uploaded to ImgBB)

### Features
- ✅ Form validation
- ✅ Photo upload to ImgBB
- ✅ EmailJS integration
- ✅ Error handling
- ✅ Success notifications
- ✅ Form reset after submission
- ✅ Loading states

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/request-service?type=electrician` (or any service type)

3. Fill out the form and submit

4. Check your EmailJS dashboard for received emails

## Troubleshooting

### EmailJS Errors
- Verify all environment variables are set correctly
- Check that your EmailJS service and template IDs are correct
- Ensure your EmailJS account is active

### ImgBB Errors
- Verify `PUBLIC_IMGBB_KEY` is set in `.env.local`
- Check that the API key is valid and not expired
- Ensure image file size is within ImgBB limits (32MB)

### Form Not Submitting
- Check browser console for errors
- Verify all required fields are filled
- Ensure network requests are not blocked

