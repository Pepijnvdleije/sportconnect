import { ActivityForm } from "@/components/activity/ActivityForm";
import { PageHeader } from "@/components/layout/PageHeader";

export default function NewActivityPage() {
  return (
    <div>
      <PageHeader title="Create Activity" backButton />
      <ActivityForm />
    </div>
  );
}
