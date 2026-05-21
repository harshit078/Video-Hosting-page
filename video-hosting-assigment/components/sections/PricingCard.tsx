import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from "@/components/ui";
import { CircleCheck } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { PricingSection } from "@/lib/types";

export default function PricingCard({ data }: { data: PricingSection }) {
  const plans = data.plans ?? [];
  const trustItems = data.trustItems ?? [];

  return (
    <section id="pricing" className="section-container scroll-mt-24">
        <SectionHeader
          badge={data.badge}
          heading={data.heading}
          subheading={data.subheading}
        />

        {/* Pricing grid */}
        <div className="mt-4xl grid items-start gap-lg sm:grid-cols-2 lg:grid-cols-4 lg:gap-xl">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const features = plan.features ?? [];
            return (
              <div key={plan.id} className="relative">
                {/* Popular badge on border */}
                {isPopular && (
                  <div className="absolute -top-4 lg:-top-6 inset-x-0 w-1/2 mx-auto text-center rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white z-10">
                      Popular
                  </div>
                )}
                <Card
                  className={`group flex flex-col transition-all duration-300 ${
                    isPopular
                      ? "ring-2 ring-brand shadow-xl lg:-translate-y-2" 
                      : "hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-brand"
                  }`}
                >
                <CardHeader className="pb-0">
                  <CardTitle className="text-base font-semibold text-primary">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-primary">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period ?? "/month"}
                    </span>
                  </div>

                  <div className="my-lg h-px w-full bg-border/60" />

                  <ul className="space-y-sm">
                    {features.map((feature) => (
                      <li key={feature.id} className="flex items-start gap-sm">
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                            isPopular
                              ? "bg-brand text-white"
                              : "bg-brand/10 text-brand"
                          }`}
                        >
                          <CircleCheck size={18} />
                        </span>
                        <span className="text-sm leading-snug text-muted-foreground">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    variant={isPopular ? "default" : "outline"}
                    className="w-full rounded-full"
                  >
                    <a href={plan.ctaHref ?? "#"}>
                      {plan.ctaLabel ?? "Get started"}
                    </a>
                  </Button>
                </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Trust line */}
        {trustItems.length > 0 && (
          <div className="mt-3xl flex flex-wrap items-center justify-center gap-x-xl gap-y-sm text-sm text-muted-foreground">
            {trustItems.map((item) => (
              <span key={item.id} className="flex items-center gap-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {item.text}
              </span>
            ))}
          </div>
        )}
    </section>
  );
}
