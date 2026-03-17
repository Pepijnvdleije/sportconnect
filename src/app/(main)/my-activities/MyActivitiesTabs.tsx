"use client";

import { useState } from "react";
import { ActivityCard } from "@/components/activity/ActivityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  organized: any[];
  joined: any[];
};

export function MyActivitiesTabs({ organized, joined }: Props) {
  const [tab, setTab] = useState<"organized" | "joined">("organized");

  const activities = tab === "organized" ? organized : joined;

  return (
    <div>
      <div className="mb-4 flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setTab("organized")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "organized" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          )}
        >
          Organizing ({organized.length})
        </button>
        <button
          onClick={() => setTab("joined")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "joined" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          )}
        >
          Joined ({joined.length})
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}

        {activities.length === 0 && (
          <EmptyState
            title={tab === "organized" ? "No activities created yet" : "No activities joined yet"}
            description={tab === "organized" ? "Create your first activity!" : "Discover and join activities near you!"}
            action={
              <Link href={tab === "organized" ? "/activities/new" : "/activities"}>
                <Button>{tab === "organized" ? "Create Activity" : "Discover"}</Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
