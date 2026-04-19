import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Calendar, LayoutDashboard, Map, Menu, Shield, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { to: "/home", label: "Discover" },
  { to: "/map", label: "Map", icon: Map },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/dashboard", label: "My Bookings", icon: LayoutDashboard },
] as const;

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo compact />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-smooth ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground sm:flex"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

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
                Sign out
              </Button>
            </div>
          ) : (
            <div className="hidden gap-2 sm:flex">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link to="/register">Create account</Link>
              </Button>
            </div>
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border/60 pt-3 mt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    {user?.name || user?.email}
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full rounded-lg">
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button asChild className="w-full rounded-lg">
                    <Link to="/register">Create account</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
