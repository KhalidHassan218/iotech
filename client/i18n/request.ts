/* eslint-disable no-console */
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import deepmerge from "deepmerge";

import { routing } from "./routing";

// Type for message objects
type Messages = Record<string, string>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let defaultMessages: Messages = {};
  let userMessages: Messages = {};

  // Add all translation modules here
  const messageFiles = [
    "home",
    "contactUs",
    "footer",
    "header",
    "error",
    "notFound",
  ];

  // ✅ Load ENGLISH messages (fallback)
  for (const file of messageFiles) {
    try {
      const defaultFileMessages = (await import(`../messages/en/${file}.json`))
        .default as Messages;
      defaultMessages = { ...defaultMessages, ...defaultFileMessages };
    } catch (error) {
      console.error(`Error loading English messages from ${file}.json:`, error);
    }
  }

  // ✅ Load locale-specific messages (e.g. Arabic)
  if (locale !== "en") {
    for (const file of messageFiles) {
      try {
        const fileMessages = (
          await import(`../messages/${locale}/${file}.json`)
        ).default as Messages;
        userMessages = { ...userMessages, ...fileMessages };
      } catch (error) {
        console.error(
          `Error loading messages from ${file}.json for locale ${locale}:`,
          error
        );
      }
    }
  }

  // ✅ Merge locale-specific messages over English defaults
  const messages: Messages =
    locale === "en"
      ? defaultMessages
      : deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
