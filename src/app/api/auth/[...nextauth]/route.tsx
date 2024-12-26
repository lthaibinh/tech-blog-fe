import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: '89978030165-dcvvhd0u70ssugusub6dv3l45fbl7vuj.apps.googleusercontent.com' ,
      clientSecret: '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',
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
