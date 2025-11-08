import { serverApi } from "@/core/lib/server-api";

import { HeroSlider } from "./HeroSlider";

export const HeroBanner = async ({ locale = "en" }: { locale?: string }) => {
  const { data: heroData, error } = await serverApi.get<PresentationDocument>(
    "/herobanner?populate[slides][populate][0]=backgroundImage&populate[slides][populate][1]=backgroundVideo&populate[slides][populate][2]=foregroundImage",
    locale
  );
  if (error || !heroData?.slides?.length) {
    return (
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-on-dark px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-dm-sans">
            Best experience!
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-accent font-medium">
            Lorem ipsum
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-foreground">
            Lorem ipsum is simply dummy text of the identity, and typesetting it
            is in my Lorem
          </p>
          <button className="bg-accent text-on-dark px-8 py-3 rounded-lg text-lg font-medium hover:bg-accent/90 transition-colors">
            Bond More
          </button>
        </div>
      </div>
    );
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  return <HeroSlider slides={heroData.slides} strapiUrl={strapiUrl} />;
};
