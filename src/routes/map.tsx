import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { events } from "@/data/events";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Cultural Map — CulturePass Mediouna" },
      {
        name: "description",
        content: "Explore Mediouna's cultural events on an interactive map.",
      },
      { property: "og:title", content: "Cultural Map of Mediouna" },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const [Map, setMap] = useState<null | typeof import("react-leaflet")>(null);
  const [selected, setSelected] = useState(events[0].id);

  useEffect(() => {
    let active = true;
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, L]) => {
      if (!active) return;
      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setMap(rl);
    });
    return () => {
      active = false;
    };
  }, []);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Cultural map of Mediouna
          </h1>
          <p className="mt-2 text-muted-foreground">
            {events.length} events happening across the city — click a pin or a card to explore.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* SIDEBAR LIST */}
          <aside className="max-h-[70vh] space-y-3 overflow-y-auto rounded-3xl bg-card p-4 shadow-card lg:max-h-[75vh]">
            {events.map((event) => {
              const active = selected === event.id;
              return (
                <button
                  key={event.id}
                  onClick={() => setSelected(event.id)}
                  className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition-smooth ${
                    active
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-transparent hover:border-border hover:bg-muted"
                  }`}
                >
                  <img
                    src={event.image}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                      {event.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <div className="mt-1.5 flex flex-col gap-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {fmtDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3" /> {event.venue}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* MAP */}
          <div className="h-[70vh] overflow-hidden rounded-3xl border border-border bg-muted shadow-card lg:h-[75vh]">
            {Map ? (
              <Map.MapContainer
                center={[33.4561, -7.5106]}
                zoom={14}
                scrollWheelZoom
                className="h-full w-full"
              >
                <Map.TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map((event) => (
                  <Map.Marker
                    key={event.id}
                    position={[event.lat, event.lng]}
                    eventHandlers={{ click: () => setSelected(event.id) }}
                  >
                    <Map.Popup>
                      <div className="space-y-1">
                        <strong>{event.title}</strong>
                        <div className="text-xs text-muted-foreground">{event.venue}</div>
                        <Link
                          to="/event/$eventId"
                          params={{ eventId: event.id }}
                          className="text-xs font-semibold text-primary underline"
                        >
                          View details →
                        </Link>
                      </div>
                    </Map.Popup>
                  </Map.Marker>
                ))}
              </Map.MapContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading map…
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
