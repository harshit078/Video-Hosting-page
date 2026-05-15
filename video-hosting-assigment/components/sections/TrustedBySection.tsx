import { mediaUrl } from "@/lib/strapi";
import type { TrustedBySection, LogoItem } from "@/lib/types";
import SectionHeader from "@/components/shared/SectionHeader";

function LogoCard({ logo }: { logo: LogoItem }) {
  const src = mediaUrl(logo.image, logo.imageUrl);

  return (
    <div className="flex items-center justify-center group">
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
}

export default function TrustedBySection({ data }: { data: TrustedBySection }) {
  const logos = data.logos || [];

  return (
    <section className="relative bg-white py-4xl lg:py-5xl">
      <div className="section-container">
        <SectionHeader
          badge="Trusted globally"
          heading={data.heading}
          subheading="Companies we've worked with and trusted by"
        />
      </div>

      <div className="relative mt-5xl overflow-hidden">
        {/* Scrolling logos */}
        <div className="flex animate-marquee">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex min-w-full shrink-0 items-center justify-around gap-3xl px-md"
            >
              {logos.map((logo) => (
                <LogoCard key={`${setIndex}-${logo.id}`} logo={logo} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
