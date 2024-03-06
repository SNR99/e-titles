import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/queries";
import { SignInSchema } from "@/lib/schemaValidator";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch)
            return {
              id: user.id,
              email: user.email,
              role: user.role,
            };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
