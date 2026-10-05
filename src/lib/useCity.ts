import { useState, useEffect } from "react";
import { CITIES, getDefaultCity, getCityBySlug } from "@/data/cities";
import type { City } from "@/data/types";

const STORAGE_KEY = "dirtquit_selected_city";

export function useCity() {
  const [city, setCityState] = useState<City>(getDefaultCity());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedSlug = window.localStorage.getItem(STORAGE_KEY);
      if (storedSlug) {
        const found = getCityBySlug(storedSlug);
        if (found && found.isLive) {
          setCityState(found);
        }
      }
    } catch {
      // Safe fallback if localStorage is disabled or restricted
    }
  }, []);

  const selectCity = (citySlug: string) => {
    const found = getCityBySlug(citySlug);
    if (!found || !found.isLive) return;
    setCityState(found);
    try {
      window.localStorage.setItem(STORAGE_KEY, found.slug);
    } catch {
      // Safe fallback
    }
  };

  return {
    city,
    isClient,
    allCities: CITIES,
    selectCity,
  };
}
