# CulturePass — Mediouna's Cultural Platform

**CulturePass** is a modern web application designed to connect residents and visitors of Mediouna to the city's rich cultural heritage through music, theatre, festivals, and community events.

## 🎭 Overview

CulturePass bridges the gap between cultural enthusiasts and events happening in Mediouna. Whether you're interested in Gnawa music nights, traditional festivals, contemporary theatre, or community gatherings, CulturePass makes it easy to discover, explore, and book cultural experiences.

## ✨ Features

### Core Features
- **Event Discovery** — Browse and search for cultural events across Mediouna
- **Interactive Map** — Explore event locations on a dynamic, interactive map
- **Calendar View** — Plan your cultural calendar with a sophisticated calendar interface
- **Event Reservations** — Book seats and manage your reservations
- **User Dashboard** — Track your bookings, see upcoming events, and manage your profile
- **Notifications** — Stay informed with real-time notifications about events

### Localization
- **Bilingual Support** — Full support for French (FR) and Arabic (AR)
- **RTL Layout** — Arabic text automatically adjusts right-to-left formatting
- **Latin Digits** — Numeric values displayed in Latin format for consistency
- **Language Detection** — Smart language detection for chatbot interactions

### Chatbot
- **CulturePass AI Assistant** — Intelligent chatbot with predefined knowledge about CulturePass and Mediouna
- **Quick Reply Buttons** — Pre-defined questions for easy navigation
- **Language Support** — Chatbot responds in user's selected language
- **Rate Limiting** — 5 questions per session to maintain quality

### Authentication
- **User Registration** — Create a personal account
- **Sign In/Sign Out** — Secure authentication
- **Protected Routes** — Admin routes and premium features protected

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework:** React + TypeScript
- **Routing:** @tanstack/react-router
- **Styling:** Tailwind CSS with custom components
- **UI Components:** Radix UI
- **State Management:** React Context (Language, Auth, Notifications, Chatbot)
- **Build Tool:** Vite
- **Runtime:** Cloudflare Workers (via Wrangler)

### Project Structure
```
src/
├── routes/           # Page components (home, calendar, map, dashboard, etc.)
├── components/       # Reusable UI components
│   ├── ui/          # Radix UI-based component library
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ChatBot.tsx
│   ├── EventCard.tsx
│   └── ...
├── context/         # Global state (Language, Auth, Notifications, Chatbot)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── data/            # Static data (events, categories)
└── assets/          # Images and static files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- npm or Bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CulturePass
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with Bun
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or with Bun
   bun run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Development Commands

- **Development Server:** `npm run dev`
- **Production Build:** `npm run build`
- **Preview Build:** `npm run preview`
- **Type Check:** `npx tsc --noEmit`
- **Linting:** `npm run lint`
- **Format Code:** `npm run format`

## 🌍 Localization

### Language Support
The app supports two languages:
- **French (FR)** — Default language
- **Arabic (AR)** — Right-to-left layout

### Language Switching
Users can switch languages via the language switcher in the navbar. Language preference is saved in localStorage.

### Adding Translations
Edit [`src/context/LanguageContext.tsx`](src/context/LanguageContext.tsx) to add new translations:

```typescript
const translations: Record<Language, Record<string, string>> = {
  FR: {
    "key.name": "French translation",
  },
  AR: {
    "key.name": "الترجمة العربية",
  },
};
```

## 📱 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Redirect to home |
| `/home` | Homepage with hero, search, and featured events |
| `/calendar` | Event calendar view with month/week navigation |
| `/map` | Interactive map of events in Mediouna |
| `/dashboard` | User bookings and profile management |
| `/event/:eventId` | Detailed event information and booking |
| `/login` | User login page |
| `/register` | User registration page |

## 🔐 Authentication

- Protected routes redirect unauthenticated users to login
- Admin pages are hidden from regular users
- User context stores authentication state across the app

## 💬 Chatbot

The CulturePass chatbot provides information about:
- How to use CulturePass
- Mediouna's cultural heritage
- Event booking process
- Cultural context and history

**Features:**
- 5 pre-defined questions per session
- Language detection (Arabic/French)
- Quick reply button interface
- Predefined responses stored in [`src/data/limitedChatbotQuestions.ts`](src/data/limitedChatbotQuestions.ts)

## 🎨 Styling

- **Tailwind CSS** — Utility-first CSS framework
- **Radix UI** — Headless UI components for accessibility
- **Custom Theme** — Defined in `tailwind.config.ts`
- **RTL Support** — Automatic adjustment for Arabic layout

## 🔄 State Management

### Context Providers
1. **LanguageContext** — Language selection and translations
2. **AuthContext** — User authentication state
3. **NotificationContext** — Toast notifications
4. **ChatbotContext** — Chatbot state and message history

All providers are wrapped in [`src/components/SiteLayout.tsx`](src/components/SiteLayout.tsx).

## 📊 Data

### Static Data
Event data is stored in [`src/data/events.ts`](src/data/events.ts) including:
- Event titles, descriptions, and images
- Venue information
- Event categories
- Featured events

## 🎯 Best Practices

1. **Always use the `t()` function** from `useLanguage()` for UI text
2. **Maintain RTL compatibility** with `isRTL` flag for flex layouts
3. **Use semantic HTML** and accessible components from Radix UI
4. **Keep components small** and focused on single responsibility
5. **Store user preferences** in localStorage (e.g., language)

## 📦 Deployment

The app is configured to deploy on **Cloudflare Workers**:

```bash
npm run build
wrangler deploy
```

Configuration is in [`wrangler.jsonc`](wrangler.jsonc).

## 🐛 Troubleshooting

### TypeScript Errors
```bash
npx tsc --noEmit
```

### Build Issues
```bash
rm -rf node_modules .cache
npm install
npm run build
```

### Development Server Not Starting
- Check if port 5173 is in use
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## 📚 Documentation

- [Authentication Routing Guide](AUTHENTICATION_ROUTING_GUIDE.md)
- [Auth Pages Visual Guide](AUTH_PAGES_VISUAL_GUIDE.md)
- [Auth Pages Documentation](AUTH_PAGES_DOCUMENTATION.md)
- [Quick Reference](QUICK_REFERENCE.md)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run type check: `npx tsc --noEmit`
4. Format code: `npm run format`
5. Push and create a pull request

## 📄 License

This project is built for Mediouna's cultural community.

## 🎵 About Mediouna

Mediouna is a vibrant city that blends tradition and modernity. From Gnawa music to contemporary art, from traditional crafts to modern commerce, Mediouna offers a rich tapestry of cultural experiences. CulturePass aims to make these experiences accessible to everyone.

---

**CulturePass** — *Connecting Culture. Building Community. Celebrating Heritage.*

🏛️ For events and cultural activities in Mediouna, visit the app and explore!
