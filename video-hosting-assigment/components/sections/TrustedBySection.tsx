import { mediaUrl } from "@/lib/strapi";
import type { TrustedBySection } from "@/lib/types";
import SectionHeader from "@/components/shared/SectionHeader";

export default function TrustedBySection({ data }: { data: TrustedBySection }) {
  const logos = data.logos || [];

  return (
    <section className="relative  bg-white py-16 lg:py-20">
      <div className="section-container">
        <SectionHeader
          badge="Trusted globally"
          heading={data.heading || "Powering video at companies you know"}
        />
      </div>

      <div className="relative mt-20 overflow-hidden">
        {/* Scrolling logos */}
        <div className="flex animate-marquee">
          <div className="flex min-w-full shrink-0 items-center justify-around gap-12 px-4">
            {logos.map((logo) => {
              const src = mediaUrl(logo.image, logo.imageUrl);
              return (
                <div
                  key={logo.id}
                  className="flex items-center justify-center group"
                >
                  {src ? (
                    <img
                      src={src}
                      alt={logo.name}
                      className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-14"
                    />
                  ) : (
                    <span className="whitespace-nowrap text-lg font-semibold text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                      {logo.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex min-w-full shrink-0 items-center justify-around gap-12 px-4">
            {logos.map((logo) => {
              const src = mediaUrl(logo.image, logo.imageUrl);
              return (
                <div
                  key={`dup-${logo.id}`}
                  className="flex items-center justify-center group"
                >
                  {src ? (
                    <img
                      src={src}
                      alt={logo.name}
                      className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:h-12"
                    />
                  ) : (
                    <span className="whitespace-nowrap text-lg font-semibold text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                      {logo.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
