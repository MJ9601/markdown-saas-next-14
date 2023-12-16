import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { z } from "zod";
import config from "@/config";
import {
  AuthProvider,
  Role,
  loginUserWithCredentials,
  loginWithThirdParty,
} from "@/server/services/users";

const {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} = config;

interface User {
  email: string;
  id: string;
  image: string;
  name: string;
  access: string;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(8).max(32),
            })
            .safeParse(credentials);
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await loginUserWithCredentials({ email, password });
            if (!user) return null;
            return user;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.image = user.image;
        token.name = user.name;
        // @ts-ignore
        token.access = user.access;
      }

      return token;
    },
    async session({ session, token }) {
      session.user!.email = token.email;
      // @ts-ignore
      session.user!.id = token.id;
      // @ts-ignore
      session.user!.image = token.image;
      // @ts-ignore
      session.user!.name = token.name;
      // @ts-ignore
      session.user!.access = token.access;

      return session;
    },
    async signIn({ account, profile, user }) {
      if (account?.provider === "google" || account?.provider == "github") {
        const { name, email, picture: image, sub: authId } = profile!;
        if (name && email && authId) {
          const user = await loginWithThirdParty({
            name,
            email,
            image,
            authId,
            authProvider: account?.provider as AuthProvider,
            access: Role.normal,
          });
          if (!user) return false;
          return true;
        }
        return false;
      }

      return true;
    },
  },
});
