import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbConnect from "@/lib/mongodb";
import Google from "next-auth/providers/google";
import client from "lib/db";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return false;

        await dbConnect();
        const existing = await User.findOne({ email: user.email });

        // console.log(`[SignIn Attempt] Email: ${user.email} | Found in DB: ${!!existing} | Role: ${existing?.role}`);
        // if (user.email === "yannick.liebnau@gmail.com") return true;

        if (!existing || existing.role !== 'admin') {
          return "/login?error=AccessDenied"
        }

        return true

    }
  }
})
