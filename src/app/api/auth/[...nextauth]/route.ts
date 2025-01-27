import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstance } from "@/utils/axios";
import axios from "axios";

// Define the refreshAccessToken function for token refreshing
async function refreshAccessToken(token: any) {
  try {
    const data: any = await axiosInstance.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/identity/auth/refresh",
      {
        token: token.accessToken,
      }
    );
    if (!data?.token)
      return {
        error: "RefreshAccessTokenError",
      };
    const refreshedToken = data.token;
    return {
      ...token,
      accessToken: refreshedToken,
      accessTokenExpires: Date.now() + 86400000, // Assume 1 day expiry
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res: {
            data: {
              data: {
                token: string;
                expiryTime: Date;
              };
            };
          } = await axios.post(
            process.env.NEXT_PUBLIC_API_BASE_URL + "/identity/auth/token",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );
          const { token } = res.data.data;
          if (token) {
            return {
              id: credentials?.username ?? "",
              username: credentials?.username ?? "",
              token,
            };
          }
          return null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user?: any;
      account?: any;
    }) {
      // Initial login
      if (user) {
        token.accessToken = user.token || account?.access_token;
        token.accessTokenExpires = Date.now() + 86400000; // 1 day
      }

      // Return previous token if it's still valid
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Refresh token if expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
