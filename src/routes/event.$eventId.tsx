import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, MapPin, QrCode, Share2, Ticket, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getEventById } from "@/data/events";

export const Route = createFileRoute("/event/$eventId")({
  loader: ({ params }) => {
    const event = getEventById(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.event.title} — CulturePass Mediouna` },
          { name: "description", content: loaderData.event.description },
          { property: "og:title", content: loaderData.event.title },
          { property: "og:description", content: loaderData.event.description },
          { property: "og:image", content: loaderData.event.image },
        ]
      : [],
  }),
  notFoundComponent: () => {
    const { t } = useLanguage();
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-32 text-center">
          <h1 className="font-display text-4xl font-semibold">{t("event.notFound")}</h1>
          <p className="mt-3 text-muted-foreground">{t("event.notFoundMessage")}</p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/home">{t("common.backToEvents")}</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  },
  errorComponent: ({ error }) => {
    const { t } = useLanguage();
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-semibold">{t("event.errorTitle")}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{t("event.errorMessage")}</p>
        </div>
      </SiteLayout>
    );
  },
  component: EventDetailsPage,
});

function EventDetailsPage() {
  const { t, language, isRTL } = useLanguage();
  const { event } = Route.useLoaderData();
  const date = new Date(event.date);
  const fmtDate = date.toLocaleDateString(language === "AR" ? "ar-SA" : "fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const fmtTime = date.toLocaleTimeString(language === "AR" ? "ar-SA" : "en-GB", { hour: "2-digit", minute: "2-digit" });
  const pct = Math.round((event.registered / event.capacity) * 100);
  const title = language === "AR" ? event.titleAr ?? event.title : event.title;
  const description = language === "AR" ? event.descriptionAr ?? event.description : event.description;
  const venue = language === "AR" ? event.venueAr ?? event.venue : event.venue;
  const organizer = language === "AR" ? event.organizerAr ?? event.organizer : event.organizer;
  const category = language === "AR" ? event.categoryAr ?? event.category : event.category;
  const longDescription = language === "AR" ? event.longDescriptionAr ?? event.longDescription : event.longDescription;
  const culturalContext = language === "AR" ? event.culturalContextAr ?? event.culturalContext : event.culturalContext;

  return (
    <SiteLayout>
      <section className="relative isolate h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={event.image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
        <div className="absolute inset-x-0 top-0 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition-smooth hover:bg-background"
          >
            <ArrowLeft className="h-4 w-4" /> {t("event.details.back")}
          </Link>
        </div>
      </section>

      <section className="mx-auto -mt-32 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl bg-card p-6 shadow-elegant sm:p-10">
            <div className={`flex flex-wrap items-center gap-3 ${isRTL ? "justify-end" : ""}`}>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {category}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("event.details.organizedBy")} <strong className="text-foreground">{organizer}</strong>
              </span>
            </div>
            <h1 className={`mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl ${isRTL ? "text-right" : "text-left"}`}>
              {title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoTile icon={Calendar} label={t("event.details.date")} value={fmtDate} />
              <InfoTile icon={Clock} label={t("event.details.time")} value={fmtTime} />
              <InfoTile icon={MapPin} label={t("event.details.venue")} value={venue} />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-foreground">{t("event.details.aboutThisEvent")}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {longDescription}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-accent/30 bg-accent-soft/40 p-6">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                <span className="h-1.5 w-8 rounded-full bg-accent" /> {t("event.details.culturalContext")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                {culturalContext}
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="sticky top-24 rounded-3xl bg-card p-6 shadow-elegant">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold text-foreground">
                  {event.price}
                </span>
                <span className="text-sm text-muted-foreground">{t("event.details.perPerson")}</span>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    <Users className="mr-1.5 inline h-4 w-4" />
                    {event.registered.toLocaleString()} / {event.capacity.toLocaleString()} {t("event.details.seats")}
                  </span>
                  <span className="font-semibold text-primary">{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <Button size="lg" className="mt-6 w-full rounded-full text-base shadow-elegant">
                <Ticket className="mr-2 h-5 w-5" /> {t("event.details.reserveSeat")}
              </Button>
              <Button variant="outline" className="mt-2 w-full rounded-full">
                <Share2 className="mr-2 h-4 w-4" /> {t("event.details.share")}
              </Button>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-muted/60 p-4">
                <QrCode className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="text-xs leading-relaxed text-muted-foreground">
                  {t("event.details.qrPassInfo")}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
