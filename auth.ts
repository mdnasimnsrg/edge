// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { authConfig } from "./auth.config";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const { userName, password } = credentials;
//         const res = await fetch("http://169.63.176.109:9092/v1/auth", {
//           method: "POST",
//           body: JSON.stringify({ username: userName, password: password }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const user = await res.json();

//         if (res.ok && user) {
//           cookies().set("accessToken", user.accessToken);
//           cookies().set("x-meta-data", res.headers.get("x-meta-data") as string);
//           return user;
//         }
//         return null;
//         // if (userName !== "mahmoud") return null;
//         // return { id: "1", name: "mahmoud", role: "admin", permission: [{ name: "any" }] };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (token && user) {
//         //@ts-ignore
//         let name = jwtDecode(user?.accessToken)?.sub;
//         return { ...token, ...user, name };
//       }
//       return token;
//     },

//     async session({ token, session }) {
//       return { ...session, user: token };
//     },
//   },
// });

import { AUTH_ENDPOINTS } from '@/endpoints/auth'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const nextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        phone: {},
        password: {}
      },
      //@ts-ignore
      async authorize(credentials: any) {
        const { userName, password } = credentials
        try {
          const res = await fetch(AUTH_ENDPOINTS.login.url, {
            method: 'POST',
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const user = await res.json()
          if (user.errorId) throw new Error(user.message)
          if (res.status === 200) {
            return { name: userName, ...user.userInfo, token: user.token }
          } else null
        } catch (error: any) {
          if (error == 'TypeError: fetch failed') throw new Error('Network Error')
          else throw new Error('Invalid Credentials')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.user = user
      }

      return Promise.resolve(token) // JWT interface we declared in next-auth.d.ts
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user = token.user

      return session // Session interface we declared in next-auth.d.ts
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
} satisfies NextAuthOptions
