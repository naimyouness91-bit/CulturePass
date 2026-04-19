import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingRedirect,
});

function LandingRedirect() {
  // Redirect to login page as landing page
  return <Navigate to="/login" />;
}

