import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: unknown;
      name: unknown;
      access: unknown;
    } & DefaultSession["user"];
  }
  interface User {
    access: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access: string;
    email: string;
    id: string;
    image?: string;
    name: string;
  }
}
