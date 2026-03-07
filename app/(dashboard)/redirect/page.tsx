"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";
import { ROLES } from "@/constants/role.constant";

export default function RedirectPage() {
  const router = useRouter();
  const { roleName, loading, isAuth } = useCurrentRoleName();

  useEffect(() => {
    if (loading) return;

    if (!isAuth) {
      router.replace("/login");
      return;
    }

    if (roleName === ROLES.ADMIN) {
      router.replace("/admin");
      return;
    }

     if (roleName === ROLES.TEACHER) {
      router.replace("/teacher");
      return;
    }

    if (roleName === ROLES.STUDENT) {
      router.replace("/user");
      return;
    }

    router.replace("/login");
  }, [roleName, loading, isAuth, router]);

  return null;
}
