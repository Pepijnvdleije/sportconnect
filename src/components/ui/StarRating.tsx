"use client";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
};

export function StarRating({ value, onChange, readonly = false, size = "md" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-0.5">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
            size === "sm" ? "text-lg" : "text-2xl"
          )}
        >
          <span className={star <= value ? "text-yellow-400" : "text-gray-300"}>
            &#9733;
          </span>
        </button>
      ))}
    </div>
  );
}
