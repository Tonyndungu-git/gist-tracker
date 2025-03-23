import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "GitHub Personal Access Token",
      credentials: {
        accessToken: { label: "GitHub Personal Access Token", type: "password" },
      },
      async authorize(credentials) {
        const { accessToken } = credentials;

        try {
          const response = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `token ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Invalid GitHub token");
          }

          const user = await response.json();

          return {
            id: user.id.toString(),
            name: user.name || user.login,
            email: user.email || `${user.login}@users.noreply.github.com`,
            image: user.avatar_url,
          };
        } catch (error) {
          console.error("GitHub authentication failed:", error);
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
