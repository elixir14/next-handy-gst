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
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma().user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        const isVerified = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!user) {
          return null;
        } else if (user && !isVerified) {
          return null;
        }

        return { name: credentials.company, email: user.email, id: user.id };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
      const company = await prisma().company.findUnique({
        where: {
          id: parseInt(session.user.name),
        },
      });
      return { ...session, company };
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  // Enable debug messages in the console if you are having problems
});
