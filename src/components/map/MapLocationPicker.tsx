"use client";

import { Input } from "@/components/ui/Input";
import { ROTTERDAM_CENTER } from "@/lib/constants";

type MapLocationPickerProps = {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
  locationName: string;
  onLocationNameChange: (name: string) => void;
};

export function MapLocationPicker({
  lat,
  lng,
  onLocationChange,
  locationName,
  onLocationNameChange,
}: MapLocationPickerProps) {
  return (
    <div className="space-y-3">
      <Input
        id="locationName"
        label="Location name"
        placeholder="e.g. Kralingse Bos, Rotterdam"
        value={locationName}
        onChange={(e) => onLocationNameChange(e.target.value)}
      />
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <span>&#x1F4CD;</span>
          <span>Set start location coordinates</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="startLat"
            label="Latitude"
            type="number"
            step="0.0001"
            value={lat}
            onChange={(e) => onLocationChange(parseFloat(e.target.value) || ROTTERDAM_CENTER.lat, lng)}
          />
          <Input
            id="startLng"
            label="Longitude"
            type="number"
            step="0.0001"
            value={lng}
            onChange={(e) => onLocationChange(lat, parseFloat(e.target.value) || ROTTERDAM_CENTER.lng)}
          />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Tip: Find coordinates on Google Maps by right-clicking a location
        </p>
      </div>
    </div>
  );
}
