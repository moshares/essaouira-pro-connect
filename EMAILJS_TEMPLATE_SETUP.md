# EmailJS Template Setup Instructions

## Setting up EmailJS for Service Request Form Submissions

To enable the service request forms to send emails, you need to configure your EmailJS template to match the code exactly.

### Current Configuration (Hardcoded in Code)

The following credentials are already configured in `src/lib/serviceRequest.ts`:

- **Service ID**: `service_7ahywr7`
- **Template ID**: `template_9oeegni`
- **Public Key**: `9C9GJ2KpivqW5UtEs`

### Step 1: Verify EmailJS Account
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Log in to your account
3. Verify your account is active

### Step 2: Verify Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Find service ID: `service_7ahywr7`
3. Verify it's connected to your email provider (Gmail recommended)
4. Ensure the service is **Active**

### Step 3: Configure Email Template
1. Go to "Email Templates"
2. Find or create template ID: `template_9oeegni`
3. **CRITICAL**: The template MUST use these exact variable names:

**Template Variables (Required):**
- `{{full_name}}` - Customer's full name
- `{{phone}}` - Customer's phone number
- `{{address}}` - Customer's address
- `{{service_type}}` - Type of service requested
- `{{description}}` - Problem description
- `{{photo}}` - Photo URL (or "No photo" if not provided)

**Example Template:**

**Subject:** `New Service Request: {{service_type}}`

**Content:**
```
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
```

### Step 4: Authorize Your Production Domain (CRITICAL)
1. Go to "Account" → "Settings" → "Authorized Domains"
2. Add your production domains:
   - `https://yourdomain.netlify.app` (Netlify subdomain)
   - `https://essaouirapro.com` (if using custom domain)
   - `http://localhost:8080` (for local development - usually auto-allowed)
3. **Save** and wait 1-2 minutes for changes to propagate

**⚠️ IMPORTANT**: If your production domain is not whitelisted, EmailJS will reject all requests!

### Step 5: Verify Public Key
1. Go to "Account" → "General"
2. Verify your **Public Key** matches: `9C9GJ2KpivqW5UtEs`
3. If different, update the code in `src/lib/serviceRequest.ts`

### Step 6: Test the Form

#### Local Testing:
1. Start your development server: `npm run dev`
2. Navigate to `/request-service?type=electrician` (or any service type)
3. Fill out and submit the form
4. Check your email for the submission
5. Check browser console (F12) for any errors

#### Production Testing:
1. Deploy to Netlify
2. Navigate to your production site
3. Open browser DevTools (F12) → Console tab
4. Fill out and submit the form
5. Check console for:
   - "Sending EmailJS request" log
   - "EmailJS response" log
   - Any error messages
6. Check your email for the submission

### Step 7: Troubleshooting

#### If emails don't arrive:

1. **Check Domain Whitelisting** (Most Common Issue)
   - Verify your production domain is in Authorized Domains
   - Wait 1-2 minutes after adding domain

2. **Check Browser Console**
   - Look for "EmailJS send error details" log
   - Check for specific error messages:
     - "Domain not authorized" → Add domain to whitelist
     - "Service not found" → Verify Service ID
     - "Template not found" → Verify Template ID

3. **Check EmailJS Dashboard Logs**
   - Go to EmailJS Dashboard → Logs
   - Look for failed requests
   - Check error messages

4. **Verify Template Variables**
   - Ensure template uses exact variable names:
     - `{{full_name}}` (not `{{name}}` or `{{fullName}}`)
     - `{{phone}}` (not `{{phone_number}}`)
     - `{{address}}` (not `{{customer_address}}`)
     - `{{service_type}}` (not `{{service}}` or `{{type}}`)
     - `{{description}}` (not `{{message}}` or `{{details}}`)
     - `{{photo}}` (not `{{image}}` or `{{photo_url}}`)

5. **Check Network Tab**
   - Open DevTools → Network tab
   - Submit form
   - Look for request to `api.emailjs.com`
   - Check response status and body

### Current Payload Structure

The code sends this exact payload structure:

```typescript
{
  full_name: string,      // e.g., "John Doe"
  phone: string,          // e.g., "+212 612 345 678"
  address: string,        // e.g., "123 Main St, Essaouira"
  service_type: string,   // e.g., "electrician", "plumber", etc.
  description: string,   // e.g., "Need electrical repair"
  photo: string          // e.g., "https://i.ibb.co/..." or "No photo"
}
```

### Features Implemented

✅ **EmailJS Integration:**
- Hardcoded credentials for local/production compatibility
- Photo upload to ImgBB (optional)
- Comprehensive error handling
- Detailed logging for debugging
- Domain whitelisting detection

✅ **Form Features:**
- Full name, phone, address (required)
- Service type (pre-filled from URL)
- Description (optional)
- Photo upload (optional)
- Loading states
- Success/error notifications
- Form clearing after submission

### Next Steps

1. ✅ Verify EmailJS template uses exact variable names above
2. ✅ Add production domain to Authorized Domains (CRITICAL)
3. ✅ Test form locally
4. ✅ Deploy to Netlify
5. ✅ Test form on production
6. ✅ Monitor EmailJS dashboard logs

### Support

If issues persist:
1. Check `EMAILJS_PRODUCTION_DEBUG.md` for detailed debugging
2. Check `INVESTIGATION_REPORT.md` for complete analysis
3. Review browser console logs
4. Check EmailJS dashboard → Logs
5. Contact EmailJS support with:
   - Service ID: `service_7ahywr7`
   - Template ID: `template_9oeegni`
   - Your production domain
   - Error messages from console

---

**The code is production-ready. The most common issue is domain whitelisting - ensure your Netlify domain is authorized in EmailJS dashboard!**

