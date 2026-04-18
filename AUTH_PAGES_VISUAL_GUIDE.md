# 🎭 Authentication Pages - Visual Guide

## Page Layouts

### Login Page (`/login`)

```
┌─────────────────────────────────────────────────────────────┐
│  CulturePass Logo  │ Discover │ Map │ Calendar │ [Sign In] │
│                    │                                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────┐      ┌─────────────────────────────────┐  │
│  │                  │      │  🎭                             │  │
│  │  Welcome back    │      │  Join our cultural              │  │
│  │  Sign in to your │      │  community                      │  │
│  │  account...      │      │                                 │  │
│  │                  │      │  [500+ Events │ 200+ Artists]  │  │
│  │  ✉️ Email        │      │  [10K+ Community]               │  │
│  │  [────────────]  │      │                                 │  │
│  │                  │      │  [Gradient Overlay]             │  │
│  │  🔒 Password     │      │  [Hero Background Image]        │  │
│  │  [────────────]  │      │                                 │  │
│  │  [👁️ toggle]     │      │                                 │  │
│  │                  │      │                                 │  │
│  │  ☑️ Remember me  │      │                                 │  │
│  │  [Forgot pass?]  │      │                                 │  │
│  │                  │      │                                 │  │
│  │  [Sign in ➜]     │      │                                 │  │
│  │                  │      │                                 │  │
│  │  Don't have...   │      │                                 │  │
│  │  [Create one]    │      │                                 │  │
│  └──────────────────┘      │                                 │  │
│                            │                                 │  │
│                            │                                 │  │
│                            │                                 │  │
│                            │                                 │  │
│                            └─────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Register Page (`/register`)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────┐      ┌─────────────────────────────────┐  │
│  │                  │      │  🎭                             │  │
│  │  Join our        │      │  Join our cultural              │  │
│  │  community       │      │  community                      │  │
│  │  Create an...    │      │                                 │  │
│  │                  │      │  [500+ Events │ 200+ Artists]  │  │
│  │  👤 Full name    │      │  [10K+ Community]               │  │
│  │  [────────────]  │      │                                 │  │
│  │                  │      │  [Gradient Overlay]             │  │
│  │  ✉️ Email        │      │  [Hero Background Image]        │  │
│  │  [────────────]  │      │                                 │  │
│  │                  │      │                                 │  │
│  │  🔒 Password     │      │                                 │  │
│  │  [────────────]  │      │                                 │  │
│  │  [👁️ toggle]     │      │                                 │  │
│  │  ▓▓▓░░░░░░ Fair  │      │                                 │  │
│  │                  │      │                                 │  │
│  │  🔒 Confirm      │      │                                 │  │
│  │  [────────────]  │      │                                 │  │
│  │  [👁️ toggle]     │      │                                 │  │
│  │                  │      │                                 │  │
│  │  ☑️ I agree to   │      │                                 │  │
│  │  [terms] [privacy]      │                                 │  │
│  │                  │      │                                 │  │
│  │  [Create ➜]      │      │                                 │  │
│  │                  │      │                                 │  │
│  │  Already have?   │      │                                 │  │
│  │  [Sign in]       │      │                                 │  │
│  └──────────────────┘      │                                 │  │
│                            │                                 │  │
│                            └─────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Color Usage

### Form Elements
- **Labels & Text:** Primary foreground (dark gray)
- **Placeholders:** Muted foreground (light gray)
- **Icons:** Muted foreground (light gray)
- **Borders:** Border color (light)
- **Focus Ring:** Primary (crimson red)

### Error States
- **Border:** Destructive (red)
- **Text:** Destructive (red)
- **Animation:** Pulse effect

### Success States
- **Background:** Accent (emerald green) - 10% opacity
- **Border:** Accent (emerald green) - 20% opacity
- **Text:** Accent (emerald green)
- **Icon:** Checkmark animation

### Password Strength
- **Too Weak:** Destructive (red)
- **Weak:** Destructive (red)
- **Fair:** Orange (#ffa500)
- **Good:** Amber (#ff6b00)
- **Strong:** Accent (emerald green)

## Interactive States

### Input Fields
```
Default:
┌─────────────────────┐
│ value               │
└─────────────────────┘

Focused:
┌─────────────────────┐
│ value               │ ← Ring effect in primary color
└─────────────────────┘

Error:
┌─────────────────────┐
│ value               │ ← Red border
└─────────────────────┘
✗ Error message here

Disabled:
┌─────────────────────┐
│ value               │ ← Reduced opacity
└─────────────────────┘
```

### Buttons
```
Default:
┌────────────────────┐
│   Sign in ➜        │ Red crimson background
└────────────────────┘

Hover:
┌────────────────────┐
│   Sign in ➜        │ Darker red + shadow + slight scale
└────────────────────┘

Active/Click:
┌────────────────────┐
│   Signing in...    │ Disabled state
└────────────────────┘

Disabled (submit waiting):
┌────────────────────┐
│   Signing in...    │ Reduced opacity, not clickable
└────────────────────┘
```

### Checkboxes
```
Unchecked:
☐ Remember me

Checked:
☑ Remember me (filled with primary color)

Disabled:
☐ Remember me (grayed out)
```

## Form Flow Diagrams

### Login Form Flow
```
User arrives at /login
         ↓
Renders AuthLayout with split screen
         ↓
Form displays with email/password fields
         ↓
User fills in email
    ↓
Email validates on blur/change
    ├→ Valid: Clear error
    └→ Invalid: Show error message
         ↓
User fills in password (can toggle visibility)
         ↓
User checks "Remember me" (optional)
         ↓
User clicks "Sign in"
    ↓
validateForm() runs
    ├→ Valid: Show loading state, submit
    └→ Invalid: Show field errors
         ↓
Simulate API call (1 second)
         ↓
Success state displays
         ↓
Auto-redirect message shows
         ↓
Reset form after 2 seconds
```

### Register Form Flow
```
User arrives at /register
         ↓
Renders AuthLayout with split screen
         ↓
Form displays with all fields
         ↓
User fills name → Validates minimum length
         ↓
User fills email → Validates format
         ↓
User fills password → Shows strength meter
    ├→ Too weak: Red indicator
    ├→ Weak: Red indicator
    ├→ Fair: Orange indicator
    ├→ Good: Amber indicator
    └→ Strong: Green indicator
         ↓
User fills confirm password
    ├→ Match: Clear error
    └→ Mismatch: Show "Passwords do not match"
         ↓
User checks terms checkbox
    └→ Required to enable submit button
         ↓
User clicks "Create account"
    ↓
validateForm() runs
    ├→ Valid: Show loading state
    └→ Invalid: Show field errors
         ↓
Simulate API call (1 second)
         ↓
Success celebration state
    ├→ Checkmark icon bounces
    ├→ Success message displays
    └→ Auto-reset form after 2 seconds
```

## Responsive Behavior

### Mobile (<1024px)
- ❌ Hide right image section (takes too much space)
- ✅ Full-width form (100% width)
- ✅ Center form content
- ✅ Full-width buttons
- ✅ Touch-friendly (larger tap targets)
- ✅ Vertical form field stacking

### Desktop (≥1024px)
- ✅ Show right image section (50% width)
- ✅ Form on left (50% width)
- ✅ Background image with overlay on right
- ✅ Decorative stats visible on right
- ✅ Optimal reading width for form
- ✅ Professional split-screen layout

## Animation Details

### Fade In
- Entry animation on page load
- Duration: 300ms
- All main elements included
- Creates polished first impression

### Scale Hover
- Button hover effect
- `hover:scale-105` - 5% enlargement
- Smooth transition
- Indicates interactivity

### Pulse
- Error message animation
- Draws attention to problems
- Repeats indefinitely until resolved
- Red color emphasizes urgency

### Bounce
- Success checkmark animation
- Celebratory feel
- Brief duration
- Confirms positive action

## Accessibility Features

### Labels
- Every input has associated `<label>`
- `htmlFor` attribute links to input `id`
- Labels visible and clear

### Icons
- Icons supplement labels, don't replace them
- Icon colors match text colors
- Semantic meaning clear from context

### Color Contrast
- Text meets WCAG AA standards
- Error messages in red + text (not just color)
- Button text has high contrast

### Keyboard Navigation
- Tab through all inputs
- Checkbox space bar to toggle
- Button Enter/Space to submit
- Links Tab-navigable

### Focus States
- Visible focus ring on all interactive elements
- Primary color for clarity
- Doesn't hide under other elements

## Loading & Error States

### Loading
- Button text changes ("Signing in...")
- Button becomes disabled
- Cursor changes to not-allowed
- Prevents double-submission

### Success
```
┌────────────────────────┐
│        ✓              │
│  Welcome back!       │
│  Redirecting you...  │
└────────────────────────┘
```

### Error
```
┌─────────────────────┐
│ field               │ ← Red border
└─────────────────────┘
✗ Error message here
  └─ Red text with pulse animation
```

## Theme Consistency

All authentication pages use the same:
- Color palette (primary red, accent green)
- Typography (Fraunces + Inter)
- Border radius (rounded corners)
- Spacing (consistent padding/margins)
- Icons (Lucide React)
- Components (Button, Input, Checkbox, Label)

This ensures seamless visual integration with your homepage and other pages.
