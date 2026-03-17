"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import type { UserProfile } from "@/types";

type Props = {
  user: UserProfile;
  activityCount: number;
  averageRating: number;
};

export function ProfilePageClient({ user, activityCount, averageRating }: Props) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  if (editing) {
    return (
      <div>
        <PageHeader title="Edit Profile" backButton />
        <ProfileEditForm
          user={user}
          onCancel={() => setEditing(false)}
          onSaved={() => {
            setEditing(false);
            router.refresh();
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My Profile"
        action={
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            Edit
          </Button>
        }
      />
      <ProfileCard user={user} activityCount={activityCount} averageRating={averageRating} />
      <div className="mt-4 md:hidden">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
