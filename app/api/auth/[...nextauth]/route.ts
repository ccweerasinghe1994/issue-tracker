import prisma from "@/prisma/client";
import type { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";



const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  adapter : PrismaAdapter(prisma) as Adapter,
  session:{
    strategy:'jwt'
  }
})

export { handler as GET, handler as POST }