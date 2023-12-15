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

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          // @ts-ignore
          const user = await loginUserWithCredentials(credentials);
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
});
