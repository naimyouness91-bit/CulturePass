import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Edit,
  Plus,
  QrCode,
  ScanLine,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — CulturePass" },
      { name: "description", content: "Manage events, attendees and QR check-ins for CulturePass Mediouna." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [tab, setTab] = useState<"events" | "create" | "scan">("events");
  const [query, setQuery] = useState("");

  const filtered = events.filter((e) => e.title.toLowerCase().includes(query.toLowerCase()));
  const totalAttendees = events.reduce((s, e) => s + e.registered, 0);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Organizer portal
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Admin dashboard
            </h1>
          </div>
          <Button onClick={() => setTab("create")} className="rounded-full">
            <Plus className="mr-2 h-4 w-4" /> New event
          </Button>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat icon={Calendar} label="Active events" value={events.length.toString()} />
          <Stat icon={Users} label="Total attendees" value={totalAttendees.toLocaleString()} />
          <Stat icon={CheckCircle2} label="Check-in rate" value="92%" />
          <Stat icon={BarChart3} label="Revenue" value="14 320 MAD" />
        </div>

        {/* TABS */}
        <div className="mt-8 flex gap-1 rounded-full bg-muted p-1">
          {(
            [
              { k: "events", label: "Events" },
              { k: "create", label: "Add / Edit" },
              { k: "scan", label: "QR Scanner" },
            ] as const
          ).map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-smooth sm:flex-none sm:px-6 ${
                tab === t.k
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          {tab === "events" && (
            <div className="overflow-hidden rounded-3xl bg-card shadow-card">
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Event</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Attendees</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((e) => {
                      const pct = Math.round((e.registered / e.capacity) * 100);
                      return (
                        <tr key={e.id} className="transition-smooth hover:bg-muted/40">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={e.image}
                                alt=""
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-foreground">{e.title}</p>
                                <p className="truncate text-xs text-muted-foreground">{e.venue}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                              {e.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(e.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {e.registered}/{e.capacity}
                              </span>
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full bg-gradient-primary"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                              Live
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-1">
                              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "create" && <EventForm />}
          {tab === "scan" && <QRScanner />}
        </div>
      </div>
    </SiteLayout>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function EventForm() {
  return (
    <form className="grid gap-6 rounded-3xl bg-card p-6 shadow-card sm:p-8 lg:grid-cols-2">
      <Field label="Event title" placeholder="e.g. Soirée Gnawa au Riad El Andalous" />
      <Field label="Category" placeholder="Music, Theatre, Festival…" />
      <Field label="Venue" placeholder="Riad El Andalous" />
      <Field label="Location" placeholder="Mediouna" />
      <Field label="Date" type="date" />
      <Field label="Time" type="time" />
      <Field label="Capacity" type="number" placeholder="120" />
      <Field label="Price" placeholder="80 MAD or Free" />
      <div className="lg:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Tell people what makes this event special…"
          className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="lg:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cover image
        </label>
        <div className="mt-2 flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground transition-smooth hover:border-primary hover:bg-primary/5">
          Drop an image or click to upload
        </div>
      </div>
      <div className="flex justify-end gap-3 lg:col-span-2">
        <Button variant="outline" type="button" className="rounded-full">
          Cancel
        </Button>
        <Button type="submit" className="rounded-full">
          Publish event
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function QRScanner() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-foreground shadow-elegant">
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-3/4 w-3/4">
            <div className="absolute -inset-4 animate-pulse rounded-3xl border-2 border-primary/40" />
            <div className="absolute inset-0 rounded-2xl border-4 border-primary/80" />
            {/* Corner brackets */}
            {["top-0 left-0 border-l-4 border-t-4", "top-0 right-0 border-r-4 border-t-4", "bottom-0 left-0 border-l-4 border-b-4", "bottom-0 right-0 border-r-4 border-b-4"].map((cls, i) => (
              <span key={i} className={`absolute h-8 w-8 border-primary-foreground ${cls}`} />
            ))}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 animate-pulse bg-gradient-to-r from-transparent via-primary to-transparent" />
            <ScanLine className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-primary-foreground/30" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground to-transparent p-6 text-center text-primary-foreground">
          <p className="font-display text-lg font-semibold">Point camera at QR pass</p>
          <p className="mt-1 text-sm text-primary-foreground/70">
            Tickets are validated instantly
          </p>
        </div>
      </div>

      <aside className="rounded-3xl bg-card p-6 shadow-card">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <QrCode className="h-5 w-5 text-primary" /> Recent check-ins
        </h2>
        <div className="mt-4 space-y-3">
          {[
            { name: "Salma B.", ref: "CP-2503", time: "Just now", ok: true },
            { name: "Karim O.", ref: "CP-2502", time: "1 min ago", ok: true },
            { name: "Anonymous", ref: "CP-1998", time: "3 min ago", ok: false },
            { name: "Lina M.", ref: "CP-2487", time: "5 min ago", ok: true },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-border p-3"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  c.ok ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {c.ref} · {c.time}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold uppercase ${
                  c.ok ? "text-accent" : "text-destructive"
                }`}
              >
                {c.ok ? "Valid" : "Denied"}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
