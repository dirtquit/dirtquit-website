import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { AREAS, selectBookingArea } from "@/lib/dirtquit";
import { Container, SectionHeading } from "./shared";

const ZONES = [
  { id: "all", label: "All Localities (32)" },
  { id: "east", label: "East (Whitefield, Bellandur...)" },
  { id: "south", label: "South (Koramangala, HSR, JP Nagar...)" },
  { id: "north", label: "North (Hebbal, Yelahanka, Hennur...)" },
  { id: "central_west", label: "Central & West (Indiranagar, Malleshwaram...)" },
];

const ZONE_MAP: Record<string, string[]> = {
  east: [
    "Whitefield",
    "Marathahalli",
    "Brookefield",
    "Hoodi",
    "KR Puram",
    "Mahadevapura",
    "Bellandur",
    "Sarjapur Road",
  ],
  south: [
    "HSR Layout",
    "Koramangala",
    "Electronic City",
    "Bommanahalli",
    "BTM Layout",
    "Jayanagar",
    "JP Nagar",
    "Banashankari",
    "Kanakapura Road",
    "Bannerghatta Road",
    "Hosur Road",
  ],
  north: [
    "Hebbal",
    "Yelahanka",
    "RT Nagar",
    "Kalyan Nagar",
    "Banaswadi",
    "Thanisandra",
    "Nagawara",
    "Hennur",
    "Devanahalli",
  ],
  central_west: ["Indiranagar", "CV Raman Nagar", "Rajajinagar", "Malleshwaram"],
};

export function AreasServed() {
  const [query, setQuery] = useState("");
  const [activeZone, setActiveZone] = useState("all");

  const filteredAreas = AREAS.filter((area) => {
    const matchesQuery = area.toLowerCase().includes(query.toLowerCase());
    if (activeZone === "all") return matchesQuery;
    const zoneList = ZONE_MAP[activeZone] || [];
    return matchesQuery && zoneList.includes(area);
  });

  return (
    <section id="areas" className="section-pad bg-background">
      <Container>
        <SectionHeading
          eyebrow="Coverage Across the City"
          title="Cleaning Services Across Bengaluru"
          subtitle="Dirt Quit provides professional cleaning services for homes, apartments, offices and commercial spaces across Bengaluru."
        />

        {/* Search & Filter Bar */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your Bengaluru locality (e.g. HSR Layout, Whitefield, Bellandur)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/70 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setActiveZone(z.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  activeZone === z.id
                    ? "bg-navy text-white shadow-xs"
                    : "bg-secondary text-secondary-foreground hover:bg-border"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        {/* Localities Grid */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredAreas.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => selectBookingArea(area)}
              className="group flex items-center justify-between rounded-xl border border-border/80 bg-card p-3 text-left shadow-2xs transition-all hover:border-primary/50 hover:bg-secondary/40 hover:shadow-xs active:scale-98"
            >
              <span className="flex items-center gap-2 truncate text-xs font-bold text-navy group-hover:text-primary">
                <MapPin className="size-3 text-primary shrink-0" />
                <span className="truncate">{area}</span>
              </span>
              <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Book →
              </span>
            </button>
          ))}
        </div>

        {filteredAreas.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Don't see your specific neighborhood? We cover most connected parts of Greater
            Bengaluru.{" "}
            <a href="#book" className="font-bold text-primary hover:underline">
              Enter your address in the booking form
            </a>{" "}
            or message us on WhatsApp!
          </div>
        ) : (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Click any area to pre-fill it into the booking form.
          </p>
        )}
      </Container>
    </section>
  );
}
