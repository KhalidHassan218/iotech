"use client";

import Error from "next/error";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default function GlobalNotFound() {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Error statusCode={404} />;
      </body>
    </html>
  );
}
