import { Button } from "@/components/ui";
import { mediaUrl } from "@/lib/strapi";
import type { HeroSection } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export default function Hero({ data }: { data: HeroSection }) {
  const imgSrc = mediaUrl(data.heroImage, data.heroImageUrl);

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative section-container pt-5xl pb-3xl md:pt-7xl md:pb-4xl">
        <div className="mx-auto text-center animate-slide-up">
          <h1 className="mx-auto w-[90%] text-balance text-5xl font-bold leading-[1.05] tracking-tight text-primary sm:w-[80%] sm:text-6xl md:w-[70%] md:text-7xl lg:w-[60%] lg:text-8xl">
            {data.headline}
          </h1>
          {data.subheadline && (
            <p className="mx-auto mt-lg w-[90%] text-balance text-lg leading-relaxed text-muted-foreground sm:w-[70%] md:w-[55%] md:text-xl lg:w-[45%]">
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
        {imgSrc && (
          <div className="relative mt-3xl animate-fade-in">
            <div className="relative mx-auto w-full sm:w-5/6 md:w-3/4 lg:w-2/3">
              <div className="overflow-hidden rounded-xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-sm border-b border-border/50 bg-muted/30 px-sm py-sm">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-sm flex-1">
                    <div className="mx-auto rounded-md bg-background px-sm py-xs text-[11px] text-muted-foreground">
                      streamly.app/dashboard
                    </div>
                  </div>
                </div>
                <img
                  src={imgSrc}
                  alt={data.heroImage?.alternativeText || data.headline}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
