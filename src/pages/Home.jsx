import Hero from '@sections/Hero.jsx';
import Trust from '@sections/Trust.jsx';
import Services from '@sections/Services.jsx';
import Packages from '@sections/Packages.jsx';
import Process from '@sections/Process.jsx';
import Projects from '@sections/Projects.jsx';
import Stack from '@sections/Stack.jsx';
import Testimonials from '@sections/Testimonials.jsx';
import About from '@sections/About.jsx';
import Faq from '@sections/Faq.jsx';
import Contact from '@sections/Contact.jsx';
import CtaBanner from '@components/CtaBanner.jsx';
import TrustStrip from '@components/TrustStrip.jsx';

/**
 * Conversion flow:
 *   Hero          — hook + identity
 *   TrustStrip    — compact proof anchor
 *   CTA banner    — early offramp
 *   Trust         — reduce friction immediately
 *   Services      — what I build
 *   Packages      — starting points (lead magnet)
 *   CTA banner    — capture indecision
 *   Process       — how I work
 *   Projects      — real client + concept demos
 *   Testimonials  — anchored client voice
 *   Stack         — tools and workflow
 *   About         — deeper trust
 *   FAQ           — friction removal
 *   CTA banner    — final push (strong)
 *   Contact       — action
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CtaBanner variant="afterHero" tone="soft" />
      <Trust />
      <Services />
      <Packages />
      <CtaBanner variant="afterPackages" tone="soft" />
      <Process />
      <Projects />
      <Testimonials />
      <Stack />
      <About />
      <Faq />
      <CtaBanner variant="beforeFooter" tone="strong" />
      <Contact />
    </>
  );
}
