// import createMiddleware from 'next-intl/middleware'

// export const locales = ['en', 'ar'] as const

// export default createMiddleware({
//   locales: locales,
//   defaultLocale: 'en'
// })

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(ar|en)/:path*']
// }

///////////////////////////////////////////////////////////////
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  // const defaultLocale = request.headers.get('x-your-custom-locale') || 'en'

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  })
  const response = handleI18nRouting(request)

  // Step 3: Alter the response (example)
  // response.headers.set('x-your-custom-locale', defaultLocale)

  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
}
///////////////////////////////////////////////////////////////
//middleware.ts

// import { withAuth } from "next-auth/middleware";
// import { NextRequest, NextResponse } from "next/server";

// function middleware(req) {
//   if (!req.nextauth.token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/";
//     return NextResponse.rewrite(url);
//   }
//   return NextResponse.next();
// }

// const authMiddleware = withAuth(
//   // function onSuccess(req) {
//   //   return intlMiddleware(req);
//   // }
//   // {
//   //   callbacks: {
//   //     authorized: ({ token }) => true,
//   //   },
//   //   pages: {
//   //     signIn: "/",
//   //   },
//   // }
// );

// export default function middleware(req: NextRequest) {
//   const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
//   const publicPathnameRegex = RegExp(excludePattern, "i");
//   const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return (authMiddleware as any)(req);
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
