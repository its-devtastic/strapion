import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import useSession from "../../hooks/useSession";

/**
 * Only renders children when user is authenticated (or unauthenticated with the anonOnly flag).
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  anonOnly = false,
}) => {
  const router = useRouter();
  const { token } = useSession();

  useEffect(() => {
    if (!token && !anonOnly) {
      router.push("/login");
    }
    if (token && anonOnly) {
      router.push("/");
    }
  }, [router, token]);

  return <>{children}</>;
};

export default AuthGuard;

interface AuthGuardProps {
  children: React.ReactNode;
  // Only allow unauthenticated users.
  anonOnly?: boolean;
}
