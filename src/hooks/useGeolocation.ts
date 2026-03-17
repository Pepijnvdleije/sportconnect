"use client";

import { useState, useEffect } from "react";
import { ROTTERDAM_CENTER } from "@/lib/constants";

type GeoState = {
  lat: number;
  lng: number;
  loading: boolean;
  error: string | null;
};

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({
    lat: ROTTERDAM_CENTER.lat,
    lng: ROTTERDAM_CENTER.lng,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({ ...prev, loading: false, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      () => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Location access denied",
        }));
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  return state;
}
