"use client";

import { useRouter } from "next/navigation";

type PageHeaderProps = {
  title: string;
  backButton?: boolean;
  action?: React.ReactNode;
};

export function PageHeader({ title, backButton, action }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {backButton && (
          <button
            onClick={() => router.back()}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
