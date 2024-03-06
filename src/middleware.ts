import {
  DEFAULT_SIGN_IN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/lib/routes";
import NextAuth from "next-auth";
import authConfig from "@/auth/config";
import { auth as userAuth } from "@/auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isSignIn = !!req.auth;
  const isApiRoute = req.url.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return null;
  if (isAuthRoute) {
    if (isSignIn)
      return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl));

    return null;
  }

  if (!isSignIn && !isPublicRoutes)
    return Response.redirect(new URL("/sign-in", nextUrl));

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
