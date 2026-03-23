"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { InquiryState } from "@/lib/types";

export async function submitInquiryAction(
  _previousState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const payload = {
    first_name: String(formData.get("first_name") ?? "").trim(),
    last_name: String(formData.get("last_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.first_name || !payload.last_name || !payload.email || !payload.message) {
    return {
      ok: false,
      message: "Please complete the required fields before sending your enquiry.",
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: true,
      message:
        "Demo mode: your form is wired up, but you still need to connect Supabase to save live enquiries.",
    };
  }

  const { error } = await supabase.from("inquiries").insert(payload);

  if (error) {
    return {
      ok: false,
      message: "We could not submit your enquiry just now. Please try again shortly.",
    };
  }

  return {
    ok: true,
    message: "Thanks - your enquiry has been sent. We will reply within 24 hours.",
  };
}
