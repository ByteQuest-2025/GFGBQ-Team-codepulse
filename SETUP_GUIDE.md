# Micro-Investment Platform - Setup & Installation Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for backend services)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   - Update `src/firebase/config.js` with your Firebase project credentials
   - Enable Phone Authentication in Firebase Console
   - Set up Firestore database

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Installed Packages

### Core Dependencies
- `react` ^19.2.0 - UI library
- `react-dom` ^19.2.0 - React DOM renderer
- `react-router-dom` - Routing library (newly added)
- `firebase` ^12.7.0 - Backend services
- `vite-plugin-pwa` ^1.2.0 - PWA support

### Development Dependencies
- `vite` ^7.2.4 - Build tool
- `tailwindcss` ^3.4.13 - CSS framework
- `eslint` - Code linting
- `firebase-tools` - Firebase CLI

## 🏗️ Project Architecture

### Component Structure
```
components/
├── onboarding/    # User onboarding flow
├── education/     # Learning modules
├── investment/    # Investment features
├── dashboard/     # Portfolio dashboard
└── common/        # Shared components
```

### State Management
- **AppContext** - Global app state (user, language, settings)
- **InvestmentContext** - Portfolio and transactions
- **EducationContext** - Learning progress

### Routing Structure
```
/onboarding       -> First-time user setup
/                 -> Home/Dashboard (protected)
/invest           -> Investment options (protected)
/learn            -> Educational content (protected)
/passbook         -> Transaction history (protected)
/profile          -> User profile & settings (protected)
```

## 🎨 Design System

### Colors (Tailwind)
- **Primary Green**: `green-600` (₹10 investment actions)
- **Accent**: Various for trust indicators
- **Background**: `gray-50` (light, low power consumption)

### Typography
- **Base Size**: 14px (readable on small screens)
- **Headings**: Bold, clear hierarchy
- **Body**: Medium weight for readability

### Layout
- **Mobile-First**: Designed for small screens (320px+)
- **Bottom Navigation**: Easy thumb access
- **Card-Based**: Clear content separation

## 🔧 Configuration Files

### `vite.config.js`
- Development server configuration
- Build optimization for low-end devices
- PWA manifest settings

### `tailwind.config.js`
- Custom color palette
- Typography settings
- Responsive breakpoints

### `firebase.json`
- Hosting rules
- Security rules for Firestore
- Function deployment settings

## 📱 PWA Configuration

### Features
- **Offline Support**: Works without internet
- **Install Prompt**: Add to home screen
- **Background Sync**: Syncs when online
- **Push Notifications**: Investment updates

### Cache Strategy
- Cache-first for static assets
- Network-first for dynamic data
- 5MB cache limit for low-end devices

## 🔐 Security

### Authentication
- Phone number + OTP (Firebase Auth)
- No password storage
- Session management

### Data Security
- Encrypted data at rest (Firestore)
- HTTPS only
- API key restrictions

### Privacy
- Minimal data collection
- No third-party tracking
- GDPR compliant

## 🌐 Internationalization

### Supported Languages
1. English (en)
2. Hindi (hi) - हिंदी
3. Bengali (bn) - বাংলা
4. Telugu (te) - తెలుగు
5. Marathi (mr) - मराठी
6. Tamil (ta) - தமிழ்

### Adding New Language
1. Add translations to language files
2. Update `LanguageSelector` component
3. Test all UI elements
4. Update documentation

## 🧪 Testing

### Manual Testing Checklist
- [ ] Onboarding flow completion
- [ ] Phone authentication
- [ ] Investment creation
- [ ] Lesson completion
- [ ] Transaction history
- [ ] Offline functionality
- [ ] Language switching
- [ ] Low-end device performance

### Test on Different Devices
- [ ] Low-end Android (< 2GB RAM)
- [ ] Mid-range smartphone
- [ ] 2G/3G network
- [ ] WiFi
- [ ] Different screen sizes

## 📊 Performance Optimization

### Bundle Size Targets
- Initial load: < 300KB (gzipped)
- Total assets: < 1MB
- Lazy loading for routes
- Code splitting for components

### Runtime Performance
- First Contentful Paint: < 2s
- Time to Interactive: < 3s
- 60fps animations
- < 100ms input response

### Network Optimization
- Image compression (WebP)
- Lazy loading images
- API request batching
- Offline queue for actions

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

### Environment Variables
Create `.env` file:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Pre-deployment Checklist
- [ ] Update version number
- [ ] Run linter (`npm run lint`)
- [ ] Test on staging environment
- [ ] Check bundle size
- [ ] Test PWA install
- [ ] Verify Firebase rules
- [ ] Update documentation

## 📝 Development Workflow

### Git Workflow
1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -m "Description"`
3. Push to remote: `git push origin feature/name`
4. Create pull request
5. Merge after review

### Code Style
- Follow ESLint rules
- Use functional components
- JSDoc comments for functions
- Meaningful variable names
- Keep components < 200 lines

### Component Guidelines
- One component per file
- Props destructuring
- PropTypes or TypeScript
- Accessibility attributes
- Mobile-first design

## 🐛 Troubleshooting

### Common Issues

**Issue: Firebase auth not working**
- Check Firebase console configuration
- Verify phone auth is enabled
- Check reCAPTCHA setup

**Issue: Routing not working**
- Ensure react-router-dom is installed
- Check Browser Router configuration
- Verify route paths

**Issue: Context not updating**
- Check Context Provider hierarchy
- Verify useContext import
- Check state update logic

**Issue: Styles not applying**
- Run `npm run dev` again
- Clear browser cache
- Check Tailwind config

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Write/update tests
5. Submit pull request

## 📞 Support

For technical issues or questions:
- Create GitHub issue
- Email: support@microinvest.com
- Documentation: `/PROJECT_DOCUMENTATION.md`

---

**Built with ❤️ for India's First-Time Investors**
