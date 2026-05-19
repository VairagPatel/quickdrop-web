# 🚀 QuickDrop Login - Quick Start Guide

## ⚡ Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
cd d:\QuickDrop\quickdrop-web
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```
Or double-click: `start.bat`

### 3️⃣ Open Browser
Navigate to: **http://localhost:5173/login**

---

## 🔑 Test Login

Use these credentials to test:

```
Email: admin@quickdrop.com
Password: admin123
Role: admin
```

Or:

```
Email: manager@quickdrop.com
Password: manager123
Role: store_manager
```

---

## 📂 Project Structure

```
quickdrop-web/
├── src/
│   ├── context/
│   │   └── AuthContext.tsx          ← Auth logic & useAuth hook
│   ├── components/
│   │   ├── ProtectedRoute.tsx       ← Route protection
│   │   └── Sidebar.tsx              ← Sidebar with logout
│   ├── pages/
│   │   ├── Login.tsx                ← 🎯 Login page
│   │   ├── Unauthorized.tsx         ← Access denied
│   │   ├── Dashboard.tsx            ← Protected
│   │   ├── Orders.tsx               ← Protected
│   │   ├── Store.tsx                ← Protected
│   │   └── Fleet.tsx                ← Protected
│   └── App.tsx                      ← Main app with routing
├── index.html                       ← Custom fonts
└── package.json                     ← Dependencies
```

---

## 🎯 Key Features

### ✅ Authentication
- JWT token-based auth
- Persistent sessions (localStorage)
- Auto-login on page refresh
- Secure logout

### ✅ UI/UX
- Beautiful dark theme
- Custom fonts (Syne + JetBrains Mono)
- Loading spinner
- Error messages
- Smooth animations
- Responsive design

### ✅ Security
- Protected routes
- Role-based access control
- Token validation
- Auto-redirect to login

---

## 🔧 How It Works

### Login Flow
```
1. User enters email + password
2. Click "Login" button
3. API call to: https://quickdrop-api.vercel.app/api/auth/signin
4. Receive token + user data
5. Save token to localStorage as 'qd_token'
6. Redirect to /dashboard
```

### Protected Route Flow
```
1. User tries to access /dashboard
2. ProtectedRoute checks for token
3. If no token → Redirect to /login
4. If wrong role → Redirect to /unauthorized
5. If valid → Show dashboard
```

### Logout Flow
```
1. User clicks "Logout" in sidebar
2. Remove token from localStorage
3. Clear user state
4. Redirect to /login
```

---

## 🎨 Design Specs

### Colors
| Name       | Hex       | Usage                |
|------------|-----------|----------------------|
| Background | `#080810` | Page background      |
| Card       | `#12121f` | Login card, sidebar  |
| Border     | `#1c1c2e` | Borders, dividers    |
| Accent     | `#FF5C28` | Buttons, active items|
| Text       | `#E8E8F5` | Primary text         |
| Muted      | `#6B6B8A` | Labels, secondary    |

### Fonts
- **Syne**: Headings, buttons, logo
- **JetBrains Mono**: Inputs, labels, code

---

## 🛠️ Common Tasks

### Add a New Protected Route
```typescript
// In App.tsx
<Route path="/new-page" element={<NewPage />} />
```

### Change API Endpoint
```typescript
// In src/context/AuthContext.tsx
const response = await fetch('YOUR_API_URL/api/auth/signin', {
  // ...
});
```

### Add More Allowed Roles
```typescript
// In App.tsx
<ProtectedRoute allowedRoles={['admin', 'store_manager', 'new_role']}>
  {/* ... */}
</ProtectedRoute>
```

### Use Auth in Any Component
```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, token, login, logout, isLoading, error } = useAuth();
  
  return (
    <div>
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
```bash
# Solution: Install dependencies
npm install
```

### Issue: Port 5173 already in use
```bash
# Solution: Kill the process or use different port
npm run dev -- --port 3000
```

### Issue: Login fails with CORS error
```
# Solution: Check API endpoint is correct
# Verify: https://quickdrop-api.vercel.app/api/auth/signin
```

### Issue: Token not persisting
```
# Solution: Check browser localStorage
# Open DevTools → Application → Local Storage
# Look for 'qd_token'
```

### Issue: Fonts not loading
```
# Solution: Check internet connection
# Fonts are loaded from Google Fonts CDN
```

---

## 📱 Testing Checklist

### Login Page
- [ ] Page loads correctly
- [ ] Logo displays (🛵 QuickDrop)
- [ ] Email input works
- [ ] Password input works
- [ ] Login button works
- [ ] Loading spinner shows
- [ ] Error message displays on wrong credentials
- [ ] Redirects to /dashboard on success

### Protected Routes
- [ ] Cannot access /dashboard without login
- [ ] Redirects to /login when not authenticated
- [ ] Can access /dashboard after login
- [ ] Sidebar shows user info
- [ ] All nav items work
- [ ] Active route is highlighted

### Logout
- [ ] Logout button in sidebar works
- [ ] Redirects to /login
- [ ] Token removed from localStorage
- [ ] Cannot access protected routes after logout

### Responsive Design
- [ ] Works on mobile (< 768px)
- [ ] Works on tablet (768px - 1024px)
- [ ] Works on desktop (> 1024px)

---

## 📚 Documentation Files

- **LOGIN_IMPLEMENTATION.md** - Full implementation guide
- **COMPLETE_CODE_SUMMARY.md** - All code in one place
- **VISUAL_PREVIEW.md** - Visual design reference
- **QUICK_START_GUIDE.md** - This file

---

## 🎉 You're Ready!

Your QuickDrop login system is complete and production-ready!

### Next Steps:
1. Run `npm run dev` or `start.bat`
2. Open http://localhost:5173/login
3. Login with test credentials
4. Explore the dashboard

### Need Help?
- Check the documentation files
- Review the code comments
- Test with different credentials
- Verify API endpoint is accessible

---

**Happy coding! 🚀**
