# Authentication & Routing System Implementation

Complete guide to your new authentication and routing system for the Mediouna Culture Hub.

## 🎯 Route Structure

```
/              → Redirects to /login (landing page)
/login         → Sign in page
/register      → Create account page
/home          → Main discover page (PROTECTED - requires auth)
/calendar      → Event calendar (other routes)
/map           → Event map (other routes)
/dashboard     → User bookings (other routes)
/admin         → Admin panel (other routes)
```

## 📁 Files Created & Modified

### New Files

1. **AuthContext.tsx** (`src/context/AuthContext.tsx`)
   - Global authentication state management
   - Login/logout functionality
   - localStorage persistence
   - User data management

2. **ProtectedRoute.tsx** (`src/components/ProtectedRoute.tsx`)
   - Route protection wrapper
   - Automatic redirect to login if not authenticated
   - Loading state during auth check
   - Wraps protected pages

3. **home.tsx** (`src/routes/home.tsx`)
   - Main discover page (moved from index.tsx)
   - Protected route - shows loading if not authenticated
   - Same content as original homepage
   - Auto-redirects unauthenticated users to /login

### Modified Files

1. **index.tsx** (`src/routes/index.tsx`)
   - Changed from homepage to redirect to /login
   - Acts as landing page redirect
   - Ensures users see login first

2. **login.tsx** (`src/routes/login.tsx`)
   - Integrated with useAuth hook
   - Calls login() on successful submission
   - Redirects to /home on success
   - Full authentication flow

3. **register.tsx** (`src/routes/register.tsx`)
   - Integrated with useAuth hook
   - Calls login() with user name on success
   - Redirects to /home on success
   - Complete registration flow

4. **__root.tsx** (`src/routes/__root.tsx`)
   - Wrapped with AuthProvider
   - Provides auth context to entire app

5. **Header.tsx** (`src/components/Header.tsx`)
   - Shows user info when authenticated
   - Shows "Sign in" / "Create account" when not authenticated
   - Logout button for authenticated users
   - Responsive mobile menu with auth state

## 🔐 Authentication Flow

### User Flow Diagram

```
User visits app
      ↓
     / route (redirects to /login)
      ↓
Login page appears
      ↓
User enters email & password
      ↓
Form validates
      ↓
Submit → API call (simulated)
      ↓
Success → login() called
      ↓
AuthContext updated
      ↓
localStorage saved
      ↓
Navigate to /home
      ↓
ProtectedRoute checks auth
      ↓
User authenticated ✓ → Show homepage
      ↓
User browses app
      ↓
User clicks "Sign out"
      ↓
logout() called
      ↓
localStorage cleared
      ↓
AuthContext updated
      ↓
Redirect to /login
```

### Registration Flow

```
User on homepage
      ↓
Clicks "Create account"
      ↓
Register page opens
      ↓
User fills form (name, email, password)
      ↓
Form validates all fields
      ↓
Password strength check
      ↓
User agrees to terms
      ↓
Submit → API call (simulated)
      ↓
Success → login(email, name) called
      ↓
AuthContext updated with name
      ↓
localStorage saved
      ↓
Navigate to /home
      ↓
ProtectedRoute checks auth
      ↓
User authenticated ✓ → Show homepage
```

## 🛡️ Protected Routes

### How Protection Works

```tsx
// Wrapped pages use ProtectedRoute component
<ProtectedRoute>
  <SiteLayout>
    {/* Page content */}
  </SiteLayout>
</ProtectedRoute>
```

### Protection Logic

1. **Check Authentication State**
   - Reads `isAuthenticated` from AuthContext
   - Waits for initial load check (`isLoading`)

2. **Three States**
   - **Loading**: Shows spinner while checking auth
   - **Not Authenticated**: Redirects to /login
   - **Authenticated**: Shows page content

3. **Auto-Redirect**
   ```tsx
   if (!isAuthenticated) {
     router.navigate({ to: "/login" });
   }
   ```

### Current Protected Routes

- `/home` - Main discover page with all events
- Future: `/dashboard`, `/my-bookings`, etc.

## 📊 State Management (AuthContext)

### Context Structure

```typescript
interface AuthContextType {
  isAuthenticated: boolean;  // Auth status
  user: {
    email: string;
    name?: string;
  } | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  isLoading: boolean;  // Initial load check
}
```

### Usage in Components

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  
  if (isAuthenticated) {
    return <p>Welcome, {user?.name}!</p>;
  }
  
  return <p>Please sign in</p>;
}
```

## 💾 Persistence

### localStorage Keys

- `"auth"` → `true/false` (authentication status)
- `"user"` → `{email, name}` (user info)

### Persistence Flow

**On Login:**
```tsx
login(email, name) {
  localStorage.setItem("auth", JSON.stringify(true));
  localStorage.setItem("user", JSON.stringify({ email, name }));
}
```

**On Logout:**
```tsx
logout() {
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
}
```

**On App Load:**
```tsx
useEffect(() => {
  const savedAuth = localStorage.getItem("auth");
  const savedUser = localStorage.getItem("user");
  
  if (savedAuth && savedUser) {
    // Restore auth state
  }
}, []);
```

## 🔄 Navigation & Routing

### Using Navigation

```tsx
import { useNavigate } from "@tanstack/react-router";

function MyComponent() {
  const navigate = useNavigate();
  
  // Navigate to /home
  navigate({ to: "/home" });
  
  // Navigate with params
  navigate({ to: "/event/$eventId", params: { eventId: "123" } });
}
```

### Route Links

```tsx
import { Link } from "@tanstack/react-router";

// Basic link
<Link to="/home">Go Home</Link>

// With parameters
<Link to="/login">Sign In</Link>

// With custom class
<Link 
  to="/register" 
  className="btn btn-primary"
>
  Create Account
</Link>
```

## 🎨 UI Updates

### Header Component

#### Desktop (≥1024px)
- If **Authenticated**: Shows user name + "Sign out" button
- If **Not Authenticated**: Shows "Sign in" + "Create account" buttons
- Navigation menu always visible
- Notification bell always visible

#### Mobile (<1024px)
- Hamburger menu toggle
- Auth buttons inside dropdown menu
- User info shown in dropdown if authenticated
- Same logout functionality

### User Info Display

```tsx
{isAuthenticated ? (
  <>
    <span>{user?.name || user?.email}</span>
    <button onClick={logout}>Sign out</button>
  </>
) : (
  <>
    <Link to="/login">Sign in</Link>
    <Link to="/register">Create account</Link>
  </>
)}
```

## 🚀 Integration Guide

### Current Implementation (Simulated)

The login/register currently simulate API calls with 1-second delay:

```tsx
setTimeout(() => {
  // Call login
  login(email);
  
  // Show success
  setSubmitSuccess(true);
  
  // Redirect
  navigate({ to: "/home" });
}, 1000); // 1 second delay
```

### Integrating Real Backend

Replace the setTimeout with actual API call:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  
  try {
    // Call your API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const { user, token } = await response.json();
      
      // Call login
      login(user.email, user.name);
      
      // Save token if needed
      localStorage.setItem('token', token);
      
      // Redirect
      navigate({ to: "/home" });
    } else {
      // Handle error
      setErrors({ email: 'Invalid credentials' });
    }
  } catch (error) {
    setErrors({ email: 'Network error' });
  } finally {
    setIsLoading(false);
  }
};
```

## 📋 Features Implemented

### Authentication
- ✅ Login with email/password
- ✅ Register with name/email/password
- ✅ Form validation (client-side)
- ✅ Error messages
- ✅ Loading states
- ✅ Success notifications
- ✅ Auto-redirect after auth

### State Management
- ✅ Global auth context
- ✅ User info storage (name, email)
- ✅ localStorage persistence
- ✅ Auto-restore on page reload
- ✅ Logout clearing

### Route Protection
- ✅ ProtectedRoute component
- ✅ Auto-redirect unauthenticated users
- ✅ Loading state during auth check
- ✅ Wraps protected pages

### UI Integration
- ✅ Auth state in Header
- ✅ User info display
- ✅ Logout button
- ✅ Responsive mobile menu
- ✅ Dynamic navigation links

### Navigation
- ✅ Landing page → /login
- ✅ Login → /home (on success)
- ✅ Register → /home (on success)
- ✅ Header links update based on auth
- ✅ Protected route redirect

## 🔐 Security Checklist

- [ ] Use HTTPS in production
- [ ] Add CSRF protection
- [ ] Implement token-based auth (JWT)
- [ ] Hash passwords on backend
- [ ] Add rate limiting
- [ ] Set secure session cookies
- [ ] Add 2FA support
- [ ] Implement password reset flow
- [ ] Add email verification
- [ ] Clear sensitive data on logout
- [ ] Use secure localStorage alternatives (cookies)

## 🧪 Testing

### Test Scenarios

1. **Unauthenticated Access**
   - Visit `/` → Should redirect to `/login`
   - Visit `/home` → Should redirect to `/login`
   - Should show login form

2. **Login Flow**
   - Enter email & password
   - Click "Sign in"
   - Should show success message
   - Should redirect to `/home`
   - Header should show user info

3. **Registration Flow**
   - Fill registration form
   - Click "Create account"
   - Should show success message
   - Should redirect to `/home`
   - Header should show user name

4. **Logout Flow**
   - Click "Sign out" button
   - Should clear localStorage
   - Should redirect to `/login`
   - Should show login form

5. **Persistence**
   - Login successfully
   - Refresh page
   - Should stay logged in
   - User info should persist

6. **Form Validation**
   - Try invalid email
   - Try short password
   - Should show error messages
   - Submit button should be disabled

## 📚 File Reference

### AuthContext
- **Location**: `src/context/AuthContext.tsx`
- **Exports**: `AuthProvider`, `useAuth()`
- **Usage**: Wrap app at root, use hook in components

### ProtectedRoute
- **Location**: `src/components/ProtectedRoute.tsx`
- **Props**: `children`, `fallback?`
- **Usage**: Wrap protected page components

### Routes
- **Login**: `src/routes/login.tsx` (`/login`)
- **Register**: `src/routes/register.tsx` (`/register`)
- **Home**: `src/routes/home.tsx` (`/home`)
- **Index**: `src/routes/index.tsx` (`/`)

### Components
- **Header**: Updated with auth awareness
- **Logo**: No changes
- **Footer**: No changes

## 🎓 Learning Resources

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [React Context API](https://react.dev/reference/react/useContext)
- [localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Authentication Best Practices](https://owasp.org/www-community/attacks/authentication)

## 🐛 Troubleshooting

### Issue: Always redirecting to login
- **Check**: Is ProtectedRoute wrapper used?
- **Check**: Is AuthProvider at root level?
- **Check**: Is useAuth() called within provider?

### Issue: Auth state lost on refresh
- **Check**: localStorage keys correct?
- **Check**: useEffect in AuthContext running?
- **Check**: Browser privacy mode? (clears localStorage)

### Issue: Can't log in
- **Check**: Form validation passing?
- **Check**: useNavigate hook imported?
- **Check**: "/" route configured as redirect?

### Issue: Header not updating
- **Check**: useAuth() imported in Header?
- **Check**: AuthProvider wrapping component?
- **Check**: Conditional rendering correct?

## 📝 Next Steps

1. **Connect Backend**
   - Replace simulated API calls with real endpoints
   - Add token-based authentication

2. **Add Features**
   - Password reset flow
   - Email verification
   - Remember me functionality
   - OAuth integration

3. **Enhance Security**
   - CSRF tokens
   - Rate limiting
   - Session management
   - Secure cookies

4. **Improve UX**
   - Better error messages
   - Loading optimizations
   - Smooth transitions
   - Mobile polish
