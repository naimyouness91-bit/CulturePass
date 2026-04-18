import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingRedirect,
});

function LandingRedirect() {
  // Redirect to login page as landing page
  return <Navigate to="/login" />;
}

function HomePage() {
  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
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
            <div className="mt-8 font-display text-3xl sm:text-4xl font-extrabold">
              <span className="text-emerald-400">Culture</span>
              <span className="text-orange-300">Pass</span>
            </div>
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
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Browse by category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Seven worlds of culture, all happening in your city.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap];
            return (
              <button
                key={cat.name}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-foreground">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          to="/event/$eventId"
          params={{ eventId: featuredEvent.id }}
          className="group relative grid overflow-hidden rounded-3xl bg-card shadow-elegant lg:grid-cols-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <img
              src={featuredEvent.image}
              alt={featuredEvent.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {featuredEvent.category}
            </span>
            <h3 className="font-display text-3xl font-semibold leading-tight text-foreground lg:text-4xl">
              {featuredEvent.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {featuredEvent.longDescription}
            </p>
            <dl className="grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">When</dt>
                <dd className="mt-1 font-medium text-foreground">{fmtDate(featuredEvent.date)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Where</dt>
                <dd className="mt-1 font-medium text-foreground">{featuredEvent.venue}</dd>
              </div>
            </dl>
            <div className="flex items-center gap-4">
              <Button size="lg" className="rounded-full">
                Reserve a seat <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {featuredEvent.registered.toLocaleString()} already going
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* EVENTS LIST */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Upcoming in Mediouna
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked events happening over the next weeks.
            </p>
          </div>
          <Link
            to="/calendar"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            See full calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.filter((e) => !e.featured).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </SiteLayout>
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
    <label className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-smooth hover:bg-muted/60">
      <Icon className="h-5 w-5 shrink-0 text-primary" />
      <span className="flex flex-col text-left">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
        />
      </span>
    </label>
  );
}
