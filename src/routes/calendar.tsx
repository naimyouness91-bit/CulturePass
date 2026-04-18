import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — CulturePass Mediouna" },
      {
        name: "description",
        content: "Browse Mediouna's cultural events by day and week in a clean calendar view.",
      },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const [cursor, setCursor] = useState(new Date(2025, 4, 1)); // May 2025
  const [selected, setSelected] = useState<Date>(new Date(2025, 4, 17));

  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  for (let d = gridStart; d <= gridEnd; d = new Date(d.getTime() + 86400000)) {
    days.push(new Date(d));
  }

  const dayEvents = (date: Date) => events.filter((e) => isSameDay(new Date(e.date), date));
  const selectedEvents = dayEvents(selected);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Cultural calendar
            </h1>
            <p className="mt-2 text-muted-foreground">
              Plan your weeks around the events that matter to you.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-card p-1.5 shadow-soft">
            <button
              onClick={() => setCursor(subMonths(cursor, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="min-w-[140px] text-center text-sm font-semibold text-foreground">
              {format(cursor, "MMMM yyyy")}
            </span>
            <button
              onClick={() => setCursor(addMonths(cursor, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* CALENDAR GRID */}
          <div className="rounded-3xl bg-card p-4 shadow-card sm:p-6">
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const inMonth = isSameMonth(day, cursor);
                const isSel = isSameDay(day, selected);
                const evts = dayEvents(day);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelected(day)}
                    className={`group relative flex aspect-square flex-col items-start gap-1 rounded-xl p-1.5 text-left transition-smooth sm:p-2 ${
                      isSel
                        ? "bg-gradient-primary text-primary-foreground shadow-soft"
                        : inMonth
                        ? "hover:bg-muted"
                        : "text-muted-foreground/40 hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold sm:text-sm ${
                        isSel ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {evts.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-0.5">
                        {evts.slice(0, 3).map((e) => (
                          <span
                            key={e.id}
                            className={`h-1.5 w-1.5 rounded-full ${
                              isSel ? "bg-primary-foreground" : "bg-primary"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DAY DETAILS */}
          <aside className="rounded-3xl bg-card p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {format(selected, "EEEE")}
            </p>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {format(selected, "d MMMM yyyy")}
            </h2>
            <div className="mt-5 space-y-3">
              {selectedEvents.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No events scheduled. Pick another day from the calendar.
                </div>
              )}
              {selectedEvents.map((e) => (
                <Link
                  key={e.id}
                  to="/event/$eventId"
                  params={{ eventId: e.id }}
                  className="block rounded-2xl border border-border p-4 transition-smooth hover:border-primary hover:shadow-soft"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {e.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">{e.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(e.date), "HH:mm")} · {e.venue}
                  </p>
                </Link>
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full rounded-full">
              Subscribe to calendar
            </Button>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
