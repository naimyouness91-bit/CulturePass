import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  MapPin,
  Search,
  Sparkles,
  Calendar,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { events, featuredEvent, categories, HERO_IMAGE } from "@/data/events";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "CulturePass — Discover Mediouna's cultural agenda" },
      {
        name: "description",
        content:
          "Music, theatre, festivals, heritage and community events across Mediouna. Search, book and live the city's cultural life.",
      },
      { property: "og:title", content: "CulturePass — Mediouna" },
      {
        property: "og:description",
        content: "The cultural agenda of Mediouna, in one place.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, isRTL, language } = useLanguage();
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(language === "AR" ? "ar-SA" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find((cat) => cat.name === categoryId);
    return language === "AR" ? category?.labelAr ?? category?.labelFr ?? categoryId : category?.labelFr ?? categoryId;
  };

  const featuredTitle = language === "AR" ? featuredEvent.titleAr ?? featuredEvent.title : featuredEvent.title;
  const featuredDescription = language === "AR" ? featuredEvent.descriptionAr ?? featuredEvent.description : featuredEvent.description;
  const featuredVenue = language === "AR" ? featuredEvent.venueAr ?? featuredEvent.venue : featuredEvent.venue;

  return (
    <ProtectedRoute>
      <SiteLayout>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={HERO_IMAGE}
              alt={language === "AR" ? "لوحة جدارية تحتفل بتراث مديونة الثقافي" : "Mural celebrating Mediouna's cultural heritage"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-32 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pb-40 lg:pt-40">
            <div className="max-w-3xl animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> {t("home.cultural_agenda")}
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                {t("home.heroTitle")} <span className="italic text-accent-soft">Mediouna</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
                {t("home.heroSubtitle")}
              </p>

              {/* Welcome Message */}
              <div className="mt-8 max-w-2xl">
                <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 p-6">
                  <h2 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                    {t("home.welcomeTitle")}
                  </h2>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    {t("home.welcomeSubtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 max-w-4xl animate-scale-in rounded-3xl bg-card p-3 shadow-elegant">
              <div className={`grid grid-cols-1 gap-2 md:grid-cols-[1.2fr_1fr_1fr_auto] ${isRTL ? "flex-row-reverse" : ""}`}>
                <SearchField icon={MapPin} label={t("home.searchWhere")} placeholder={t("home.searchPlaceholderWhere")} />
                <SearchField icon={Sparkles} label={t("home.searchWhat")} placeholder={t("home.searchPlaceholderWhat")} />
                <SearchField icon={CalendarIcon} label={t("home.searchWhen")} placeholder={t("home.searchPlaceholderWhen")} type="date" />
                <Button size="lg" className="h-full rounded-2xl px-6 text-base">
                  <Search className="mr-2 h-5 w-5" />
                  {t("home.search")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground">
                {t("home.browseByCategory")}
              </h2>
              <p className="mt-2 text-muted-foreground">{t("home.sevenWorlds")}</p>
            </div>
            <Link
              to="/map"
              className={`hidden items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted sm:inline-flex ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {t("home.seeFullCalendar")}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="flex flex-col items-center gap-3 rounded-2xl border border-input bg-card p-6 text-center transition-smooth hover:border-primary hover:bg-primary/5"
              >
                <span className="text-xs font-semibold text-foreground">{language === "AR" ? cat.labelAr : cat.labelFr}</span>
              </button>
            ))}
          </div>
        </section>

        {featuredEvent && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-card lg:grid-cols-2 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
              <div className="relative h-96 w-full overflow-hidden lg:h-full">
                <img
                  src={featuredEvent.image}
                  alt={featuredTitle}
                  className="h-full w-full object-cover transition-smooth hover:scale-105"
                />
                {featuredEvent.featured && (
                  <div className="absolute left-4 top-4 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                    {t("home.featured")}
                  </div>
                )}
              </div>

              <div className={`flex flex-col justify-center gap-6 p-8 ${isRTL ? "flex-col-reverse" : ""}`}>
                <div>
                  <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {getCategoryLabel(featuredEvent.category)}
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-foreground">{featuredTitle}</h3>
                </div>

                <p className="text-base text-muted-foreground">{featuredDescription}</p>

                <div className={`space-y-4 border-t border-border pt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">{fmtDate(featuredEvent.date)}</span>
                  </div>
                  <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">{featuredVenue}</span>
                  </div>
                </div>

                <Button size="lg" className="rounded-xl">
                  {t("home.reserveASeat")}
                  <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground">{t("home.upcomingInMediouna")}</h2>
              <p className="mt-2 text-muted-foreground">{t("home.handPickedEvents")}</p>
            </div>
            <Link
              to="/calendar"
              className={`hidden items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted sm:inline-flex ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {t("home.seeFullCalendar")}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </SiteLayout>
    </ProtectedRoute>
  );
}

function SearchField({
  icon: Icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: typeof MapPin;
  label: string;
  placeholder: string;
  type?: string;
}) {
  const { isRTL } = useLanguage();

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="relative flex items-center">
        <Icon className={`absolute ${isRTL ? "right-3" : "left-3"} h-5 w-5 text-muted-foreground`} />
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full bg-transparent py-2 ${isRTL ? "pr-10 pl-3" : "pl-10 pr-3"} text-sm outline-none placeholder:text-muted-foreground`}
        />
      </div>
    </div>
  );
}
