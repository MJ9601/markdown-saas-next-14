import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { jwtAndSessionCallbacks } from "./callbacks";
import { z } from "zod";
import config from "@/config";
import {
  AuthProvider,
  Role,
  getMe,
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

export const { auth, signIn, signOut, handlers } = NextAuth({
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
      async profile(profile) {
        const user = await getMe(profile.email);
        if (user) {
          return {
            access: user.access,
            id: user._id,
            name: user.name,
            email: user.email,
            image: profile.picture,
          };
        }
        return profile;
      },
    }),
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  callbacks: {
    ...jwtAndSessionCallbacks,
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
