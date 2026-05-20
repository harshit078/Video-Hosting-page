import Image from "next/image";
import { Button, AnimatedBadge } from "@/components/ui";
import { mediaUrl } from "@/lib/strapi";
import type { HeroSection } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export default function Hero({ data }: { data: HeroSection }) {
  const heroImage = mediaUrl(data.heroImage, data.heroImageUrl);
  const backgroundImage = mediaUrl(data.backgroundImage, data.backgroundImageUrl);

  return (
    <section className="relative overflow-hidden ">
      <div className="relative section-container pt-5xl pb-3xl md:pt-7xl md:pb-4xl">
        <div className="mx-auto text-center animate-slide-up">
          {data.badgeTexts && data.badgeTexts.length > 0 && (
            <div className="mb-lg flex justify-center">
              <AnimatedBadge texts={data.badgeTexts.map((b) => b.text)} />
            </div>
          )}
          <h1 className="mx-auto max-w-[100ch] font-medium text-center py-3 text-5xl lg:text-7xl font-display sm:w-[80%] sm:text-4xl md:w-[70%] md:text-5xl lg:w-[60%] lg:text-6xl">
            {data.headline}
          </h1>
          {data.subheadline && (
            <p className="mx-auto mt-lg text-zinc-900/60 sm:w-[70%] md:w-[55%] md:text-xl lg:w-[45%]">
              {data.subheadline}
            </p>
          )}
          <div className="mt-2xl flex flex-wrap items-center justify-center gap-md">
            {/* Get Started Button */}
            {data.primaryCtaLabel && data.primaryCtaHref && (
              <Button
                asChild
                size="lg"
                className="h-2xl rounded-lg px-lg text-base font-medium"
              >
                <a href={data.primaryCtaHref}>{data.primaryCtaLabel}</a>
              </Button>
            )}
            {/* Book a Demo Button */}
            {data.secondaryCtaLabel && data.secondaryCtaHref && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-2xl rounded-lg px-lg text-base font-medium"
              >
                <a href={data.secondaryCtaHref}>
                  {data.secondaryCtaLabel}
                  <ArrowRight size={18} />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Hero image */}
        {heroImage && (
          <div className="relative mt-3xl animate-fade-in">
            {backgroundImage && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-screen -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={backgroundImage}
                  alt=""
                  aria-hidden
                  width={1920}
                  height={800}
                  priority
                  className="w-full h-auto"
                />
              </div>
            )}
            <div className="relative z-10 mx-auto w-full sm:w-5/6 md:w-3/4 lg:w-2/3 rounded-2xl border border-white/70 bg-slate-500/10 p-md backdrop-blur">
              <div className="flex gap-1.5 py-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={heroImage}
                  alt={data.heroImage?.alternativeText || data.headline}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
