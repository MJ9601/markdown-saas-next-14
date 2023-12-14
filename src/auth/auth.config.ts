import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const needsLoggedIn = nextUrl.pathname.startsWith("/dashboard");

      if (needsLoggedIn) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard"));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
