import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/60 bg-muted/30 pattern-zellige">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("footer.description")}
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/complexe_industries_culturelle?igsh=cDdvMTZhNWpqYmpi"
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.explore")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">{t("footer.events")}</Link></li>
            <li><Link to="/map" className="hover:text-primary">{t("footer.map")}</Link></li>
            <li><Link to="/calendar" className="hover:text-primary">{t("footer.calendar")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">{t("footer.community")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-primary">{t("footer.myAccount")}</Link></li>
            <li><a href="#" className="hover:text-primary">{t("footer.contact")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} CulturePass Mediouna. {t("footer.allRights")}</p>
          <p>{t("footer.madeWithCare")}</p>
        </div>
      </div>
    </footer>
  );
}
