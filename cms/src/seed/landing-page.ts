import type { Core } from '@strapi/strapi';

// Defined the feature blocks section data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const featureBlocksSection: any = {
  __component: 'sections.feature-blocks',
  badge: 'Features',
  heading: 'Packed with features for every need',
  subheading: 'Everything you need to host, secure, and grow your video reach',
  items: [
    {
      eyebrow: 'Adaptive streaming',
      heading: 'Lightning-fast global delivery',
      body:
        'Deliver buffer-free video experiences worldwide with a high-performance CDN optimized for every device and connection speed along with ultra-low startup time and Adaptive Bitrate streaming.',
      iconName: 'gauge',
      accentColor: 'blue',
      colSpan: 'small',
    },
    {
      eyebrow: 'Branded player',
      heading: 'Understand how your audience watches',
      body:
        'Track plays, watch time, engagement heatmaps, and viewer drop-off points for every video. Analyze performance by device, geography, or time range, and connect insights directly to your existing analytics workflow with API access for custom reporting and watch time analytics with heatmap.',
      iconName: 'palette',
      accentColor: 'purple',
      colSpan: 'large',
    },
    {
      eyebrow: 'Security',
      heading: 'Enterprise-grade security and reliability',
      body:
        'Protect your content with advanced security controls, private delivery options, 99.9% uptime infrastructure, signed playback URLs, private video hosting and infrastructure designed for scale',
      iconName: 'shield',
      accentColor: 'emerald',
      colSpan: 'large',
    },
    {
      eyebrow: 'Analytics',
      heading: 'Upload and manage videos effortlessly',
      body:
        'Organize, upload, and manage your entire video library from one intuitive dashboard built for modern content teams. Get ahead with features such as secure cloud storage and search filter.',
      iconName: 'chart',
      accentColor: 'amber',
      colSpan: 'small',
    },
  ],
};

export async function seedLandingPage(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::landing-page.landing-page').findFirst({
    status: 'published',
    populate: { sections: true },
  });

  if (existing) {
    const sections =
      (existing as { sections?: Array<{ __component?: string }> }).sections ?? [];
    const hasFeatureBlocks = sections.some((s) => s?.__component === 'sections.feature-blocks');

    if (!hasFeatureBlocks) {
      strapi.log.warn(
        'Existing landing page is missing the "sections.feature-blocks" section. ' +
          'The schema changed since this entry was created. ' +
          'To pick up the new section, delete cms/.tmp/data.db and restart Strapi to re-seed from scratch.',
      );
    } else {
      strapi.log.info('Landing page already populated — skipping seed');
    }
    return;
  }

  strapi.log.info('Seeding landing page with sample content');

  await strapi.documents('api::landing-page.landing-page').create({
    status: 'published',
    data: {
      navbar: {
        logoText: 'Streamly',
        links: [
          { label: 'Product', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Customers', href: '#testimonials' },
          { label: 'Docs', href: '#docs' },
        ],
        ctaLabel: 'Sign up',
        ctaHref: '#signup',
      },
      sections: [
        {
          __component: 'sections.hero',
          headline: 'Video hosting designed for speed, scale, and growth',
          subheadline:
            'Upload, manage, and stream high-quality video with global delivery, powerful analytics, and seamless playback across every device.',
          primaryCtaLabel: 'Get started',
          primaryCtaHref: '#signup',
          secondaryCtaLabel: 'Book a demo',
          secondaryCtaHref: '#demo',
          heroImageUrl:
            'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        },
        {
          __component: 'sections.logo-cloud',
          heading: 'Trusted by teams shipping video at scale',
          logos: [
            { name: 'Airbnb' },
            { name: 'Nike' },
            { name: 'Spinny' },
            { name: 'Paytm' },
            { name: 'Adobe Premiere Pro' },
          ],
        },
        featureBlocksSection,
        {
          __component: 'sections.testimonials',
          heading: 'Loved by engineering and product teams',
          items: [
            {
              quote:
                'We migrated 50TB of video in a weekend. Cut our delivery costs by 60% and improved playback start time across every device.',
              authorName: 'Priya Menon',
              authorTitle: 'VP Engineering, Lumen Media',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
            },
            {
              quote:
                'The dashboard is so clean our content team configures everything themselves. We barely touch it.',
              authorName: 'Jordan Whitfield',
              authorTitle: 'CTO, Castaway Inc.',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            },
            {
              quote:
                'Adaptive streaming just works. Our viewers on 3G see crisp video and our viewers on fiber see HDR — without any code changes.',
              authorName: 'Mei Lin',
              authorTitle: 'Head of Platform, Tilt',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
            },
            {
              quote:
                'Setup took less than an afternoon. The drop-in embed worked the first time and our marketing site shipped on schedule.',
              authorName: 'Omar Raza',
              authorTitle: 'CEO, Skylift Studios',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            },
            {
              quote:
                'Per-title encoding paid for itself in week one. Our average bitrate dropped 40% with zero perceptible quality loss.',
              authorName: 'Zainab Hussain',
              authorTitle: 'Platform Lead, Wavetop',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            },
            {
              quote:
                'Signed URLs plus geo restrictions gave us the compliance story we needed to close two enterprise deals.',
              authorName: 'Aliza Khan',
              authorTitle: 'Head of Product, Vault',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
            },
            {
              quote:
                'The analytics dashboard finally tells us which videos drive conversions. We retired three tools after switching.',
              authorName: 'Farhan Siddiqui',
              authorTitle: 'Marketing Director, Mira',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
            },
            {
              quote:
                'Captions, chapters, and custom CTAs in the player improved completion rates by 22% in the first month.',
              authorName: 'Sana Sheikh',
              authorTitle: 'Growth Lead, Kindle Labs',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
            },
            {
              quote:
                'Embedding video into our LMS used to be a quarterly nightmare. Now editors just paste a link and we ship.',
              authorName: 'Hassan Ali',
              authorTitle: 'Engineering Manager, Bridgeway',
              authorAvatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
            },
          ],
        },
        {
          __component: 'sections.final-cta',
          heading: 'Ship video your viewers will love',
          subheadline: 'Start with our free tier — no credit card required. Upgrade when you scale.',
          ctaLabel: 'Get started',
          ctaHref: '#signup',
        },
      ],
      footer: {
        columns: [
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Player', href: '#player' },
              { label: 'API', href: '#api' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '#about' },
              { label: 'Customers', href: '#customers' },
              { label: 'Blog', href: '#blog' },
              { label: 'Careers', href: '#careers' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Documentation', href: '#docs' },
              { label: 'Guides', href: '#guides' },
              { label: 'Changelog', href: '#changelog' },
              { label: 'Status', href: '#status' },
            ],
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy', href: '#privacy' },
              { label: 'Terms', href: '#terms' },
              { label: 'Security', href: '#security' },
            ],
          },
        ],
        copyright: '© 2026 Streamly Inc. All rights reserved.',
      },
    },
  });

  strapi.log.info('Landing page seed complete');
}
