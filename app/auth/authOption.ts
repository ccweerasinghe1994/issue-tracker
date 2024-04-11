import prisma from "@/prisma/client";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {NextAuthOptions} from "next-auth";
import type {Adapter} from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: 'jwt'
    },
}

export default authOptions;