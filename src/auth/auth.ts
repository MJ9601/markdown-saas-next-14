import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import config from "@/config";

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
          //  const user = await
          return {
            email: "user@mail.com",
            image: "/",
            name: "jane",
            id: "jdjsdn",
          };
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
