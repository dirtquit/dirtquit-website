import type { City } from "./types";

export const CITIES: City[] = [
  {
    slug: "bangalore",
    name: "Bengaluru",
    altName: "Bangalore",
    state: "Karnataka",
    isLive: true,
    isDefault: true,
    zones: [
      {
        id: "east",
        label: "East (Whitefield, Bellandur...)",
        areas: [
          "Whitefield",
          "Marathahalli",
          "Brookefield",
          "Hoodi",
          "KR Puram",
          "Mahadevapura",
          "Bellandur",
          "Sarjapur Road",
        ],
      },
      {
        id: "south",
        label: "South (Koramangala, HSR, JP Nagar...)",
        areas: [
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
      },
      {
        id: "north",
        label: "North (Hebbal, Yelahanka, Hennur...)",
        areas: [
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
      },
      {
        id: "central_west",
        label: "Central & West (Indiranagar, Malleshwaram...)",
        areas: ["Indiranagar", "CV Raman Nagar", "Rajajinagar", "Malleshwaram"],
      },
    ],
    localities: [
      "Whitefield",
      "Marathahalli",
      "Brookefield",
      "Hoodi",
      "KR Puram",
      "Mahadevapura",
      "Bellandur",
      "Sarjapur Road",
      "HSR Layout",
      "Koramangala",
      "Electronic City",
      "Bommanahalli",
      "BTM Layout",
      "Indiranagar",
      "CV Raman Nagar",
      "Hebbal",
      "Yelahanka",
      "Jayanagar",
      "JP Nagar",
      "Banashankari",
      "Rajajinagar",
      "Malleshwaram",
      "RT Nagar",
      "Kalyan Nagar",
      "Banaswadi",
      "Thanisandra",
      "Nagawara",
      "Hennur",
      "Devanahalli",
      "Kanakapura Road",
      "Bannerghatta Road",
      "Hosur Road",
    ],
  },
];

export function getCities(): City[] {
  return CITIES;
}

export function getDefaultCity(): City {
  return CITIES.find((c) => c.isDefault) || CITIES[0]!;
}

export function getCityBySlug(slug: string): City | undefined {
  const normalized = (slug || "").toLowerCase().trim();
  return CITIES.find(
    (c) => c.slug === normalized || c.name.toLowerCase() === normalized || c.altName.toLowerCase() === normalized,
  );
}
