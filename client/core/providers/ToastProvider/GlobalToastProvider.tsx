"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const GlobalToastProvider = ({ locale }: { locale: string }) => {
  const [position, setPosition] = useState<
    "bottom-center" | "top-left" | "top-right"
  >("bottom-center");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPosition("bottom-center");
      } else {
        if (locale === "ar") {
          setPosition("top-left");
        } else {
          setPosition("top-left");
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [locale]);

  return (
    <Toaster
      position={position}
      reverseOrder={false}
      toastOptions={{
        className: "font-sans rounded-lg shadow-lg",
        style: {
          border: "1px solid var(--color-border)",
        },
        duration: 4500,
        success: {
          style: {
            background: "var(--color-background)",
            color: "var(--color-foreground)",
            borderColor: "var(--color-primary)",
            borderWidth: "2px",
          },
        },
        error: {
          style: {
            background: "var(--color-background)",
            color: "var(--color-foreground)",
            borderColor: "var(--color-destructive)",
            borderWidth: "2px",
          },
        },
      }}
    />
  );
};
