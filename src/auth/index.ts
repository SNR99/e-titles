import NextAuth, { type DefaultSession } from "next-auth";

import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/lib/queries";

import authConfig from "@/auth/config";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: "/sign-in",
	},
	callbacks: {
		async signIn({ user, account }) {
			const existingUser = await getUserById(user.id as string);

			if (!existingUser?.emailVerified) return false;

			return true;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.surname = existingUser.surname as string;
			token.role = existingUser.role as "ADMIN" | "USER";
			return token;
		},
		async session({ session, token }) {
			console.log("session", token);
			if (token.sub && session.user) session.user.id = token.sub;

			if (token.role && session.user)
				session.user.role = token.role as UserRole;

			if (token.surname && session.user)
				session.user.surname = token.surname as string;

			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	...authConfig,
});
