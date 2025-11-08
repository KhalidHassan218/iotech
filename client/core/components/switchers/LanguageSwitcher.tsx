"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const currentLocale = locale;
  const allLocales = routing.locales; // ["en", "ar"]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    if (newLocale === currentLocale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error: params + pathname always match
        { pathname, params },
        { locale: newLocale }
      );
    });
  };

  return (
    <select
      className="bg-transparent   text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-on-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isPending}
      value={currentLocale}
      onChange={handleChange}
    >
      {allLocales.map((loc) => (
        <option key={loc} className="bg-background text-foreground" value={loc}>
          {loc.toUpperCase()} {/* Display EN / AR */}
        </option>
      ))}
    </select>
  );
};
