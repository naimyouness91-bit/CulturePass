import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Calendar, LayoutDashboard, Map, Menu, Shield, X, LogOut, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type Language = "FR" | "AR";

const translations = {
  FR: {
    discover: "Découvrir",
    map: "Carte",
    calendar: "Calendrier",
    myBookings: "Mes Réservations",
    admin: "Admin",
    signIn: "Se Connecter",
    createAccount: "Créer un Compte",
    signOut: "Se Déconnecter",
    notifications: "Notifications",
    toggleMenu: "Basculer le menu",
  },
  AR: {
    discover: "اكتشف",
    map: "خريطة",
    calendar: "التقويم",
    myBookings: "حجوزاتي",
    admin: "مسؤول",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    signOut: "تسجيل الخروج",
    notifications: "الإخطارات",
    toggleMenu: "تبديل القائمة",
  },
};

const navItems = [
  { to: "/home", key: "discover", icon: null },
  { to: "/map", key: "map", icon: Map },
  { to: "/calendar", key: "calendar", icon: Calendar },
  { to: "/dashboard", key: "myBookings", icon: LayoutDashboard },
  { to: "/admin", key: "admin", icon: Shield },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("FR");
  const { isAuthenticated, user, logout } = useAuth();

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.dir = savedLanguage === "AR" ? "rtl" : "ltr";
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.dir = newLanguage === "AR" ? "rtl" : "ltr";
  };

  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ${language === "AR" ? "flex-row-reverse" : ""}`}>
        <Logo />

        {/* Desktop Navigation */}
        <nav className={`hidden items-center gap-1 lg:flex ${language === "AR" ? "flex-row-reverse" : ""}`}>
          {navItems.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {t[item.key as keyof typeof t]}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className={`flex items-center gap-2 ${language === "AR" ? "flex-row-reverse" : ""}`}>
          {/* Notifications */}
          <button
            aria-label={t.notifications}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground sm:flex"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

          {/* Language Switcher */}
          <div className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 sm:flex">
            <button
              onClick={() => handleLanguageChange("FR")}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-smooth ${
                language === "FR"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-4 w-4" />
              FR
            </button>
            <button
              onClick={() => handleLanguageChange("AR")}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-smooth ${
                language === "AR"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-4 w-4" />
              AR
            </button>
          </div>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-sm text-muted-foreground">
                {user?.name || user?.email}
              </span>
              <Button
                onClick={logout}
                variant="outline"
                className="rounded-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.signOut}
              </Button>
            </div>
          ) : (
            <div className={`hidden gap-2 sm:flex ${language === "AR" ? "flex-row-reverse" : ""}`}>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/login">{t.signIn}</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/register">{t.createAccount}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            aria-label={t.toggleMenu}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className={`mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 ${language === "AR" ? "flex-col-reverse" : ""}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted ${language === "AR" ? "flex-row-reverse" : ""}`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {t[item.key as keyof typeof t]}
                </Link>
              );
            })}

            {/* Mobile Language Switcher */}
            <div className={`mt-4 flex gap-2 border-t border-border pt-4 ${language === "AR" ? "flex-row-reverse" : ""}`}>
              <button
                onClick={() => {
                  handleLanguageChange("FR");
                  setOpen(false);
                }}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-smooth ${
                  language === "FR"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                Français
              </button>
              <button
                onClick={() => {
                  handleLanguageChange("AR");
                  setOpen(false);
                }}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-smooth ${
                  language === "AR"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                العربية
              </button>
            </div>

            {/* Mobile Auth Buttons */}
            {isAuthenticated ? (
              <div className={`mt-4 flex flex-col gap-2 border-t border-border pt-4 ${language === "AR" ? "flex-col-reverse" : ""}`}>
                <span className="text-sm text-muted-foreground px-4">
                  {user?.name || user?.email}
                </span>
                <Button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  variant="outline"
                  className="rounded-lg mx-4"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.signOut}
                </Button>
              </div>
            ) : (
              <div className={`mt-4 flex flex-col gap-2 border-t border-border pt-4 ${language === "AR" ? "flex-col-reverse" : ""}`}>
                <Button asChild variant="outline" className="rounded-lg mx-4">
                  <Link to="/login" onClick={() => setOpen(false)}>{t.signIn}</Link>
                </Button>
                <Button asChild className="rounded-lg mx-4">
                  <Link to="/register" onClick={() => setOpen(false)}>{t.createAccount}</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
