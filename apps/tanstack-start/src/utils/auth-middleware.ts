import { redirect } from "@tanstack/react-router";

export function requireAuth({ context }: { context: { session: unknown } }) {
  if (!context.session) {
    throw redirect({ to: "/login" });
  }
}
