"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { MapLocationPicker } from "@/components/map/MapLocationPicker";
import { MapDrawRoute } from "@/components/map/MapDrawRoute";
import { createActivity } from "@/actions/activities";
import { ROTTERDAM_CENTER } from "@/lib/constants";

export function ActivityForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lat, setLat] = useState(ROTTERDAM_CENTER.lat);
  const [lng, setLng] = useState(ROTTERDAM_CENTER.lng);
  const [locationName, setLocationName] = useState("");
  const [distance, setDistance] = useState(0);
  const [routeGeoJSON, setRouteGeoJSON] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("startLat", lat.toString());
    formData.set("startLng", lng.toString());
    formData.set("distance", distance.toString());
    formData.set("locationName", locationName);
    if (routeGeoJSON) formData.set("routeGeoJSON", routeGeoJSON);

    const result = await createActivity(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  // Get minimum datetime (now) for the datetime-local input
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Basic Info</h3>
          <Input
            id="title"
            name="title"
            label="Activity title"
            placeholder="e.g. Morning run along the Maas"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              id="sportType"
              name="sportType"
              label="Sport"
              options={[
                { value: "RUN", label: "Running" },
                { value: "BIKE", label: "Cycling" },
              ]}
              required
            />
            <Select
              id="groupType"
              name="groupType"
              label="Group"
              options={[
                { value: "MIXED", label: "Mixed" },
                { value: "MALE", label: "Men only" },
                { value: "FEMALE", label: "Women only" },
              ]}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="startDateTime"
              name="startDateTime"
              label="Start date & time"
              type="datetime-local"
              min={minDateTime}
              required
            />
            <Input
              id="pace"
              name="pace"
              label="Pace (optional)"
              placeholder="e.g. 5:30 min/km"
            />
          </div>
          <Input
            id="maxParticipants"
            name="maxParticipants"
            label="Max participants (optional)"
            type="number"
            min={2}
            placeholder="Leave empty for unlimited"
          />
          <Textarea
            id="description"
            name="description"
            label="Description (optional)"
            placeholder="Describe your activity..."
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Location</h3>
          <MapLocationPicker
            lat={lat}
            lng={lng}
            onLocationChange={(newLat, newLng) => {
              setLat(newLat);
              setLng(newLng);
            }}
            locationName={locationName}
            onLocationNameChange={setLocationName}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Route & Distance</h3>
          <MapDrawRoute
            distance={distance}
            onDistanceChange={setDistance}
            onRouteChange={setRouteGeoJSON}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Create Activity
        </Button>
      </form>
    </Card>
  );
}
