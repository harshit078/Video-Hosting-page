import type { Core } from '@strapi/strapi';

type FeatureBlocksSection = {
  __component: 'sections.feature-blocks';
  badge: string;
  heading: string;
  subheading: string;
  items: Array<{
    eyebrow: string;
    heading: string;
    body: string;
    iconName: 'gauge' | 'palette' | 'shield' | 'chart';
    accentColor: 'blue' | 'purple' | 'emerald' | 'amber';
    colSpan: 'small' | 'large';
  }>;
};

// Defined the feature blocks section data
const featureBlocksSection: FeatureBlocksSection = {
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
        loginLabel: 'Log in',
        loginHref: '#login',
      },
      sections: [
        {
          __component: 'sections.hero',
          headline: 'Video hosting designed for speed, scale, and growth',
          subheadline:
            'Upload, manage, and stream high-quality video with global delivery, powerful analytics, and seamless playback across every device.',
          badgeTexts: [
            { text: 'Now with AI-powered transcoding' },
            { text: 'Global CDN in 180+ regions' },
            { text: 'New: Analytics 2.0 is live' },
          ],
          primaryCtaLabel: 'Get started',
          primaryCtaHref: '#signup',
          secondaryCtaLabel: 'Book a demo',
          secondaryCtaHref: '#demo',
          heroVideoUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          backgroundImageUrl:
            'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1920&q=80',
        },
        {
          __component: 'sections.logo-cloud',
          badge: 'Trusted globally',
          heading: 'Trusted by teams shipping video at scale',
          subheading: "Companies we've worked with and trusted by",
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
          badge: 'Testimonials',
          heading: 'Loved by engineering and product teams',
          subheading: 'See what our customers have to say about us.',
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
          __component: 'sections.compare',
          heading: 'Why modern teams choose Streamly',
          subheading: 'Streamly is designed to outperform traditional video hosting platforms.',
          productLabel: 'Streamly',
          competitorLabel: 'Other Companies',
          items: [
            { text: 'Video delivered instantly at any scale' },
            { text: 'No back-and-forth pricing emails' },
            { text: 'Only reach qualified, engaged viewers' },
            { text: 'All content managed in one dashboard' },
            { text: 'Focus on content, not infrastructure' },
            { text: 'Works while you sleep — 99.99% uptime' },
            { text: 'Get notified instantly on any platform' },
            { text: 'Custom link sharing with team members' },
            { text: 'Optimized playback across every device' },
          ],
        },
        {
          __component: 'sections.pricing',
          badge: 'Pricing',
          heading: 'Simple, transparent pricing',
          subheading: 'Start free, scale as you grow. No hidden fees.',
          plans: [
            {
              name: 'Starter',
              price: '$0',
              period: '/month',
              description: 'For side projects and experimentation',
              features: [
                { text: '10 GB storage' },
                { text: '100 GB bandwidth' },
                { text: 'Basic analytics' },
                { text: 'Email support' },
                { text: 'Limited API Access' },
                { text: 'Limited Contracts' },
              ],
              ctaLabel: 'Get started',
              ctaHref: '#signup',
              popular: false,
            },
            {
              name: 'Pro',
              price: '$49',
              period: '/month',
              description: 'For growing teams and businesses',
              features: [
                { text: '500 GB storage' },
                { text: '2 TB bandwidth' },
                { text: 'Advanced analytics' },
                { text: 'Priority support' },
                { text: 'Custom player branding' },
                { text: 'API access' },
              ],
              ctaLabel: 'Start free trial',
              ctaHref: '#signup',
              popular: true,
            },
            {
              name: 'Business',
              price: '$299',
              period: '/month',
              description: 'For enterprise needs and Business requirements',
              features: [
                { text: 'Uncapped storage' },
                { text: 'Live chat priority support' },
                { text: 'SSO integration' },
                { text: 'Custom contracts' },
                { text: 'Team Support On Call' },
                { text: 'SSO & Security integration' },
              ],
              ctaLabel: 'Get started',
              ctaHref: '#signup',
              popular: false,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: '/month',
              description: 'For large-scale video operations',
              features: [
                { text: 'Unlimited storage' },
                { text: 'Unlimited bandwidth' },
                { text: 'Dedicated support' },
                { text: 'SLA guarantee' },
                { text: 'Custom integrations' },
                { text: 'SSO & advanced security' },
              ],
              ctaLabel: 'Contact sales',
              ctaHref: '#contact',
              popular: false,
            },
          ],
          trustItems: [
            { text: 'No credit card required' },
            { text: 'Cancel anytime' },
            { text: '14-day free trial on Pro' },
            { text: 'Team support and contact' },
          ],
        },
        {
          __component: 'sections.faq',
          badge: 'FAQ',
          heading: 'Frequently asked questions',
          subheading: 'Everything you need to know about Streamly.',
          items: [
            {
              question: 'How does the free tier work?',
              answer:
                'The Starter plan is completely free with 10 GB of storage and 100 GB of monthly bandwidth. No credit card required. You can upgrade anytime as your needs grow.',
            },
            {
              question: 'What video formats do you support?',
              answer:
                'We support all major video formats including MP4, MOV, WebM, AVI, and MKV. Videos are automatically transcoded to adaptive bitrate HLS for optimal playback across all devices.',
            },
            {
              question: 'Can I customize the video player?',
              answer:
                'Yes! Pro and Enterprise plans include full player customization — colors, logo, controls, and more. You can also use our Player API for complete control over the viewing experience.',
            },
            {
              question: 'How fast is video delivery?',
              answer:
                'Videos are delivered through our global CDN with 180+ edge locations. Most viewers experience sub-second startup times regardless of their location.',
            },
            {
              question: 'Do you offer live streaming?',
              answer:
                'Live streaming is available on Pro and Enterprise plans. Features include low-latency streaming, DVR, and automatic recording for on-demand replay.',
            },
            {
              question: 'What kind of analytics do you provide?',
              answer:
                'We provide detailed analytics including play counts, watch time, engagement heatmaps, viewer geography, device breakdown, and drop-off points. Enterprise plans include custom event tracking and data export.',
            },
            {
              question: 'Is my content secure?',
              answer:
                'Absolutely. We offer signed URLs, domain restrictions, geo-blocking, and DRM protection. All data is encrypted in transit and at rest. Enterprise plans include additional compliance certifications.',
            },
          ],
        },
        {
          __component: 'sections.final-cta',
          heading: 'Ship video your viewers will love',
          subheadline: 'Start with our free tier — no credit card required. Upgrade when you scale.',
          ctaLabel: 'Get started',
          ctaHref: '#signup',
          note: 'No credit card required',
          trustItems: [
            { text: 'Enterprise-grade security' },
            { text: '99.99% uptime' },
            { text: 'Global CDN' },
          ],
        },
      ],
      footer: {
        tagline: 'The modern video hosting platform for businesses. Fast, secure, and reliable streaming for your content.',
        socialLinks: [
          { name: 'Facebook', url: 'https://facebook.com' },
          { name: 'Linkedin', url: 'https://linkedin.com' },
        ],
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
        legalLinks: [
          { label: 'Privacy Policy', href: '#privacy' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Cookies', href: '#cookies' },
        ],
      },
    },
  });

  strapi.log.info('Landing page seed complete');
}
