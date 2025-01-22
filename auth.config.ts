// import type { NextAuthConfig } from "next-auth";

// export const authConfig = {
//   trustHost: true,
//   pages: {
//     signIn: "/",
//   },
//   session: { strategy: "jwt" },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;

// import axios from "axios";
// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// type LoginResponse = {
//   token: string;
//   user: {
//     id: string;
//     name: string;
//     phone: string;
//     role: string;
//     picture: string;
//   };
// };

// const nextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         phone: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const res = await axios.post<LoginResponse>("http://169.63.176.109:9092/v1/auth", credentials, {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         });
//         if (res.status === 200) {
//           const { name, id, phone, role, picture } = res.data.user;
//           const user = {
//             id,
//             name,
//             phone,
//             role,
//             picture,
//             token: res.data.token,
//           };
//           return user; // User interface we declared in next-auth.d.ts
//         } else throw new Error("Login failed");
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return Promise.resolve(token); // JWT interface we declared in next-auth.d.ts
//     },
//     async session({ session, token }) {
//       //@ts-ignore
//       session.user = token.user;
//       return session; // Session interface we declared in next-auth.d.ts
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// } satisfies NextAuthOptions;

// export default nextAuthOptions;
