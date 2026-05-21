import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { getLandingPage } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await getLandingPage();

  return (
    <>
      {data.navbar && <Navbar data={data.navbar} />}
      <main>
        {data.sections?.map((section, i) => (
          <SectionRenderer
            key={`${section.__component}-${section.id ?? i}`}
            section={section}
          />
        ))}
      </main>
      {data.footer && <Footer data={data.footer} />}
    </>
  );
}
