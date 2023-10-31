"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute(Component: any) {
  return function WithAuth(props: any) {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!currentUser) {
        router.push("/login");
      }
    }, [currentUser, router]);

    if (!currentUser) {
      return null;
    }

    return <Component {...props} />;
  };
}
