import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const client = await clientPromise;
          if (!client) throw new Error("MongoDB client not found");
          
          const db = client.db("gist-tracker");
          const user = await db.collection("users").findOne({ email });
          if (!user) {
            throw new Error("No user found");
          }

          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return { id: user._id.toString(), email: user.email, name: user.name };
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
