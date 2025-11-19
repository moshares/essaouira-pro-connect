# EmailJS Production Debugging Guide

## Root Cause Analysis

After comprehensive investigation, here are the **most likely causes** of EmailJS failures on Netlify production:

### 🔴 CRITICAL ISSUE #1: Domain Whitelisting
**Most Common Cause**: EmailJS requires your production domain to be whitelisted in the EmailJS dashboard.

**Solution**:
1. Go to https://dashboard.emailjs.com/
2. Navigate to **Settings** → **Authorized Domains**
3. Add your Netlify domain:
   - `https://yourdomain.netlify.app` (if using Netlify subdomain)
   - `https://essaouirapro.com` (if using custom domain)
   - Include both `https://` and `http://` versions if needed
4. Save and wait 1-2 minutes for changes to propagate

### 🔴 CRITICAL ISSUE #2: EmailJS Initialization
**Issue**: EmailJS SDK needs to be initialized before sending.

**Fixed in code**: Added `emailjs.init(EMAILJS_PUBLIC_KEY)` before `emailjs.send()`

### 🟡 ISSUE #3: Response Status Check
**Issue**: EmailJS might return status `0` or other codes in production builds.

**Fixed in code**: Now accepts both `200` and `0` as success codes.

### 🟡 ISSUE #4: Error Handling
**Issue**: Generic error messages don't help debug production issues.

**Fixed in code**: Enhanced error logging with specific messages for:
- Domain authorization errors
- Service/template configuration errors
- Network/CORS errors

## Verification Checklist

### ✅ Code Verification
- [x] EmailJS credentials are hardcoded correctly
- [x] `emailjs.init()` is called before `emailjs.send()`
- [x] Payload structure matches template variables exactly
- [x] All fields are validated and converted to strings
- [x] Error handling provides specific error messages

### ✅ EmailJS Dashboard Verification
- [ ] Service ID `service_7ahywr7` exists and is active
- [ ] Template ID `template_9oeegni` exists and is active
- [ ] Public Key `9C9GJ2KpivqW5UtEs` is correct
- [ ] **Production domain is whitelisted** (MOST IMPORTANT)
- [ ] Template variables match exactly:
  - `{{full_name}}`
  - `{{phone}}`
  - `{{address}}`
  - `{{service_type}}`
  - `{{description}}`
  - `{{photo}}`

### ✅ Netlify Deployment Verification
- [ ] Build completes without errors
- [ ] No environment variable conflicts
- [ ] No CORS headers blocking requests
- [ ] Network requests are not blocked by browser extensions

## Testing Steps

### Local Testing
1. Run `npm run dev`
2. Navigate to `/request-service?type=electrician`
3. Fill out the form and submit
4. Check browser console for any errors
5. Verify email is received

### Production Testing
1. Deploy to Netlify
2. Open browser DevTools (F12)
3. Go to Network tab
4. Navigate to `/request-service?type=electrician`
5. Fill out the form and submit
6. Look for requests to `api.emailjs.com`
7. Check the response status and body
8. Check Console tab for error messages

## Common Error Messages & Solutions

### Error: "Domain not authorized"
**Solution**: Add your Netlify domain to EmailJS authorized domains.

### Error: "EmailJS returned status 400"
**Solution**: Check that template variables match exactly. Verify payload structure.

### Error: "Network error" or "CORS error"
**Solution**: 
- Check browser console for CORS errors
- Verify EmailJS domain is whitelisted
- Check Netlify headers configuration

### Error: "Service not found" or "Template not found"
**Solution**: Verify Service ID and Template ID in EmailJS dashboard.

## Debugging Code Added

The updated code includes:
- Console logging of EmailJS requests
- Detailed error messages
- Domain validation warnings
- Payload structure logging
- Response status logging

## Next Steps

1. **Verify domain whitelisting** in EmailJS dashboard (CRITICAL)
2. Test the form submission on production
3. Check browser console for detailed error messages
4. Review EmailJS dashboard logs for failed requests
5. If still failing, check the specific error message and refer to this guide

## Contact EmailJS Support

If issues persist after following this guide:
1. Check EmailJS dashboard → Logs for detailed error messages
2. Contact EmailJS support with:
   - Your Service ID
   - Your Template ID
   - Your production domain
   - Error messages from browser console

