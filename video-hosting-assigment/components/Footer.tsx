import Image from "next/image";
import { mediaUrl } from "@/lib/strapi";
import type { FooterData } from "@/lib/types";

export default function Footer({ data }: { data: FooterData }) {
  const socialLinks = data.socialLinks ?? [];
  const legalLinks = data.legalLinks ?? [];
  const logoSrc = mediaUrl(data.logo);

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-muted/50 to-muted">
      <div className="px-6 py-4xl ">
        <div className="grid gap-3xl lg:grid-cols-6">
          {/* Branding section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-sm text-xl font-bold text-primary">
              {logoSrc && (
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={140}
                  height={48}
                  className="h-15 w-auto object-contain"
                />
              )}
            </div>
            <p className="mt-md text-sm leading-relaxed text-muted-foreground">
              {data.tagline}
            </p>
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="mt-lg flex gap-md">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-sm text-muted-foreground transition-colors hover:bg-white hover:text-primary hover:shadow-sm"
                  >
                    {mediaUrl(link.icon) && (
                      <Image
                        src={mediaUrl(link.icon)!}
                        alt={link.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-xl sm:grid-cols-4 lg:col-span-4">
            {data.columns?.map((col) => (
              <div key={col.id}>
                <h4 className="mb-md text-sm font-semibold uppercase tracking-wider text-primary">
                  {col.title}
                </h4>
                <ul className="space-y-sm">
                  {col.links?.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <span className="mr-sm h-1 w-0 rounded-full bg-primary transition-all group-hover:w-2" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright and Privacy Policy */}
        <div className="mt-4xl flex flex-col items-center justify-between gap-md border-t border-border/50 pt-xl sm:flex-row">
          {data.copyright && (
            <p className="text-sm text-muted-foreground">{data.copyright}</p>
          )}
            <div className="flex gap-lg text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
