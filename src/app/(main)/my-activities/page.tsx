import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ActivityCard } from "@/components/activity/ActivityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { MyActivitiesTabs } from "./MyActivitiesTabs";

export default async function MyActivitiesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const organized = await prisma.activity.findMany({
    where: { organizerId: session.user.id },
    include: {
      organizer: { select: { id: true, name: true, profileImageUrl: true } },
      _count: {
        select: { participations: { where: { status: "JOINED" } } },
      },
    },
    orderBy: { startDateTime: "desc" },
  });

  const joined = await prisma.activity.findMany({
    where: {
      participations: {
        some: {
          userId: session.user.id,
          status: "JOINED",
        },
      },
      organizerId: { not: session.user.id },
    },
    include: {
      organizer: { select: { id: true, name: true, profileImageUrl: true } },
      _count: {
        select: { participations: { where: { status: "JOINED" } } },
      },
    },
    orderBy: { startDateTime: "desc" },
  });

  return (
    <div>
      <PageHeader title="My Activities" />
      <MyActivitiesTabs organized={organized} joined={joined} />
    </div>
  );
}
