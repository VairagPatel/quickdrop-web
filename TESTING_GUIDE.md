# 🧪 QuickDrop Login - Testing Guide

## 📋 Complete Testing Checklist

---

## 1️⃣ Installation Testing

### ✅ Prerequisites Check
```bash
# Check Node.js
node --version
# Expected: v16.x or higher

# Check npm
npm --version
# Expected: v8.x or higher
```

### ✅ Installation
```bash
# Navigate to project
cd d:\QuickDrop\quickdrop-web

# Install dependencies
npm install

# Expected: No errors, node_modules created
```

### ✅ Verification
```bash
# Run verification script
verify-installation.bat

# Expected: All checks pass ✅
```

---

## 2️⃣ Development Server Testing

### ✅ Start Server
```bash
# Option 1
npm run dev

# Option 2
start.bat

# Expected: Server starts on http://localhost:5173
```

### ✅ Server Health
- [ ] Server starts without errors
- [ ] No console warnings
- [ ] Port 5173 is accessible
- [ ] Hot reload works

---

## 3️⃣ Login Page Testing

### ✅ Visual Testing

#### Page Load
- [ ] Page loads without errors
- [ ] Background color is #080810 (dark navy)
- [ ] Card is centered on screen
- [ ] Card background is #12121f
- [ ] Card border is #1c1c2e

#### Logo
- [ ] 🛵 emoji displays correctly
- [ ] "QuickDrop" text is orange (#FF5C28)
- [ ] Font is Syne (bold)
- [ ] Logo is centered

#### Heading
- [ ] "Welcome back" text displays
- [ ] Text color is #E8E8F5 (light gray)
- [ ] Font is Syne
- [ ] Heading is centered

#### Email Input
- [ ] Label says "Email"
- [ ] Label color is #6B6B8A (muted)
- [ ] Label font is JetBrains Mono
- [ ] Input background is #080810
- [ ] Input border is #1c1c2e
- [ ] Input text color is #E8E8F5
- [ ] Input font is JetBrains Mono
- [ ] Placeholder shows "your@email.com"

#### Password Input
- [ ] Label says "Password"
- [ ] Label color is #6B6B8A
- [ ] Label font is JetBrains Mono
- [ ] Input background is #080810
- [ ] Input border is #1c1c2e
- [ ] Input text color is #E8E8F5
- [ ] Input font is JetBrains Mono
- [ ] Placeholder shows "••••••••"
- [ ] Password is masked

#### Login Button
- [ ] Button says "Login"
- [ ] Button background is #FF5C28 (orange)
- [ ] Button text is #E8E8F5
- [ ] Button font is Syne
- [ ] Button is full width
- [ ] Button has rounded corners

#### Footer
- [ ] Text says "Admin & Store Manager Access Only"
- [ ] Text color is #6B6B8A
- [ ] Text font is JetBrains Mono
- [ ] Text is small and centered

### ✅ Interaction Testing

#### Input Focus
- [ ] Click email input → orange focus ring appears
- [ ] Click password input → orange focus ring appears
- [ ] Tab navigation works
- [ ] Focus ring color is #FF5C28

#### Button Hover
- [ ] Hover over button → opacity changes
- [ ] Cursor changes to pointer
- [ ] Transition is smooth

#### Form Validation
- [ ] Empty email → HTML5 validation error
- [ ] Invalid email format → HTML5 validation error
- [ ] Empty password → HTML5 validation error

### ✅ Functional Testing

#### Successful Login
```
Test Case: Valid Admin Credentials
Email: admin@quickdrop.com
Password: admin123

Steps:
1. Enter email
2. Enter password
3. Click "Login"

Expected:
- [ ] Loading spinner appears
- [ ] Button text changes to "Logging in..."
- [ ] Button is disabled
- [ ] Inputs are disabled
- [ ] After ~1s, redirect to /dashboard
- [ ] Token saved to localStorage
- [ ] User info saved to context
```

#### Failed Login
```
Test Case: Invalid Credentials
Email: wrong@email.com
Password: wrongpassword

Steps:
1. Enter email
2. Enter password
3. Click "Login"

Expected:
- [ ] Loading spinner appears briefly
- [ ] Error message displays in red
- [ ] Error says "Invalid credentials" or similar
- [ ] Form remains on login page
- [ ] Inputs are re-enabled
- [ ] Can try again
```

#### Network Error
```
Test Case: API Unavailable
(Disconnect internet or use wrong API URL)

Steps:
1. Enter valid credentials
2. Click "Login"

Expected:
- [ ] Loading spinner appears
- [ ] Error message displays
- [ ] Error indicates network problem
- [ ] Form remains functional
```

---

## 4️⃣ Protected Routes Testing

### ✅ Unauthenticated Access

#### Test: Access Dashboard Without Login
```
Steps:
1. Clear localStorage (DevTools → Application → Local Storage)
2. Navigate to http://localhost:5173/dashboard

Expected:
- [ ] Immediately redirected to /login
- [ ] No dashboard content visible
- [ ] URL changes to /login
```

#### Test: Access Other Protected Routes
```
Routes to test:
- /orders
- /store
- /fleet

Expected for each:
- [ ] Redirected to /login
- [ ] No content visible
```

### ✅ Authenticated Access

#### Test: Access Dashboard After Login
```
Steps:
1. Login with valid credentials
2. Should auto-redirect to /dashboard

Expected:
- [ ] Dashboard loads successfully
- [ ] Sidebar is visible
- [ ] User info shows in sidebar
- [ ] Navigation works
```

#### Test: Direct URL Access
```
Steps:
1. Login successfully
2. Manually navigate to http://localhost:5173/orders

Expected:
- [ ] Orders page loads
- [ ] No redirect to login
- [ ] Sidebar shows active state for Orders
```

### ✅ Role-Based Access

#### Test: Admin Access
```
Credentials:
Email: admin@quickdrop.com
Password: admin123

Expected:
- [ ] Can access /dashboard
- [ ] Can access /orders
- [ ] Can access /store
- [ ] Can access /fleet
- [ ] No unauthorized redirects
```

#### Test: Store Manager Access
```
Credentials:
Email: manager@quickdrop.com
Password: manager123

Expected:
- [ ] Can access /dashboard
- [ ] Can access /orders
- [ ] Can access /store
- [ ] Can access /fleet
- [ ] No unauthorized redirects
```

#### Test: Invalid Role (if applicable)
```
If you have a user with role "customer":

Expected:
- [ ] Redirected to /unauthorized
- [ ] Cannot access protected routes
- [ ] Unauthorized page displays
```

---

## 5️⃣ Sidebar Testing

### ✅ Visual Testing

#### User Info Display
- [ ] User name displays correctly
- [ ] User role displays correctly
- [ ] Text color is correct (#E8E8F5 for name, #6B6B8A for role)
- [ ] Font is correct

#### Navigation Items
- [ ] Dashboard icon and text
- [ ] Orders icon and text
- [ ] Store icon and text
- [ ] Fleet icon and text
- [ ] All items visible

#### Active State
- [ ] Current route is highlighted in orange (#FF5C28)
- [ ] Other routes are muted (#6B6B8A)
- [ ] Active state is clear and obvious

#### Logout Button
- [ ] Logout button visible at bottom
- [ ] Icon displays (LogOut icon)
- [ ] Text says "Logout"
- [ ] Version info below button

### ✅ Interaction Testing

#### Navigation
```
Test each navigation item:

Dashboard:
- [ ] Click → Navigate to /dashboard
- [ ] Active state updates
- [ ] Content changes

Orders:
- [ ] Click → Navigate to /orders
- [ ] Active state updates
- [ ] Content changes

Store:
- [ ] Click → Navigate to /store
- [ ] Active state updates
- [ ] Content changes

Fleet:
- [ ] Click → Navigate to /fleet
- [ ] Active state updates
- [ ] Content changes
```

#### Hover Effects
- [ ] Hover over inactive item → background changes to #12121f
- [ ] Hover over inactive item → text color changes to #E8E8F5
- [ ] Hover over logout button → same hover effect
- [ ] Transitions are smooth

#### Logout
```
Steps:
1. Click "Logout" button

Expected:
- [ ] Redirected to /login
- [ ] Token removed from localStorage
- [ ] User state cleared
- [ ] Cannot access protected routes anymore
- [ ] Must login again to access dashboard
```

---

## 6️⃣ Session Persistence Testing

### ✅ Page Refresh
```
Steps:
1. Login successfully
2. Navigate to /dashboard
3. Refresh page (F5 or Ctrl+R)

Expected:
- [ ] Still logged in
- [ ] Dashboard still visible
- [ ] User info still in sidebar
- [ ] No redirect to login
```

### ✅ New Tab
```
Steps:
1. Login successfully in Tab 1
2. Open new tab (Tab 2)
3. Navigate to http://localhost:5173/dashboard in Tab 2

Expected:
- [ ] Dashboard loads in Tab 2
- [ ] No login required
- [ ] User info displays
- [ ] Token shared between tabs
```

### ✅ Browser Restart
```
Steps:
1. Login successfully
2. Close browser completely
3. Reopen browser
4. Navigate to http://localhost:5173/dashboard

Expected:
- [ ] Dashboard loads
- [ ] Still logged in
- [ ] Token persisted
- [ ] No login required
```

### ✅ Token Expiration (if implemented)
```
Steps:
1. Login successfully
2. Wait for token to expire (if applicable)
3. Try to access protected route

Expected:
- [ ] Redirected to login
- [ ] Token cleared
- [ ] Must login again
```

---

## 7️⃣ Responsive Design Testing

### ✅ Mobile (< 768px)

#### Login Page
- [ ] Card is full width with padding
- [ ] All elements visible
- [ ] Text is readable
- [ ] Buttons are touch-friendly
- [ ] No horizontal scroll

#### Dashboard
- [ ] Sidebar adapts (or hides)
- [ ] Content is readable
- [ ] Navigation works
- [ ] No layout breaks

### ✅ Tablet (768px - 1024px)

#### Login Page
- [ ] Card is centered
- [ ] Max-width: 420px
- [ ] Proper spacing
- [ ] All elements visible

#### Dashboard
- [ ] Sidebar visible
- [ ] Content area adapts
- [ ] No layout issues

### ✅ Desktop (> 1024px)

#### Login Page
- [ ] Card is centered
- [ ] Max-width: 420px
- [ ] Proper spacing
- [ ] Looks professional

#### Dashboard
- [ ] Sidebar fixed width (256px)
- [ ] Content area fills remaining space
- [ ] All elements properly sized

---

## 8️⃣ Browser Compatibility Testing

### ✅ Chrome/Edge
- [ ] Login page renders correctly
- [ ] All features work
- [ ] No console errors
- [ ] Fonts load correctly

### ✅ Firefox
- [ ] Login page renders correctly
- [ ] All features work
- [ ] No console errors
- [ ] Fonts load correctly

### ✅ Safari
- [ ] Login page renders correctly
- [ ] All features work
- [ ] No console errors
- [ ] Fonts load correctly

---

## 9️⃣ Performance Testing

### ✅ Load Time
```
Test with DevTools Network tab:

Login Page:
- [ ] Initial load < 1s
- [ ] Fonts load < 500ms
- [ ] No blocking resources
- [ ] Smooth rendering

Dashboard:
- [ ] Load after login < 1s
- [ ] No lag or jank
- [ ] Smooth transitions
```

### ✅ Bundle Size
```
Build and check:
npm run build

Expected:
- [ ] Total bundle < 500KB
- [ ] Gzipped < 150KB
- [ ] No huge dependencies
```

### ✅ Memory Usage
```
Test with DevTools Performance tab:

Expected:
- [ ] No memory leaks
- [ ] Stable memory usage
- [ ] No excessive re-renders
```

---

## 🔟 Security Testing

### ✅ Token Storage
```
Check localStorage:
1. Login successfully
2. Open DevTools → Application → Local Storage
3. Find 'qd_token'

Expected:
- [ ] Token is stored
- [ ] Token is JWT format
- [ ] Token contains user info (decode at jwt.io)
```

### ✅ XSS Protection
```
Test with malicious input:
Email: <script>alert('xss')</script>
Password: test123

Expected:
- [ ] Script does not execute
- [ ] Input is sanitized
- [ ] No security warnings
```

### ✅ HTTPS (Production)
```
In production:
- [ ] All requests use HTTPS
- [ ] No mixed content warnings
- [ ] Secure cookies (if using cookies)
```

---

## 1️⃣1️⃣ Error Handling Testing

### ✅ Network Errors
```
Test scenarios:
1. Disconnect internet → Try login
2. Wrong API URL → Try login
3. API timeout → Try login

Expected for each:
- [ ] Error message displays
- [ ] User can retry
- [ ] No app crash
- [ ] Clear error description
```

### ✅ Invalid Token
```
Test scenarios:
1. Manually edit token in localStorage
2. Try to access protected route

Expected:
- [ ] Redirected to login
- [ ] Token cleared
- [ ] No error thrown
```

### ✅ API Errors
```
Test scenarios:
1. 500 Internal Server Error
2. 401 Unauthorized
3. 403 Forbidden

Expected for each:
- [ ] Error message displays
- [ ] User can retry
- [ ] Appropriate error message
```

---

## 1️⃣2️⃣ Accessibility Testing

### ✅ Keyboard Navigation
- [ ] Tab through all inputs
- [ ] Tab to button
- [ ] Enter submits form
- [ ] Escape clears focus (if applicable)

### ✅ Screen Reader
- [ ] Labels are read correctly
- [ ] Errors are announced
- [ ] Button states are announced
- [ ] Navigation is clear

### ✅ Focus Indicators
- [ ] Focus ring visible on all interactive elements
- [ ] Focus ring color is #FF5C28
- [ ] Focus ring is clear and obvious

### ✅ Color Contrast
- [ ] Text is readable
- [ ] Meets WCAG AA standards
- [ ] No color-only indicators

---

## 📊 Test Results Template

```
Date: _______________
Tester: _______________
Browser: _______________
OS: _______________

Installation: ✅ / ❌
Login Page Visual: ✅ / ❌
Login Page Functional: ✅ / ❌
Protected Routes: ✅ / ❌
Sidebar: ✅ / ❌
Session Persistence: ✅ / ❌
Responsive Design: ✅ / ❌
Browser Compatibility: ✅ / ❌
Performance: ✅ / ❌
Security: ✅ / ❌
Error Handling: ✅ / ❌
Accessibility: ✅ / ❌

Overall: ✅ / ❌

Notes:
_________________________________
_________________________________
_________________________________
```

---

## 🐛 Common Issues & Solutions

### Issue: Login button not working
**Solution:** Check console for errors, verify API endpoint

### Issue: Redirect not working
**Solution:** Check React Router setup, verify navigate() calls

### Issue: Token not persisting
**Solution:** Check localStorage, verify token format

### Issue: Fonts not loading
**Solution:** Check internet connection, verify Google Fonts CDN

### Issue: Styles not applying
**Solution:** Check Tailwind config, verify class names

### Issue: Protected routes accessible without login
**Solution:** Check ProtectedRoute wrapper, verify token check

---

## ✅ Final Checklist

Before marking as complete:

- [ ] All visual tests pass
- [ ] All functional tests pass
- [ ] All security tests pass
- [ ] All browsers tested
- [ ] All devices tested
- [ ] Documentation reviewed
- [ ] No console errors
- [ ] No console warnings
- [ ] Performance is acceptable
- [ ] Accessibility is acceptable

---

**Testing complete! Ready for production!** 🎉
