"use client";

type MapViewProps = {
  lat: number;
  lng: number;
  routeGeoJSON?: string | null;
  className?: string;
};

export function MapView({ lat, lng, routeGeoJSON, className = "" }: MapViewProps) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-gray-100 ${className}`}>
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-2 text-3xl">&#x1F5FA;</div>
        <p className="text-sm font-medium text-gray-600">Map Preview</p>
        <p className="mt-1 text-xs text-gray-400">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
        {routeGeoJSON && (
          <p className="mt-1 text-xs text-primary-500">Route available</p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          Add a Mapbox token to enable interactive maps
        </p>
      </div>
    </div>
  );
}
