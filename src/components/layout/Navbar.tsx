"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/activities" className="text-xl font-bold text-primary-600">
          SportConnect
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/activities" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Discover
          </Link>
          <Link href="/activities/new" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Create
          </Link>
          <Link href="/my-activities" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            My Activities
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session?.user && (
            <>
              <Link href="/profile">
                <Avatar name={session.user.name || "User"} size="sm" />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="hidden md:inline-flex"
              >
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
