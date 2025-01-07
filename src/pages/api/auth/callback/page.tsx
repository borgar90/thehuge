"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Character data:", data);
          // Store data or redirect
          router.push("/dashboard");
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [token, router]);

  if (loading) return <p>Loading...</p>;
  return <p>Authenticated! Redirecting...</p>;
};

export default AuthCallbackPage;
