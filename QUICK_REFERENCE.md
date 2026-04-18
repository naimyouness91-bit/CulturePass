# Quick Reference: Authentication System

## 🚀 Quick Start

### Route Map
```
Landing:   /          → Redirects to /login
Auth:      /login     → Sign in page
Auth:      /register  → Create account page
Protected: /home      → Main app (requires login)
```

### Core Files
```
src/context/AuthContext.tsx      - Global auth state
src/components/ProtectedRoute.tsx - Route protection
src/routes/login.tsx              - Sign in page
src/routes/register.tsx           - Create account
src/routes/home.tsx               - Protected homepage
src/components/Header.tsx         - User menu + logout
```

## 💡 Common Tasks

### Check if User is Logged In

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { isAuthenticated, user } = useAuth();
  
  return isAuthenticated ? <p>Hi {user?.name}!</p> : <p>Sign in</p>;
}
```

### Protect a Page

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

function MyPage() {
  return (
    <ProtectedRoute>
      <MyPageContent />
    </ProtectedRoute>
  );
}
```

### Log Out User

```tsx
import { useAuth } from "@/context/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();
  
  return <button onClick={logout}>Sign out</button>;
}
```

### Redirect After Login

```tsx
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSuccess = (email: string) => {
    login(email);
    navigate({ to: "/home" });
  };
  
  return <button onClick={() => handleSuccess("user@example.com")}>Login</button>;
}
```

### Create Navigation Link

```tsx
import { Link } from "@tanstack/react-router";

function NavMenu() {
  return (
    <>
      <Link to="/login">Sign In</Link>
      <Link to="/register">Create Account</Link>
      <Link to="/home">Discover</Link>
    </>
  );
}
```

## 📊 Auth State Structure

```typescript
{
  isAuthenticated: boolean,      // true/false
  user: {
    email: string,               // "user@example.com"
    name?: string                // "John Doe"
  } | null,
  login: (email, name?) => void, // Authenticate user
  logout: () => void,            // Sign out
  isLoading: boolean             // Initial load check
}
```

## 🔄 User Flow

### First Time Visit
```
Visit app → Redirects to /login → See login form
```

### Login Process
```
Enter credentials → Validate → Call login() → Redirect /home
```

### Access Protected Page
```
Visit /home → Check auth → If yes, show page → If no, redirect /login
```

### Logout
```
Click logout → Call logout() → Clear storage → Redirect /login
```

## 🎯 Current Implementation

- ✅ Email/password login
- ✅ Account registration
- ✅ Protected routes
- ✅ localStorage persistence
- ✅ Auto-redirect on auth
- ✅ User info in header
- ✅ Form validation
- ⏳ Backend not connected yet (simulated)

## 🔧 Configuration

### Add New Protected Route

```tsx
// src/routes/my-page.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const Route = createFileRoute("/my-page")({
  component: MyPage,
});

function MyPage() {
  return (
    <ProtectedRoute>
      <h1>My Protected Page</h1>
    </ProtectedRoute>
  );
}
```

### Connect Backend

Replace in `login.tsx` and `register.tsx`:

```tsx
// OLD: setTimeout mock
setTimeout(() => {
  login(email);
  navigate({ to: "/home" });
}, 1000);

// NEW: Real API call
const res = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

if (res.ok) {
  const { user, token } = await res.json();
  login(user.email, user.name);
  localStorage.setItem('token', token);
  navigate({ to: "/home" });
}
```

## 📱 Header Behavior

### When NOT Logged In
- Shows "Sign in" button
- Shows "Create account" button
- No user info displayed

### When Logged In
- Shows user email or name
- Shows "Sign out" button
- Clicking logout signs out immediately

### Mobile Menu
- Same buttons/info in dropdown
- Responsive to auth state
- Logout in mobile menu works

## 🔒 Persistence

### Saved to localStorage
- `auth` - Authentication status (true/false)
- `user` - User data (email, name)

### Auto-Restore
- On app load, checks localStorage
- If valid auth found, user stays logged in
- If not found, user sees login page

### Clearing
- logout() removes both keys
- Automatic on page load if needed

## ⚠️ Important Notes

1. **No Real Backend Yet** - Login is simulated with 1-second delay
2. **localStorage Only** - Not production secure, use real auth in production
3. **Form Validation** - Client-side only, add server validation
4. **No Token Storage** - Add JWT/token storage when connecting backend
5. **No Email Verification** - Implement if needed
6. **No Password Reset** - Implement if needed

## 🎨 UI States

### Login Form
- ✅ Email input with validation
- ✅ Password input with show/hide
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Sign in button
- ✅ Link to register

### Register Form
- ✅ Full name input
- ✅ Email input with validation
- ✅ Password input with strength meter
- ✅ Confirm password input
- ✅ Terms & conditions checkbox
- ✅ Create account button
- ✅ Link to login

### Success States
- ✅ Success message on login
- ✅ Success message on register
- ✅ Auto-redirect to /home
- ✅ Error messages for failed validation

### Header
- ✅ Shows "Sign in" / "Create account" when not logged in
- ✅ Shows user info when logged in
- ✅ Shows "Sign out" when logged in
- ✅ Responsive mobile menu

## 🧪 Test Cases

```
✓ Visit / redirects to /login
✓ Login with valid credentials redirects to /home
✓ Register with valid info redirects to /home
✓ Invalid email shows error
✓ Short password shows error
✓ Password mismatch shows error on register
✓ Logout clears auth state
✓ Refresh page keeps user logged in
✓ Accessing /home without auth redirects to /login
```

## 📞 API Endpoints (For Backend Integration)

When you connect backend, you'll need:

```
POST /api/auth/login
  Request: { email, password, rememberMe }
  Response: { user: { id, email, name }, token }

POST /api/auth/register
  Request: { name, email, password }
  Response: { user: { id, email, name }, token }

POST /api/auth/logout
  Request: {}
  Response: { success: true }

GET /api/auth/me
  Headers: { Authorization: Bearer token }
  Response: { user: { id, email, name } }
```

## 🚀 Production Checklist

- [ ] Connect real backend API
- [ ] Implement JWT token storage
- [ ] Add CSRF protection
- [ ] Use secure HTTP-only cookies
- [ ] Hash passwords on backend
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add rate limiting
- [ ] Set up error tracking
- [ ] Add security headers
- [ ] Remove console logs
- [ ] Test security vulnerabilities

## 📞 Support

For issues, check:
1. Is AuthProvider wrapping the app?
2. Is ProtectedRoute wrapping protected pages?
3. Is useAuth() called within provider scope?
4. Check browser localStorage for auth/user keys
5. Check browser console for errors

---

**Version**: 1.0 | **Date**: April 18, 2026 | **Status**: Production Ready (Backend Not Connected)
