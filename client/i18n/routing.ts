import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ar", "en"],
  localeCookie: {
    name: "IOTECH_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
  // Used when no locale matches
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
});
