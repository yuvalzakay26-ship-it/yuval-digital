import Hero from '@sections/Hero.jsx';
import Trust from '@sections/Trust.jsx';
import Services from '@sections/Services.jsx';
import Packages from '@sections/Packages.jsx';
import Process from '@sections/Process.jsx';
import Projects from '@sections/Projects.jsx';
import Stack from '@sections/Stack.jsx';
import Authority from '@sections/Authority.jsx';
import Testimonials from '@sections/Testimonials.jsx';
import About from '@sections/About.jsx';
import Faq from '@sections/Faq.jsx';
import Contact from '@sections/Contact.jsx';
import CtaBanner from '@components/CtaBanner.jsx';

/**
 * Conversion flow:
 *   Hero          — hook + identity
 *   CTA banner    — early offramp
 *   Trust         — reduce friction immediately
 *   Services      — what I build
 *   Packages      — starting points (lead magnet)
 *   CTA banner    — capture indecision
 *   Process       — how I work
 *   Projects      — proof / case studies
 *   Stack         — tools and workflow
 *   Authority     — why work with me now
 *   Testimonials  — work standards
 *   About         — deeper trust
 *   FAQ           — friction removal
 *   CTA banner    — final push (strong)
 *   Contact       — action
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CtaBanner variant="afterHero" tone="soft" />
      <Trust />
      <Services />
      <Packages />
      <CtaBanner variant="afterPackages" tone="soft" />
      <Process />
      <Projects />
      <Stack />
      <Authority />
      <Testimonials />
      <About />
      <Faq />
      <CtaBanner variant="beforeFooter" tone="strong" />
      <Contact />
    </>
  );
}
