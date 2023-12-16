import config from "@/config";
import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { jwtAndSessionCallbacks } from "./callbacks";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const restrictedOnLoggedIn = ["/login", "/signup"].includes(
        nextUrl.pathname
      );

      const needsLoggedIn = nextUrl.pathname.startsWith("/new");
      const needsAdminAccess = nextUrl.pathname.startsWith("/dashboard");
      const needsPremiumAccess = nextUrl.pathname.startsWith("/premium");

      if (needsLoggedIn) {
        if (isLoggedIn) return true;
        return false;
      } else if (needsAdminAccess) {
        if (isLoggedIn && auth?.user!.access == "admin") return true;
        return false;
      } else if (needsPremiumAccess) {
        if (isLoggedIn && auth?.user!.access == "premium") return true;
        return false;
      }

      if (restrictedOnLoggedIn) {
        if (!isLoggedIn) return true;
        return NextResponse.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    ...jwtAndSessionCallbacks,
  },
  secret: config.authSecret,
  providers: [],
} satisfies NextAuthConfig;
