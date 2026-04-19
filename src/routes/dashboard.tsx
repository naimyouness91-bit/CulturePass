import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Calendar, MapPin, QrCode, Settings, Ticket, User } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { events, categories } from "@/data/events";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Bookings — CulturePass" },
      { name: "description", content: "Manage your cultural bookings, QR passes and notifications." },
    ],
  }),
  component: DashboardPage,
});

const myBookings = events.slice(0, 3).map((e, i) => ({
  ...e,
  bookingRef: `CP-${(2503 + i).toString().padStart(4, "0")}`,
  status: i === 0 ? "upcoming" : i === 1 ? "upcoming" : "past",
}));

const notifications = [
  { id: 1, title: "Your QR pass is ready", body: "Festival National de Tbourida — 12 June", time: "2h ago", unread: true },
  { id: 2, title: "New event near you", body: "Soirée Gnawa au Riad El Andalous added", time: "Yesterday", unread: true },
  { id: 3, title: "Reminder", body: "Théâtre — Les Voix du Sud starts in 3 days", time: "3 days ago", unread: false },
];

function DashboardPage() {
  const { t, language, isRTL } = useLanguage();

  const getCategoryLabel = (event: typeof events[number]) => {
    const category = categories.find((cat) => cat.name === event.category);
    return language === "AR" ? category?.labelAr ?? event.category : category?.labelFr ?? event.category;
  };

  const getEventTitle = (event: typeof events[number]) =>
    language === "AR" ? event.titleAr ?? event.title : event.title;

  const getEventVenue = (event: typeof events[number]) =>
    language === "AR" ? event.venueAr ?? event.venue : event.venue;

  const localizedNotifications = [
    {
      id: 1,
      title: language === "AR" ? "تم تجهيز تذكرة QR الخاصة بك" : "Your QR pass is ready",
      body: language === "AR" ? "مهرجان الطبوريدة الوطني — 12 يونيو" : "Festival National de Tbourida — 12 June",
      time: language === "AR" ? "قبل ساعتين" : "2h ago",
      unread: true,
    },
    {
      id: 2,
      title: language === "AR" ? "تم إضافة حدث جديد بالقرب منك" : "New event near you",
      body: language === "AR" ? "أمسية غناوة في رياض الأندلس تمت إضافتها" : "Soirée Gnawa au Riad El Andalous added",
      time: language === "AR" ? "بالأمس" : "Yesterday",
      unread: true,
    },
    {
      id: 3,
      title: language === "AR" ? "تذكير" : "Reminder",
      body: language === "AR" ? "المسرحية — أصوات الجنوب تبدأ بعد 3 أيام" : "Théâtre — Les Voix du Sud starts in 3 days",
      time: language === "AR" ? "قبل 3 أيام" : "3 days ago",
      unread: false,
    },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15 text-2xl font-semibold backdrop-blur">
              YA
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
                {t("dashboard.welcomeBack")}
              </p>
              <h1 className="font-display text-2xl font-semibold sm:text-3xl">Yassine Amrani</h1>
              <p className="mt-1 text-sm text-primary-foreground/85">
                {t("dashboard.memberSince")} 2024 · {myBookings.length} {language === "AR" ? "حجز" : "bookings"}
              </p>
            </div>
          </div>
          <Button variant="secondary" className="rounded-full">
            <Settings className="mr-2 h-4 w-4" /> {t("dashboard.editProfile")}
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* BOOKINGS */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground">{t("dashboard.myBookings")}</h2>
            <div className="mt-4 space-y-4">
              {myBookings.map((b) => (
                <div
                  key={b.id}
                  className="overflow-hidden rounded-3xl bg-card shadow-card transition-smooth hover:shadow-elegant"
                >
                  <div className="grid gap-4 sm:grid-cols-[160px_1fr_auto] sm:items-center">
                    <img
                      src={b.image}
                      alt=""
                      className="h-32 w-full object-cover sm:h-full"
                    />
                    <div className="px-5 py-4 sm:px-2 sm:py-5">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                          {getCategoryLabel(b)}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            b.status === "past"
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {b.status === "past" ? t("dashboard.statusPast") : t("dashboard.statusUpcoming")}
                        </span>
                      </div>
                      <Link
                        to="/event/$eventId"
                        params={{ eventId: b.id }}
                        className="mt-2 block font-display text-lg font-semibold text-foreground hover:text-primary"
                      >
                        {getEventTitle(b)}
                      </Link>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(b.date).toLocaleDateString(language === "AR" ? "ar-SA" : "fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" /> {getEventVenue(b)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Ticket className="h-3.5 w-3.5" /> {t("dashboard.bookingReference")} {b.bookingRef}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 border-t border-border p-5 sm:border-l sm:border-t-0">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-foreground p-2">
                        <QrPattern />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("dashboard.scanAtEntry")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <aside>
            <div className="rounded-3xl bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                  <Bell className="h-5 w-5 text-primary" /> {t("dashboard.notifications")}
                </h2>
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {localizedNotifications.filter((n) => n.unread).length}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {localizedNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-2xl border p-4 transition-smooth ${
                      n.unread
                        ? "border-primary/20 bg-primary/5"
                        : "border-border bg-background/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                      {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {n.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-3xl bg-card p-6 shadow-card">
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                <User className="h-5 w-5 text-primary" /> {t("dashboard.profile")}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t("dashboard.email")}</dt>
                  <dd className="font-medium text-foreground">y.amrani@example.ma</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t("dashboard.phone")}</dt>
                  <dd className="font-medium text-foreground">+212 6•• ••• 412</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t("dashboard.city")}</dt>
                  <dd className="font-medium text-foreground">Mediouna</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function QrPattern() {
  // Stylised QR-like pattern (mock)
  const cells = Array.from({ length: 49 }, (_, i) => (i * 73) % 7 < 4);
  return (
    <div className="grid h-full w-full grid-cols-7 gap-[1px]">
      {cells.map((on, i) => (
        <span
          key={i}
          className={on ? "bg-primary-foreground" : "bg-transparent"}
        />
      ))}
    </div>
  );
}
