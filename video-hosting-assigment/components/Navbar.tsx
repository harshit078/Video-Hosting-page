"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { NavbarData } from "@/lib/types";
import { ArrowRight, Menu } from "lucide-react";
import { mediaUrl } from "@/lib/strapi";

export default function Navbar({ data }: { data: NavbarData }) {
  return (
    <header className="sticky w-[calc(100%-4rem)] border-border/60 bg-muted/50 backdrop-blur mx-auto top-5 z-50 rounded-3xl shadow-lg transition-colors duration-200">
      <nav className="section-container flex items-center justify-between py-md">
        <Link
          href="/"
          className="flex items-center gap-sm text-xl font-bold text-primary transition-colors hover:text-primary/80"
        >
          {/* Logo icon */}
          {data.logo && (
            <img
              src={mediaUrl(data.logo)}
              alt="Logo"
              className="h-15 w-auto object-contain"
            />
          )}
        </Link>

        <ul className="hidden items-center gap-xs md:flex">
          {data.links?.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="rounded-full px-md py-sm text-sm font-medium text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-sm md:flex">
          {data.ctaLabel && data.ctaHref && (
            <Button
              asChild
              className="rounded-full shadow-sm transition-all hover:shadow-md"
            >
              <a href={data.ctaHref}>
                {data.ctaLabel}
                <ArrowRight size={18} />
              </a>
            </Button>
          )}
        </div>

        {/* Mobile menu */}
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg p-sm text-primary transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden">
            <Menu size={22} />
          </summary>
          <ul className="absolute right-0 mt-sm w-64 rounded-2xl border border-border/50 bg-white p-sm shadow-xl ring-1 ring-black/5 z-50">
            {data.links?.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="block rounded-lg px-md py-sm text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {data.ctaLabel && data.ctaHref && (
              <li className="mt-sm border-t border-border/50 pt-sm">
                <Button asChild className="w-full rounded-lg">
                  <a href={data.ctaHref}>{data.ctaLabel}</a>
                </Button>
              </li>
            )}
          </ul>
        </details>
      </nav>
    </header>
  );
}
