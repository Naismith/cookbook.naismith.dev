import Github from "@auth/core/providers/GitHub";
import { setCookie } from "@tanstack/react-start/server";
import type { Profile } from "@auth/core/types";
import type { StartAuthJSConfig } from "start-authjs";

declare module "@auth/core/types" {
  export interface Session {
    user: {
      name: string;
      email: string;
      sub: string;
      email_verified: boolean;
    } & Profile;
    account: {
      access_token: string;
    };
    expires: Date;
  }
}

/**
 * Auth.js configuration for TanStack Start with Auth0
 */
export const authConfig: StartAuthJSConfig = {
  // basePath is derived from AUTH_URL env var
  secret: process.env.AUTH_SECRET,
  providers: [Github],
};
