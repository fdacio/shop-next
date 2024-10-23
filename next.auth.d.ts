import NextAuth from "next-auth";
import { ApiUser } from "./app/lib/definitions";

declare module "next-auth" {
  interface Session {
    user: ApiUser
  }
}