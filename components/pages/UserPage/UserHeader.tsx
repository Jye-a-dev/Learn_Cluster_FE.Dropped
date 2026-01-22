"use client";

import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";

export default function UserHeader() {
  const { user, loading, isAuth } = useCurrentUser();
  const { roleName, loading: roleLoading } = useCurrentRoleName();

  if (loading || roleLoading) {
    return (
      <section className="rounded-2xl bg-black/40 p-5 backdrop-blur-md">
        <div className="h-4 w-32 rounded bg-white/20 animate-pulse" />
      </section>
    );
  }

  if (!isAuth || !user) return null;

  return (
    <section className="border border-white relative grid grid-cols-3 items-center rounded-2xl bg-black/30 p-5 backdrop-blur-md shadow-lg ring-1 ring-white/10">
      {/* LEFT – Status */}
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="text-sm font-medium text-white/80">
          Active
        </span>
      </div>

      {/* CENTER – User info */}
      <div className="text-center space-y-0.5">
        <h1 className="text-2xl font-semibold text-white">
          Chào mừng trở lại <br/>
          <span className="text-emerald-200 font-extrabold">{user.username}</span>
        </h1>


        <div className="flex justify-center gap-2 text-sm text-white/70">
          <span>{user.email}</span> 
          <span className="text-white/40">•</span>
          <span>{roleName ?? "Unknown role"}</span>
        </div>
      </div>

      {/* RIGHT – Avatar */}
      <div className="flex justify-end">
        <div className="relative h-11 w-11 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
          {user.username.charAt(0).toUpperCase()}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black/50" />
        </div>
      </div>
    </section>
  );
}
