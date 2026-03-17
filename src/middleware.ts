export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/(main)/:path*",
    "/activities/:path*",
    "/profile/:path*",
    "/my-activities/:path*",
  ],
};
