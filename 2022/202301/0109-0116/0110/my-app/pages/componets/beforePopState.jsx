import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== "/" && as !== "/other") {
        // Have SSR render bad routes as a 404.
        window.location.href = as;
        return false;
      }

      return true;
    });
  }, []);

  return <p>Welcome to the page</p>;
}
