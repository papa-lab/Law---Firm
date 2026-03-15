import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ years: 0, matters: 0, satisfaction: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
              onEnter: () => {
                // Animate counters
                gsap.to({}, {
                  duration: 2,
                  onUpdate: function() {
                    const progress = this.progress();
                    setCounters({
                      years: Math.round(15 * progress),
                      matters: Math.round(1200 * progress),
                      satisfaction: Math.round(98 * progress),
                    });
                  },
                });
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: counters.years, suffix: '+', label: 'Years of Practice' },
    { value: counters.matters, suffix: '+', label: 'Matters Advised' },
    { value: counters.satisfaction, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-40"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="max-w-2xl mb-16">
          <span className="label-uppercase text-gold mb-4 block">Our Track Record</span>
          <h2 className="font-serif text-h2 text-navy mb-4">
            Expertise you can measure.
          </h2>
          <p className="text-body text-navy/70 leading-relaxed">
            Years of practice, matters handled, and clients served—translated into steady advocacy and proven results.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item relative p-8 border border-navy/10 hover:border-gold/50 transition-colors duration-300"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/50" />
              
              <div className="font-serif text-5xl lg:text-6xl text-navy mb-2">
                {stat.value}
                <span className="text-gold">{stat.suffix}</span>
              </div>
              <p className="text-sm text-navy/60 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16">
          <div className="text-center">
            <p className="font-serif text-lg text-navy">Serving Clients Across Kenya</p>
            <p className="text-sm text-navy/60">Nairobi • Mombasa • Kisumu • Nakuru</p>
          </div>
          <div className="hidden lg:block w-px bg-navy/20" />
          <div className="text-center">
            <p className="font-serif text-lg text-navy">Professional Legal Representation</p>
            <p className="text-sm text-navy/60">Licensed & Regulated by LSK</p>
          </div>
          <div className="hidden lg:block w-px bg-navy/20" />
          <div className="text-center">
            <p className="font-serif text-lg text-navy">Confidential Consultations</p>
            <p className="text-sm text-navy/60">Your Privacy is Our Priority</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
