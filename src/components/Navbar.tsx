import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Calendar, Home, LayoutDashboard, Map, Menu, Shield, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [
  { to: "/home", key: "nav.home", icon: Home },
  { to: "/map", key: "nav.map", icon: Map },
  { to: "/calendar", key: "nav.calendar", icon: Calendar },
  { to: "/dashboard", key: "nav.myBookings", icon: LayoutDashboard },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 ${isRTL ? "flex-row-reverse" : ""}`}>
        <Logo compact />

        {/* Desktop Navigation */}
        <nav className={`hidden items-center gap-1 lg:flex ${isRTL ? "flex-row-reverse" : ""}`}>
          {navItems.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth ${isRTL ? "flex-row-reverse" : ""} ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Notifications */}
          <button
            aria-label={t("nav.notifications")}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground sm:flex"
          >
            <Bell className="h-5 w-5" />
            <span className={`absolute h-2 w-2 rounded-full bg-primary ring-2 ring-background ${isRTL ? "left-2" : "right-2"} top-2`} />
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className={`hidden items-center gap-3 rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 shadow-sm sm:flex ${isRTL ? "flex-row-reverse" : ""}`}>
              <span className="rounded-full bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm">
                {user?.name || user?.email}
              </span>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className={`rounded-full ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t("nav.signOut")}
              </Button>
            </div>
          ) : (
            <div className={`hidden gap-2 sm:flex ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/login">{t("nav.signIn")}</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/register">{t("nav.createAccount")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            aria-label={t("nav.toggleMenu")}
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
          <nav className={`mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 ${isRTL ? "flex-col-reverse" : ""}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {t(item.key)}
                </Link>
              );
            })}

            {/* Mobile Language Switcher and Auth */}
            <div className={`mt-4 flex flex-col gap-2 border-t border-border pt-4 ${isRTL ? "flex-col-reverse" : ""}`}>
              {/* Language buttons */}
              <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <button
                  onClick={() => {
                    setLanguage("FR");
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
                    setLanguage("AR");
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
                <div className={`flex flex-col gap-2 ${isRTL ? "flex-col-reverse" : ""}`}>
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
                    {t("nav.signOut")}
                  </Button>
                </div>
              ) : (
                <div className={`flex flex-col gap-2 ${isRTL ? "flex-col-reverse" : ""}`}>
                  <Button asChild variant="outline" className="rounded-lg mx-4">
                    <Link to="/login" onClick={() => setOpen(false)}>{t("nav.signIn")}</Link>
                  </Button>
                  <Button asChild className="rounded-lg mx-4">
                    <Link to="/register" onClick={() => setOpen(false)}>{t("nav.createAccount")}</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
