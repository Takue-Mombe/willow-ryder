import type { SupabaseClient, User } from "@supabase/supabase-js";

function hasAdminMetadata(user: User) {
  const role = user.app_metadata?.role;
  const roles = user.app_metadata?.roles;

  if (role === "admin") {
    return true;
  }

  if (Array.isArray(roles) && roles.includes("admin")) {
    return true;
  }

  return false;
}

export async function checkAdminAccess(supabase: SupabaseClient, user: User) {
  if (hasAdminMetadata(user)) {
    return true;
  }

  const { data: adminRecord } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminRecord) {
    return true;
  }

  const { data: isAdmin } = await supabase.rpc("is_admin", {
    user_uuid: user.id,
  });

  return isAdmin === true;
}
