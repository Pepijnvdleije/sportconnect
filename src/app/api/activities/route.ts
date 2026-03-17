import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { haversineDistance, boundingBox } from "@/lib/geo";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const sport = searchParams.get("sport");
  const groupType = searchParams.get("groupType");
  const lat = searchParams.get("lat") ? parseFloat(searchParams.get("lat")!) : null;
  const lng = searchParams.get("lng") ? parseFloat(searchParams.get("lng")!) : null;
  const radius = searchParams.get("radius") ? parseFloat(searchParams.get("radius")!) : null;
  const dateFrom = searchParams.get("dateFrom");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  // Build where clause
  const where: any = {
    startDateTime: { gte: new Date() },
  };

  if (sport) where.sportType = sport;
  if (groupType) where.groupType = groupType;
  if (dateFrom) where.startDateTime = { ...where.startDateTime, gte: new Date(dateFrom) };

  // Bounding box pre-filter for radius search
  if (lat !== null && lng !== null && radius) {
    const box = boundingBox(lat, lng, radius);
    where.startLat = { gte: box.minLat, lte: box.maxLat };
    where.startLng = { gte: box.minLng, lte: box.maxLng };
  }

  const activities = await prisma.activity.findMany({
    where,
    include: {
      organizer: { select: { id: true, name: true, profileImageUrl: true } },
      _count: {
        select: {
          participations: { where: { status: "JOINED" } },
        },
      },
    },
    orderBy: { startDateTime: "asc" },
    skip: (page - 1) * limit,
    take: limit + 1, // Take one extra to detect if there are more
  });

  // Refine with Haversine and add distance
  let results = activities.map((activity) => {
    const dist =
      lat !== null && lng !== null
        ? haversineDistance(lat, lng, activity.startLat, activity.startLng)
        : undefined;

    return {
      ...activity,
      distanceFromUser: dist !== undefined ? Math.round(dist * 10) / 10 : undefined,
    };
  });

  // Filter by exact radius
  if (lat !== null && lng !== null && radius) {
    results = results.filter(
      (a) => a.distanceFromUser !== undefined && a.distanceFromUser <= radius
    );
  }

  // Sort by distance if user location is available
  if (lat !== null && lng !== null) {
    results.sort((a, b) => (a.distanceFromUser ?? 0) - (b.distanceFromUser ?? 0));
  }

  const hasMore = results.length > limit;
  if (hasMore) results.pop();

  return NextResponse.json({ activities: results, hasMore, page });
}
