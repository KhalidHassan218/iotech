/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HeroBanner } from "@/core/components/HeroBanner/HeroBanner";
import { Footer, Header } from "@/core/components/layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <HeroBanner />
      <main>{children}</main>
      <Footer />
    </>
  );
}
