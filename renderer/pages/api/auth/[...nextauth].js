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
        const company = await prisma("public").company.findUnique({
          where: {
            id: parseInt(credentials.company),
          },
        });

        const user = await prisma(
          company?.gst_number?.toLowerCase()
        ).user.findUnique({
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

        return {
          name: { company: credentials.company, userId: user.id },
          email: user.email,
          id: user.id,
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
      const company = await prisma("public").company.findUnique({
        where: {
          id: parseInt(session.user.name.company),
        },
      });
      return { ...session, company };
      // return session;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  // Enable debug messages in the console if you are having problems
});
