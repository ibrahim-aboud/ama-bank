import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AdminController from "@/server/controllers/adminController";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        const adminController = new AdminController();
        return adminController.loginAdmin(
          credentials.username,
          credentials.password
        );
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = { role: "admin" };
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
};

export default NextAuth(authOptions);
