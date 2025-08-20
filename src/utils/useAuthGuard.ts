"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/services/auth.service";

export const useAuthGuard = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const logged = isLoggedIn();

    if (!logged) {
      router.push("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  return authChecked;
};
