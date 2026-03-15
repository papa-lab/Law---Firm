import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CaseStudies = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.case-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '12vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cases = [
    {
      image: '/images/case_01.jpg',
      title: 'High-Value Land Dispute Resolution',
      description: 'Negotiated settlement protecting client assets and title integrity in a complex multi-party boundary dispute.',
      category: 'Property Law',
      outcome: 'Successful Settlement',
    },
    {
      image: '/images/case_02.jpg',
      title: 'Family Estate Reorganization',
      description: 'Structured a comprehensive plan that preserved family relationships while meeting all legal requirements.',
      category: 'Family Law',
      outcome: 'Family Harmony Maintained',
    },
    {
      image: '/images/case_03.jpg',
      title: 'Corporate Compliance Program',
      description: 'Built policies and training frameworks to reduce regulatory exposure for a growing enterprise.',
      category: 'Corporate Law',
      outcome: 'Full Compliance Achieved',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[60]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="label-uppercase text-gold mb-4 block">Our Work</span>
            <h2 className="font-serif text-h2 text-navy">
              Selected Matters
            </h2>
          </div>
          <p className="text-body text-navy/70 max-w-md mt-4 lg:mt-0">
            Examples of our work—anonymized to protect client confidentiality while demonstrating our capabilities.
          </p>
        </div>

        {/* Case Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="case-card group bg-ivory border border-navy/10 hover:border-gold/50 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-navy text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                    {caseItem.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-navy mb-3 group-hover:text-gold transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-sm text-navy/60 mb-4 leading-relaxed">
                  {caseItem.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wider">
                    {caseItem.outcome}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-navy/40 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
