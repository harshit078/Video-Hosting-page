import type { ReactNode } from 'react';

type Props = {
  badge?: string;
  heading: ReactNode;
  subheading?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  badge,
  heading,
  subheading,
  align = 'center',
  className = '',
}: Props) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/5 px-4 py-1.5 text-sm font-semibold text-brand ring-1 ring-inset ring-brand/20">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {badge}
        </div>
      )}
      <h2 className=" font-medium text-4xl text-center font-display lg:text-5xl">
        {heading}
      </h2>
      {subheading && (
        <p className="text-lg text-muted-foreground">{subheading}</p>
      )}
    </div>
  );
}
