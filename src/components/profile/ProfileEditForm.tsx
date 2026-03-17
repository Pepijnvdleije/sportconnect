"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { updateProfile } from "@/actions/profile";
import type { UserProfile } from "@/types";

type ProfileEditFormProps = {
  user: UserProfile;
  onCancel: () => void;
  onSaved: () => void;
};

export function ProfileEditForm({ user, onCancel, onSaved }: ProfileEditFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      onSaved();
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}
        <Input
          id="name"
          name="name"
          label="Name"
          defaultValue={user.name}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="age"
            name="age"
            label="Age"
            type="number"
            min={13}
            max={120}
            defaultValue={user.age ?? ""}
          />
          <Select
            id="gender"
            name="gender"
            label="Gender"
            defaultValue={user.gender ?? ""}
            placeholder="Select..."
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            id="sportPreference"
            name="sportPreference"
            label="Sport preference"
            defaultValue={user.sportPreference ?? ""}
            placeholder="Select..."
            options={[
              { value: "run", label: "Running" },
              { value: "bike", label: "Cycling" },
              { value: "both", label: "Both" },
            ]}
          />
          <Input
            id="typicalPace"
            name="typicalPace"
            label="Typical pace"
            placeholder="e.g. 5:30 min/km"
            defaultValue={user.typicalPace ?? ""}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          label="Bio"
          placeholder="Tell others about yourself..."
          rows={3}
          maxLength={500}
          defaultValue={user.bio ?? ""}
        />
        <div className="flex gap-3">
          <Button type="submit" loading={loading}>
            Save changes
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
