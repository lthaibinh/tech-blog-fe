import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
  }

  interface User {
    id: string;
    username: string;
    token: string;
  }
}