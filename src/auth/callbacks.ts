import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth/types";

export const jwtAndSessionCallbacks = {
  async jwt({ token, user }: any) {
    if (user) {
      token.email = user.email!;
      token.id = user.id;
      token.image = user.image!;
      token.name = user.name!;
      token.access = user.access;
    }

    return token;
  },
  async session({ session, token }: any) {
    session.user!.email = token.email;
    session.user!.id = token.id;
    session.user!.image = token.image as string;
    session.user!.name = token.name;
    session.user!.access = token.access;

    return session;
  },
};
