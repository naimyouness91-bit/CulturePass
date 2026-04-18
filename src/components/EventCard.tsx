import { Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import type { CultureEvent } from "@/data/events";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function EventCard({ event }: { event: CultureEvent }) {
  return (
    <Link
      to="/event/$eventId"
      params={{ eventId: event.id }}
      className="group block overflow-hidden rounded-2xl bg-card shadow-card card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
          {event.category}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
          {event.price}
        </span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-foreground transition-smooth group-hover:text-primary">
          {event.title}
        </h3>
        <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> {fmtDate(event.date)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" /> {event.venue}
          </span>
        </div>
      </div>
    </Link>
  );
}
