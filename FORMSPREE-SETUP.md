# Contact Form Setup Instructions

Your contact form is configured to use **Formspree** - a free form backend service.

## Setup Steps (Takes 2 minutes):

### 1. Create a Formspree Account
- Go to https://formspree.io/
- Click "Get Started" (Free plan allows 50 submissions/month)
- Sign up with your email

### 2. Create a New Form
- After logging in, click "+ New Form"
- Name it: "Weekend Dev Contact Form"
- Copy the form endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)

### 3. Update Your Website
- Open `index.html`
- Find line 529: `action="https://formspree.io/f/YOUR_FORM_ID"`
- Replace `YOUR_FORM_ID` with your actual form ID from step 2
- Example: `action="https://formspree.io/f/xyzabc123"`

### 4. Test Your Form
- Open your website
- Fill out the contact form
- Submit it
- Check your email - Formspree will send you the submission!

## What the Form Collects:

✓ **Name** (required)
✓ **Email** (required)
✓ **Phone** (optional)
✓ **Service Type** (required) - with pricing displayed
✓ **Urgency**:
  - Schedule a specific time (requires date & time slot)
  - Contact me ASAP (no date/time needed)
✓ **Preferred Date** (if scheduling)
✓ **Preferred Time Slot** (Morning/Afternoon/Evening)
✓ **Project Message** (optional)

## How It Works:

1. Visitor fills out the form
2. They choose either:
   - Schedule a specific day/time
   - Request immediate contact
3. Form submits to Formspree
4. You receive email with all details
5. You contact them within 24 hours

## Features:

- ✅ **100% Free** (up to 50 submissions/month)
- ✅ **Spam Protection** (built-in by Formspree)
- ✅ **Email Notifications** (instant)
- ✅ **No Backend Needed** (works on static sites)
- ✅ **Mobile Friendly** (works on all devices)
- ✅ **Professional Look** (styled to match your branding)

## Alternative Free Services (if needed):

1. **Web3Forms** - https://web3forms.com (unlimited submissions)
2. **Getform** - https://getform.io (50 submissions/month)
3. **Netlify Forms** - https://www.netlify.com (100 submissions/month, if hosting on Netlify)

---

**Need Help?** The form is already fully functional - you just need to add your Formspree form ID!
