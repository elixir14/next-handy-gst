import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "lib/auth";
import prisma from "lib/prisma";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.customer.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        } else if (
          user &&
          !verifyPassword(credentials.password, user.password)
        ) {
          return null;
        }

        return { email: user.email, id: user.id };
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  // Enable debug messages in the console if you are having problems
});
