import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Scale, Building2, Users, Briefcase, Gavel, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Hero image panel entrance
      tl.fromTo(
        imageRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        0
      );

      // Headline words entrance
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
          0.2
        );
      }

      // Subheadline entrance
      tl.fromTo(
        subheadlineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.6
      );

      // CTA buttons entrance
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.75
      );

      // Gold line entrance
      tl.fromTo(
        goldLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, transformOrigin: 'left' },
        0.5
      );

      // Services icons entrance
      const serviceItems = servicesRef.current?.querySelectorAll('.service-item');
      if (serviceItems) {
        tl.fromTo(
          serviceItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          0.9
        );
      }

      // Scroll-driven exit animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Exit phase (70% - 100%)
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;

            gsap.set(headlineRef.current, {
              x: -18 * exitProgress + 'vw',
              opacity: exitProgress < 0.85 ? 1 - exitProgress * 0.75 : 0.25 - (exitProgress - 0.85) * 1.67,
            });

            gsap.set(imageRef.current, {
              x: 10 * exitProgress + 'vw',
              opacity: exitProgress < 0.85 ? 1 - exitProgress * 0.65 : 0.35 - (exitProgress - 0.85) * 2.33,
            });

            gsap.set(ctaRef.current, {
              y: 6 * exitProgress + 'vh',
              opacity: exitProgress < 0.75 ? 1 - exitProgress * 0.8 : 0.2 - (exitProgress - 0.75) * 2.67,
            });
          } else {
            gsap.set(headlineRef.current, { x: 0, opacity: 1 });
            gsap.set(imageRef.current, { x: 0, opacity: 1 });
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
          }
        },
        onLeaveBack: () => {
          gsap.set(headlineRef.current, { x: 0, opacity: 1 });
          gsap.set(imageRef.current, { x: 0, opacity: 1 });
          gsap.set(ctaRef.current, { y: 0, opacity: 1 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Gavel, label: 'Civil Litigation' },
    { icon: Building2, label: 'Land & Property' },
    { icon: Users, label: 'Family Law' },
    { icon: Briefcase, label: 'Business Law' },
    { icon: Scale, label: 'Employment' },
    { icon: Shield, label: 'Criminal Defense' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-ivory overflow-hidden z-10"
    >
      {/* Hero Image Panel (Right) */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 w-full lg:w-[48vw] h-full"
      >
        <img
          src="/images/hero_library.jpg"
          alt="Law Library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/50 to-transparent lg:hidden" />
      </div>

      {/* Gold Line at bottom of image */}
      <div
        ref={goldLineRef}
        className="hidden lg:block absolute left-[52vw] top-[92vh] w-[48vw] h-px bg-gold/90"
      />

      {/* Content (Left) */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 lg:px-[7vw]">
        {/* Micro-label */}
        <div className="mb-6 lg:mb-8">
          <span className="label-uppercase text-navy/60">
            Samson Bosire Mbeche & Associates — Advocates
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="max-w-[40vw] hidden lg:block">
          <h1 className="font-serif text-hero text-navy leading-[0.95]">
            <span className="word inline-block">Trusted</span>{' '}
            <span className="word inline-block">Legal</span>
            <br />
            <span className="word inline-block">Representation</span>{' '}
            <span className="word inline-block">for</span>
            <br />
            <span className="word inline-block text-gold">Individuals</span>{' '}
            <span className="word inline-block">&</span>{' '}
            <span className="word inline-block text-gold">Businesses</span>
          </h1>
        </div>

        {/* Mobile Headline */}
        <div className="lg:hidden max-w-full">
          <h1 className="font-serif text-[clamp(32px,8vw,48px)] text-navy leading-[0.95]">
            Trusted Legal
            <br />
            Representation
            <br />
            <span className="text-gold">for Individuals</span>
            <br />
            <span className="text-gold">& Businesses</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div
          ref={subheadlineRef}
          className="mt-6 lg:mt-8 max-w-[34vw] hidden lg:block"
        >
          <p className="text-body text-navy/70 leading-relaxed">
            Strategic counsel, clear communication, and resolute advocacy—built on integrity and results. Serving clients across Kenya with professional legal representation.
          </p>
        </div>

        {/* Mobile Subheadline */}
        <div className="mt-4 lg:hidden max-w-full">
          <p className="text-base text-navy/70 leading-relaxed">
            Strategic counsel, clear communication, and resolute advocacy—built on integrity and results.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('#booking')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToSection('#services')}
            className="btn-secondary"
          >
            Explore Services
          </button>
        </div>

        {/* Quick Services */}
        <div
          ref={servicesRef}
          className="mt-12 lg:mt-16 hidden lg:flex items-center gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item flex flex-col items-center gap-2 group cursor-pointer"
              onClick={() => scrollToSection('#services')}
            >
              <div className="w-12 h-12 rounded-full border border-navy/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                <service.icon className="w-5 h-5 text-navy/70 group-hover:text-gold transition-colors" />
              </div>
              <span className="text-xs text-navy/60 text-center leading-tight">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges - mobile only */}
      <div className="lg:hidden absolute bottom-8 left-6 right-6 flex justify-between text-xs text-navy/50">
        <span>Serving Kenya</span>
        <span>Professional</span>
        <span>Confidential</span>
      </div>
    </section>
  );
};

export default Hero;
