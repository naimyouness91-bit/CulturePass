import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar as CalendarIcon,
  Drama,
  Landmark,
  MapPin,
  Music2,
  Palette,
  PartyPopper,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { events, featuredEvent, categories, HERO_IMAGE } from "@/data/events";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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

const iconMap = {
  Music2,
  Drama,
  PartyPopper,
  Users,
  Landmark,
  Palette,
  BookOpen,
} as const;

function HomePage() {
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <ProtectedRoute>
      <SiteLayout>
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={HERO_IMAGE}
              alt="Mural celebrating Mediouna's cultural heritage"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-32 pt-24 sm:px-6 sm:pt-32 lg:px-8 lg:pb-40 lg:pt-40">
            <div className="max-w-3xl animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> The cultural agenda of Mediouna
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                Live the soul of <span className="italic text-accent-soft">Mediouna</span>, one event
                at a time.
              </h1>
              <p className="mt-6 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
                From gnawa nights and tbourida festivals to community gatherings and contemporary
                theatre — discover and book the experiences shaping our city.
              </p>
            </div>

            {/* SEARCH */}
            <div className="mt-10 max-w-4xl animate-scale-in rounded-3xl bg-card p-3 shadow-elegant">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.2fr_1fr_1fr_auto]">
                <SearchField icon={MapPin} label="Where" placeholder="Mediouna, neighborhood…" />
                <SearchField icon={Sparkles} label="What" placeholder="Music, festival, theatre…" />
                <SearchField icon={CalendarIcon} label="When" placeholder="Add date" type="date" />
                <Button size="lg" className="h-full rounded-2xl px-6 text-base">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground">
                Browse by category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Seven worlds of culture, all happening in your city.
              </p>
            </div>
            <Link
              to="/map"
              className="hidden items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted sm:inline-flex"
            >
              See full calendar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon as keyof typeof iconMap] || Users;
              return (
                <button
                  key={cat.id}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-input bg-card p-6 text-center transition-smooth hover:border-primary hover:bg-primary/5"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURED EVENT */}
        {featuredEvent && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-card lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-96 w-full overflow-hidden lg:h-full">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="h-full w-full object-cover transition-smooth hover:scale-105"
                />
                {featuredEvent.featured && (
                  <div className="absolute left-4 top-4 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center gap-6 p-8">
                <div>
                  <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                    {featuredEvent.category}
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-foreground">
                    {featuredEvent.title}
                  </h3>
                </div>

                <p className="text-base text-muted-foreground">{featuredEvent.description}</p>

                <div className="space-y-4 border-t border-border pt-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">
                      {fmtDate(featuredEvent.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">{featuredEvent.venue}</span>
                  </div>
                </div>

                <Button size="lg" className="rounded-xl">
                  Reserve a seat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* UPCOMING EVENTS */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground">
                Upcoming in Mediouna
              </h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked events happening over the next weeks.
              </p>
            </div>
            <Link
              to="/calendar"
              className="hidden items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-muted sm:inline-flex"
            >
              See full calendar
              <ArrowRight className="h-4 w-4" />
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
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent py-2 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}

// Import Calendar icon separately for JSX rendering
import { Calendar } from "lucide-react";
