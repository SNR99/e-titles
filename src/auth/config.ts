import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { SignInSchema } from "@/lib/schemaValidator";
import { getUserByEmail } from "@/lib/queries";
export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = SignInSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(
						password,
						user.password
					);

					if (passwordMatch) return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
