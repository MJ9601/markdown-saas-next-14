import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import config from "@/config";
import { loginUserWithCredentials } from "@/server/services/users";

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
          // @ts-ignore
          const user = await loginUserWithCredentials(credentials);
          if (!user) return null;
          console.log(user);
          return user;
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
  },
});
