import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "default" | "sport" | "group";
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-blue-100 text-blue-700": variant === "sport",
          "bg-purple-100 text-purple-700": variant === "group",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
