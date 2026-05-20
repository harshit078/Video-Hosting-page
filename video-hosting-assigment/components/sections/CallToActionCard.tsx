import { Button } from "@/components/ui";
import type { CallToActionCardSection } from "@/lib/types";
import { Cloud, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function CallToActionCard({
  data,
}: {
  data: CallToActionCardSection;
}) {
  return (
    <section className="py-6xl sm:w-full md:w-3/4 lg:w-2/3 justify-center mx-auto lg:py-7xl">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl gradient-cta px-xl py-5xl text-center sm:px-4xl lg:px-6xl lg:py-7xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -right-1/4 -bottom-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {data.heading}
            </h2>
            {data.subheadline && (
              <p className="mx-auto mt-lg text-lg text-white/70 lg:text-xl">
                {data.subheadline}
              </p>
            )}
            {data.ctaLabel && data.ctaHref && (
              <div className="mt-2xl flex flex-col items-center gap-md sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="h-3xl px-xl font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  <a href={data.ctaHref}>
                    {data.ctaLabel}
                    <ArrowRight />
                  </a>
                </Button>
                {data.note && (
                  <span className="text-sm text-white/70">{data.note}</span>
                )}
              </div>
            )}

            <div className="mt-3xl flex flex-wrap items-center justify-center gap-lg text-sm text-white/50">
              <div className="flex items-center gap-sm">
                <ShieldCheck size={18} color="green" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-sm">
                <Zap size={18} color="yellow" />
                <span>99.99% uptime</span>
              </div>
              <div className="flex items-center gap-sm">
                <Cloud size={18} color="white" />
                <span>Global CDN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
