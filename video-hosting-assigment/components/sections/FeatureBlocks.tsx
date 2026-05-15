import SectionHeader from '@/components/shared/SectionHeader';
import { Gauge, Palette, ShieldCheck, BarChart3, type LucideIcon } from 'lucide-react';
import type { FeatureBlocksSection, FeatureItem } from '@/lib/types';
import { mediaUrl } from '@/lib/strapi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const iconMap: Record<FeatureItem['iconName'], LucideIcon> = {
  gauge: Gauge,
  palette: Palette,
  shield: ShieldCheck,
  chart: BarChart3,
};

const accentMap: Record<FeatureItem['accentColor'], string> = {
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
};

const colSpanMap: Record<FeatureItem['colSpan'], string> = {
  small: 'lg:col-span-5',
  large: 'lg:col-span-7',
};

export function FeatureBlocks({ data }: { data: FeatureBlocksSection }) {
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="bg-muted/40 py-24 lg:py-32">
      <div className="section-container">
        <SectionHeader
          badge={data.badge ?? 'Built for video'}
          heading={data.heading ?? 'Packed with features for every need'}
          subheading={
            data.subheading ?? 'Everything you need to host, secure, and grow your video reach'
          }
          className="mb-12"
        />

        <div className="mx-auto grid justify-center gap-6 sm:w-full md:w-3/4 lg:w-2/3 lg:grid-cols-12">
          {items.map((feat) => {
            const Icon = iconMap[feat.iconName] ?? Gauge;
            const accent = accentMap[feat.accentColor] ?? accentMap.blue;
            const colSpan = colSpanMap[feat.colSpan] ?? colSpanMap.small;

            return (
              <Card
                key={feat.id}
                className={`group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brand/40 ${colSpan}`}
              >
                {feat.image && (
                  <div className="relative h-40 w-full overflow-hidden bg-muted/30 md:h-55">
                    <img
                      src={mediaUrl(feat.image)}
                      alt={feat.heading}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="pb-0">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
                    >
                      <Icon size={20} />
                    </span>
                    {feat.eyebrow && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {feat.eyebrow}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-primary lg:text-2xl">
                    {feat.heading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  {feat.body && (
                    <CardDescription className="text-base leading-relaxed">
                      {feat.body}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
