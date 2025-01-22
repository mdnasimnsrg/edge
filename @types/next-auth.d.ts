// import { type DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: { new: string; avatar: string } & DefaultSession["user"];
//   }
// }

interface NewUser {
  id: string;
  token: string;
  name: string;
  organizationName: string;
  phone: string;
  role: string;
  picture: string;
}

import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: NewUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: NewUser;
  }
}
