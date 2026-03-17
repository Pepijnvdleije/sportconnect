"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Filters = {
  sport: string;
  groupType: string;
  radius: string;
};

type ActivityFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export function ActivityFilters({ filters, onChange }: ActivityFiltersProps) {
  const sportOptions = [
    { value: "", label: "All" },
    { value: "RUN", label: "Running" },
    { value: "BIKE", label: "Cycling" },
  ];

  const groupOptions = [
    { value: "", label: "All" },
    { value: "MIXED", label: "Mixed" },
    { value: "MALE", label: "Men" },
    { value: "FEMALE", label: "Women" },
  ];

  const radiusOptions = [
    { value: "", label: "Any distance" },
    { value: "5", label: "5 km" },
    { value: "10", label: "10 km" },
    { value: "25", label: "25 km" },
    { value: "50", label: "50 km" },
  ];

  return (
    <div className="space-y-3">
      {/* Sport filter */}
      <div className="flex flex-wrap gap-2">
        {sportOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={filters.sport === opt.value ? "primary" : "outline"}
            size="sm"
            onClick={() => onChange({ ...filters, sport: opt.value })}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {/* Group & Radius */}
      <div className="flex flex-wrap gap-2">
        <select
          value={filters.groupType}
          onChange={(e) => onChange({ ...filters, groupType: e.target.value })}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        >
          {groupOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={filters.radius}
          onChange={(e) => onChange({ ...filters, radius: e.target.value })}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        >
          {radiusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
