import { requireAuth } from "@/utils/auth-middleware";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: requireAuth,
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
