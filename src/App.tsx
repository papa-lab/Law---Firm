import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ServicesOverview from './sections/ServicesOverview';
import About from './sections/About';
import Expertise from './sections/Expertise';
import PracticeAreas from './sections/PracticeAreas';
import CaseStudies from './sections/CaseStudies';
import Team from './sections/Team';
import Process from './sections/Process';
import Insights from './sections/Insights';
import FAQ from './sections/FAQ';
import Booking from './sections/Booking';
import Footer from './sections/Footer';
import AIAssistant from './components/AIAssistant';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-ivory">
      {/* Grain overlay for texture */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <ServicesOverview />
        <About />
        <Expertise />
        <PracticeAreas />
        <CaseStudies />
        <Team />
        <Process />
        <Insights />
        <FAQ />
        <Booking />
        <Footer />
      </main>
      
      {/* AI assistant */}
      <AIAssistant />
    </div>
  );
}

export default App;
