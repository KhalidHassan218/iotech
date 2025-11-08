"use client";
import Button from "@/core/components/ui/Button";
import { useEffect } from "react";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button onClick={() => reset()}>Reload</Button>
      </body>
    </html>
  );
}
