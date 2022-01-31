import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";

// allows to mutate and revalidate
export const mutateSession = (data, shouldRevalidate) =>
  mutate("/api/auth/session", data, shouldRevalidate);

// parse the response
const fetcher = (url) => fetch(url).then((r) => r.json());

export function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
  const { status } = useSession(); // check if provider is still loading (avoid redirecting)
  const { data: session, isValidating } = useSWR("/api/auth/session", fetcher);

  const hasSession = Boolean(session?.user);
  const isLoading = status === "loading" || (!session && isValidating);

  useEffect(() => {
    if (!redirectTo || isLoading) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasSession) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasSession)
    ) {
      router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasSession, isLoading]);

  return {
    session: session?.user ?? null,
    loading: isLoading,
  };
}
