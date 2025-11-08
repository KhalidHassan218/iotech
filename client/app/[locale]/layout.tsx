/* eslint-disable prefer-arrow/prefer-arrow-functions */
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { GlobalToastProvider, ThemeProvider } from "@/core/providers";
import { ReduxProvider } from "@/core/store/providers";
import { routing } from "@/i18n/routing";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IO , Tech Task",
  description: "This Demo for IO Tech Frontend Developer (Remote)  Position",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <body className={`${dmSans.className}  antialiased`}>
        <ReduxProvider>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            <NextIntlClientProvider locale={locale}>
              {children}
              <GlobalToastProvider locale={locale} />
            </NextIntlClientProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
