"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      router.replace("/");
      return;
    }

    setPending(true);
    await supabase.auth.signOut();
    setPending(false);
    router.replace("/");
    router.refresh();
  }

  return (
    <button className="button button--ghost" disabled={pending} onClick={handleLogout} type="button">
      {pending ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
