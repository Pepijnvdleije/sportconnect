"use client";

import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActivityCard } from "@/components/activity/ActivityCard";
import { ActivityFilters } from "@/components/activity/ActivityFilters";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { useGeolocation } from "@/hooks/useGeolocation";
import Link from "next/link";

type Filters = {
  sport: string;
  groupType: string;
  radius: string;
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    sport: "",
    groupType: "",
    radius: "",
  });
  const geo = useGeolocation();

  const fetchActivities = useCallback(
    async (pageNum: number, append = false) => {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.sport) params.set("sport", filters.sport);
      if (filters.groupType) params.set("groupType", filters.groupType);
      if (geo.lat && geo.lng) {
        params.set("lat", geo.lat.toString());
        params.set("lng", geo.lng.toString());
      }
      if (filters.radius) params.set("radius", filters.radius);
      params.set("page", pageNum.toString());

      const res = await fetch(`/api/activities?${params}`);
      const data = await res.json();

      if (append) {
        setActivities((prev) => [...prev, ...data.activities]);
      } else {
        setActivities(data.activities);
      }
      setHasMore(data.hasMore);
      setLoading(false);
    },
    [filters, geo.lat, geo.lng]
  );

  useEffect(() => {
    setPage(1);
    fetchActivities(1);
  }, [fetchActivities]);

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchActivities(nextPage, true);
  }

  return (
    <div>
      <PageHeader
        title="Discover Activities"
        action={
          <Link href="/activities/new">
            <Button size="sm">+ Create</Button>
          </Link>
        }
      />

      <ActivityFilters filters={filters} onChange={setFilters} />

      <div className="mt-4 space-y-3">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}

        {loading && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}

        {!loading && activities.length === 0 && (
          <EmptyState
            icon="&#x1F3C3;"
            title="No activities found"
            description="Try adjusting your filters or create the first activity!"
            action={
              <Link href="/activities/new">
                <Button>Create Activity</Button>
              </Link>
            }
          />
        )}

        {hasMore && !loading && (
          <div className="flex justify-center py-4">
            <Button variant="outline" onClick={loadMore}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
