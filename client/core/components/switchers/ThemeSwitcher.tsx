"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Circle, Moon, Sun } from "lucide-react";

import { cn } from "@/core/lib/utils";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a neutral placeholder to avoid mismatch
    return (
      <button
        aria-label="Toggle theme"
        className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-400"
      />
    );
  }

  const themes = ["brown", "white", "dark"];
  const currentIndex = themes.indexOf(theme ?? "brown");

  const cycleTheme = () => {
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const isDark = theme === "dark";
  const isLight = theme === "white";
  const isBrown = theme === "brown";

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all duration-300",
        "h-8 w-8 p-2 shadow-md border",
        "bg-background/70 backdrop-blur-md",
        isDark
          ? "bg-neutral-800 border-neutral-600 hover:border-neutral-400"
          : isLight
            ? "bg-neutral-100 border-neutral-300 hover:border-neutral-500"
            : "bg-amber-100 border-amber-300 hover:border-amber-500",
        "hover:scale-105 hover:shadow-lg active:scale-95"
      )}
      onClick={cycleTheme}
    >
      <Sun
        className={cn(
          "absolute h-6 w-6 transition-all",
          isLight
            ? "opacity-100 scale-100 rotate-0 text-amber-500"
            : "opacity-0 scale-0 rotate-45 text-amber-500"
        )}
      />
      <Moon
        className={cn(
          "absolute h-6 w-6 transition-all",
          isDark
            ? "opacity-100 scale-100 rotate-0 text-yellow-300"
            : "opacity-0 scale-0 rotate-45 text-yellow-300"
        )}
      />
      <Circle
        className={cn(
          "absolute h-6 w-6 transition-all",
          isBrown
            ? "opacity-100 scale-100 rotate-0 text-amber-700"
            : "opacity-0 scale-0 rotate-45 text-amber-700"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
