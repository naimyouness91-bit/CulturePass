# Authentication Pages - Login & Register

Professional authentication pages for the Mediouna Culture Hub platform. Built with React, Tailwind CSS, and aligned with the platform's cultural design system.

## 📁 Files Created

### 1. **AuthLayout.tsx** (`src/components/AuthLayout.tsx`)
Reusable layout wrapper for authentication pages with split-screen design.

**Features:**
- Left column: Clean form section with centered content
- Right column: Full-height background image with gradient overlay
- Responsive design (hides image on mobile)
- Decorative stats section on the image side
- Smooth fade-in animations

### 2. **Login.tsx** (`src/routes/login.tsx`)
Sign-in page with professional form handling.

**Form Fields:**
- Email address (with validation)
- Password (toggle show/hide)
- Remember me checkbox
- Forgot password link
- Submit button with loading state

**Features:**
- Real-time email validation (RFC-compliant)
- Password strength feedback
- Error messages with animations
- Icon indicators (Mail, Lock, Eye icons)
- Success state with redirect message
- Responsive design

**Validation Rules:**
- Email: Required and valid format
- Password: Required, minimum 6 characters

### 3. **Register.tsx** (`src/routes/register.tsx`)
Account creation page with comprehensive form handling.

**Form Fields:**
- Full name (minimum 2 characters)
- Email address (with validation)
- Password (with strength indicator)
- Confirm password (with match validation)
- Terms & conditions checkbox
- Submit button with loading state

**Features:**
- Password strength meter (Weak → Strong)
- Real-time password match validation
- Icon indicators for each field
- Show/hide password toggles
- Terms & conditions agreement required
- Success state with celebration animation
- Dynamic error handling

**Validation Rules:**
- Name: Required, minimum 2 characters
- Email: Required and valid format
- Password: Required, minimum 6 characters
- Confirm Password: Must match password field
- Terms: Must be checked

### 4. **Header Updates** (`src/components/Header.tsx`)
Enhanced header navigation with authentication links.

**Changes:**
- Added "Sign in" link (variant: outline)
- Added "Create account" link (variant: primary)
- Both visible on desktop and mobile menu
- Responsive mobile navigation section

## 🎨 Design System

### Color Palette
- **Primary:** Crimson red (heritage) - `oklch(0.5 0.18 22)`
- **Accent:** Emerald green (zellige) - `oklch(0.5 0.13 155)`
- **Background:** Warm ivory white - `oklch(0.99 0.005 80)`
- **Destructive:** Red for errors - `oklch(0.55 0.22 27)`

### Typography
- **Display Font:** Fraunces (serif) - Headings
- **Body Font:** Inter (sans-serif) - All text content

### Components Used
- Input fields (with icon prefix)
- Checkboxes (with labels)
- Buttons (primary & outline variants)
- Links (with hover effects)
- Icons (Lucide React)

## 🔐 Form Validation

### Email Validation
Uses RFC 5322 simplified regex pattern:
```
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Password Strength Indicator (Register)
```
Score 0: Too weak (red)
Score 1: Weak (red)
Score 2: Fair (orange)
Score 3: Good (amber)
Score 4: Strong (green accent)
```

Strength increases with:
- Length ≥ 8 characters
- Uppercase letters present
- Numbers present
- Special characters present

## 🚀 Usage

### Route Access
```
/login    → Sign in page
/register → Create account page
```

### Navigation Links
From the header component:
- Desktop: Buttons in top-right corner
- Mobile: Links in dropdown menu

### Form Submission
Currently configured for mock submission:
1. Validates form fields
2. Shows loading state
3. Simulates API call (1 second delay)
4. Displays success message
5. Auto-resets form after 2 seconds

**To integrate with backend:**
Replace the `setTimeout` in `handleSubmit` with actual API call:
```tsx
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, rememberMe })
});
```

## ✨ Features & Interactions

### Login Page
- ✅ Email validation (real-time)
- ✅ Password visibility toggle
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Link to registration
- ✅ Loading state with button disable
- ✅ Success notification
- ✅ Error message animations

### Register Page
- ✅ Full name validation
- ✅ Email validation (real-time)
- ✅ Password strength meter
- ✅ Password visibility toggle
- ✅ Confirm password validation
- ✅ Terms & conditions checkbox
- ✅ Link to login
- ✅ Loading state with button disable
- ✅ Success notification with animation
- ✅ Real-time error clearing

### Shared Features
- ✅ Responsive split-screen layout
- ✅ Background image with gradient overlay
- ✅ Icon indicators for inputs
- ✅ Smooth fade-in animations
- ✅ Hover & focus effects
- ✅ Mobile-optimized forms
- ✅ Accessibility (labels, aria-labels)
- ✅ Rounded modern inputs & buttons

## 📱 Responsive Breakpoints

### Mobile (< 1024px)
- Full-width form section
- Hidden background image
- Stack form fields vertically
- Full-width buttons
- Touch-friendly input sizes

### Desktop (≥ 1024px)
- Split-screen layout (50/50)
- Left: Form, Right: Image
- Side-by-side form fields where applicable
- Decorative stats on image section

## 🔄 State Management

Uses React `useState` hooks for:
- Form field values (email, password, name, etc.)
- Form validation errors
- Password visibility toggles
- Loading state during submission
- Success state after submission
- Terms & conditions agreement

## 🎯 Best Practices Implemented

1. **Form Validation**
   - Real-time feedback
   - Clear error messages
   - Visual indicators (border color, red text)

2. **User Experience**
   - Loading states prevent double-submission
   - Success feedback reassures users
   - Password strength guidance
   - Clear call-to-action links

3. **Accessibility**
   - Proper label associations
   - Icon helpers don't replace labels
   - Color + text for error indication
   - Keyboard navigation support

4. **Performance**
   - Controlled components
   - Optimized re-renders
   - Lazy error clearing

5. **Security**
   - Password hidden by default
   - Confirm password validation
   - No sensitive data in console
   - Ready for HTTPS/CSRF protection

## 🔗 Integration Checklist

- [ ] Connect login to backend authentication API
- [ ] Connect register to user creation API
- [ ] Implement "Forgot password" functionality
- [ ] Add OAuth providers (Google, GitHub, etc.)
- [ ] Implement "Remember me" token storage
- [ ] Add email verification flow
- [ ] Implement session management
- [ ] Add user profile/account page
- [ ] Integrate analytics tracking
- [ ] Set up email notifications

## 📝 Customization

### Change Brand Colors
Edit `src/styles.css` CSS variables:
```css
--primary: oklch(YOUR_COLOR);
--accent: oklch(YOUR_COLOR);
```

### Modify Password Requirements
Update validation in `Register.tsx`:
```tsx
if (formData.password.length < 8) {
  // Change minimum length
}
```

### Adjust Layout Spacing
Modify padding/margins in `AuthLayout.tsx`:
```tsx
<div className="px-4 py-12 sm:px-6 lg:px-8">
  {/* Adjust class values */}
</div>
```

## 🐛 Troubleshooting

**Form not validating:**
- Check validation logic in `validateForm()`
- Ensure error state updates

**Styling issues:**
- Verify Tailwind CSS is configured
- Check CSS variables in `styles.css`

**Links not working:**
- Ensure route files are in `src/routes/`
- Check TanStack Router configuration

## 📚 Dependencies

- React 18+
- TanStack React Router
- Tailwind CSS 4+
- Lucide React (icons)
- Radix UI (unstyled components)

All dependencies already included in your project.
