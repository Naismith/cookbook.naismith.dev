import { useState, useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.session) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

function Login() {
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

      <div className="space-y-4">
        <form action="/api/auth/signin/github" method="POST">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <input type="hidden" name="callbackUrl" value="/" />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <SiGithub className="size-5" />
            Continue with GitHub
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          You'll be redirected to GitHub to complete the sign-in process.
        </p>
      </div>
    </div>
  );
}
