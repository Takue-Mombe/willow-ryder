"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError("Add your Supabase URL and anon key to enable authentication.");
      return;
    }

    setPending(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    setPending(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="auth-card__form">
      <div className="form-group">
        <label className="form-label" htmlFor="login-email">
          Email Address
        </label>
        <input className="form-input" id="login-email" name="email" required type="email" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="login-password">
          Password
        </label>
        <input
          className="form-input"
          id="login-password"
          name="password"
          required
          type="password"
        />
      </div>

      <button className="button button--primary auth-card__button" disabled={pending} type="submit">
        {pending ? "Signing In..." : "Sign In"}
      </button>

      {error ? <p className="auth-card__error">{error}</p> : null}
    </form>
  );
}
