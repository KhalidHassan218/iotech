"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export const HeroSlider = ({ slides, strapiUrl }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedMedia, setLoadedMedia] = useState<Set<number>>(new Set());
  const [allMediaLoaded, setAllMediaLoaded] = useState(false);

  useEffect(() => {
    const preloadMedia = async () => {
      const promises: Promise<void>[] = [];

      slides.forEach((slide, index) => {
        if (slide.backgroundType === "image" && slide.backgroundImage) {
          const promise = new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = `${slide.backgroundImage?.url}`;
            img.onload = () => {
              setLoadedMedia((prev) => new Set(prev).add(index));
              resolve();
            };
            img.onerror = () => resolve(); // Continue even if image fails
          });
          promises.push(promise);
        }

        // Preload videos
        if (slide.backgroundType === "video" && slide.backgroundVideo) {
          const promise = new Promise<void>((resolve) => {
            const video = document.createElement("video");
            video.src = `${slide.backgroundVideo?.url}`;
            video.preload = "auto";
            video.onloadeddata = () => {
              setLoadedMedia((prev) => new Set(prev).add(index));
              resolve();
            };
            video.onerror = () => resolve();
          });
          promises.push(promise);
        }

        if (slide.foregroundImage) {
          const promise = new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = `${slide.foregroundImage?.url}`;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
          promises.push(promise);
        }
      });

      await Promise.all(promises);
      setAllMediaLoaded(true);
    };

    preloadMedia();
  }, [slides, strapiUrl]);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, []);

  useEffect(() => {
    if (!allMediaLoaded) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length, allMediaLoaded]);

  const currentSlideData = slides[currentSlide];
  const loadingProgress = (loadedMedia.size / slides.length) * 100;

  if (!allMediaLoaded) {
    return (
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-background">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
          <div className="text-white text-4xl md:text-5xl font-bold font-dm-sans mb-4 animate-pulse">
            Loading...
          </div>

          <div className="w-full max-w-md">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-linear-to-r from-accent via-white to-accent transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-white/60 text-sm mt-3 text-center">
              {Math.round(loadingProgress)}% loaded
            </p>
          </div>

          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin" />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isNext = index === (currentSlide + 1) % slides.length;
          const isPrev =
            index === (currentSlide - 1 + slides.length) % slides.length;

          if (slide.backgroundType === "image" && slide.backgroundImage) {
            return (
              <div
                key={`bg-${index}`}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive
                    ? "opacity-100 scale-100"
                    : isNext || isPrev
                      ? "opacity-0 scale-105"
                      : "opacity-0 scale-95"
                }`}
              >
                <Image
                  fill
                  alt={slide.backgroundImage.alternativeText ?? ""}
                  className="object-cover"
                  priority={index === 0}
                  quality={75}
                  src={`${slide.backgroundImage.url}`}
                  unoptimized={strapiUrl.includes("localhost")}
                />
              </div>
            );
          }
          if (slide.backgroundType === "video" && slide.backgroundVideo) {
            return (
              <div
                key={`bg-${index}`}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive
                    ? "opacity-100 scale-100"
                    : isNext || isPrev
                      ? "opacity-0 scale-105"
                      : "opacity-0 scale-95"
                }`}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src={`${slide.backgroundVideo.url}`}
                    type={slide.backgroundVideo.mime}
                  />
                </video>
              </div>
            );
          }

          return null;
        })}

        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            background:
              "linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%)",
          }}
        />
      </div>

      <div className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 md:flex hidden flex-col gap-3 md:gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 cursor-pointer h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-500 ease-out ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg shadow-white/50"
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-5 md:px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto">
          <div
            className={`text-white space-y-4 md:space-y-6 transition-all duration-700 ease-out ${
              isTransitioning
                ? "opacity-0 translate-x-[-30px] blur-sm"
                : "opacity-100 translate-x-0 blur-0"
            }`}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-dm-sans leading-tight">
              {currentSlideData.title}
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed">
              {currentSlideData.description}
            </p>
            <a
              className="inline-block bg-foreground text-accent px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-base md:text-lg font-medium  hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
              href={currentSlideData.buttonLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              {currentSlideData.buttonText}
            </a>
          </div>

          {currentSlideData.foregroundImage && (
            <div
              className={`relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] transition-all duration-700 ease-out ${
                isTransitioning
                  ? "opacity-0 translate-x-[30px] blur-sm scale-95"
                  : "opacity-100 translate-x-0 blur-0 scale-100"
              }`}
            >
              <Image
                fill
                priority
                alt={currentSlideData.foregroundImage.alternativeText ?? ""}
                className="object-contain drop-shadow-2xl"
                quality={75}
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                src={`${currentSlideData.foregroundImage.url}`}
                unoptimized={strapiUrl.includes("localhost")}
              />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-1.5 md:gap-2 ">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-0.5 md:h-1 rounded-full transition-all duration-500 ease-out ${
                index === currentSlide
                  ? "w-10 md:w-12 bg-white shadow-lg shadow-white/30"
                  : "w-6 md:w-8 bg-white/30 hover:bg-white/50 hover:scale-110"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
