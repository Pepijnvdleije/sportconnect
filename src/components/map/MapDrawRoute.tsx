"use client";

type MapDrawRouteProps = {
  distance: number;
  onDistanceChange: (distance: number) => void;
  onRouteChange: (geojson: string | null) => void;
};

export function MapDrawRoute({ distance, onDistanceChange, onRouteChange }: MapDrawRouteProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
      <div className="flex flex-col items-center text-center">
        <span className="text-2xl">&#x1F3C3;</span>
        <p className="mt-2 text-sm font-medium text-gray-600">Route Drawing</p>
        <p className="text-xs text-gray-400">
          Interactive route drawing will be available with Mapbox integration
        </p>
        <div className="mt-3 w-full max-w-xs">
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
            Distance (km)
          </label>
          <input
            id="distance"
            type="number"
            step="0.1"
            min="0.1"
            value={distance || ""}
            onChange={(e) => onDistanceChange(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Enter distance in km"
          />
        </div>
      </div>
    </div>
  );
}
