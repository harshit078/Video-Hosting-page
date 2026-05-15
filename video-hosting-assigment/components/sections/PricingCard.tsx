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
    <section className="relative bg-gradient-to-b from-background via-muted/30 to-background py-6xl lg:py-7xl">
      <div className="section-container">
        <SectionHeader
          badge={data.badge}
          heading={data.heading}
          subheading={data.subheading}
        />

        {/* Pricing grid */}
        <div className="mt-4xl grid items-start gap-lg justify-center mx-auto sm:w-full md:w-3/4 lg:w-2/3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-xl">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const features = plan.features ?? [];
            return (
              <Card
                key={plan.id}
                className={`group relative flex flex-col transition-all duration-300 ${
                  isPopular
                    ? "ring-2 ring-brand shadow-xl lg:-translate-y-2"
                    : "hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-brand"
                }`}
              >
                {/* Popular ribbon */}
                {isPopular && (
                  <div className="absolute left-1/4 translate-x-1/2">
                    <span className="rounded-full bg-brand px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

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
            );
          })}
        </div>

        {/* Trust line */}
        {trustItems.length > 0 ? (
          <div className="mt-3xl flex flex-wrap items-center justify-center gap-x-xl gap-y-sm text-sm text-muted-foreground">
            {trustItems.map((item) => (
              <span key={item.id} className="flex items-center gap-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {item.text}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-3xl flex flex-wrap items-center justify-center gap-x-xl gap-y-sm text-sm text-muted-foreground">
            <span className="flex items-center gap-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {trustItems.map((item) => (
                <span key={item.id} className="flex items-center gap-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {item.text}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
