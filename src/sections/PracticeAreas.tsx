import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      blocksRef.current.forEach((block, index) => {
        if (!block) return;

        const image = block.querySelector('.practice-image');
        const text = block.querySelector('.practice-text');
        const line = block.querySelector('.practice-line');

        const isReversed = index % 2 === 1;

        // Image animation
        gsap.fromTo(
          image,
          { x: isReversed ? '6vw' : '-6vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );

        // Text animation
        gsap.fromTo(
          text,
          { x: isReversed ? '-6vw' : '6vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );

        // Line animation
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const practiceAreas = [
    {
      image: '/images/practice_land.jpg',
      title: 'Land & Property Law',
      description: 'Title verification, transfers, leases, boundary disputes, and due diligence—handled with precision. We protect your property rights through every transaction.',
      services: [
        'Land disputes resolution',
        'Title deed verification',
        'Boundary conflict resolution',
        'Property transfers',
        'Land ownership verification',
        'Lease agreements',
      ],
    },
    {
      image: '/images/practice_family.jpg',
      title: 'Family Law',
      description: 'Compassionate guidance through divorce, custody, adoption, and estate planning. We understand the sensitive nature of family matters.',
      services: [
        'Divorce proceedings',
        'Child custody matters',
        'Child support arrangements',
        'Adoption processes',
        'Domestic dispute resolution',
        'Estate planning',
      ],
    },
    {
      image: '/images/practice_corporate.jpg',
      title: 'Business & Corporate Law',
      description: 'Contracts, compliance, governance, and risk management for growing organizations. We help businesses thrive within the legal framework.',
      services: [
        'Business registration',
        'Company compliance',
        'Partnership agreements',
        'Contract drafting & review',
        'Legal advisory services',
        'Corporate governance',
      ],
    },
  ];

  const scrollToBooking = () => {
    const element = document.querySelector('#booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-50"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="label-uppercase text-gold mb-4 block">Detailed Services</span>
          <h2 className="font-serif text-h2 text-navy">
            How We Help
          </h2>
        </div>

        {/* Practice Area Blocks */}
        <div className="space-y-20 lg:space-y-32">
          {practiceAreas.map((area, index) => (
            <div
              key={index}
              ref={(el) => { blocksRef.current[index] = el; }}
              className={`flex flex-col ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-0 items-center`}
            >
              {/* Image */}
              <div className="practice-image w-full lg:w-[46vw] h-[300px] lg:h-[44vh] overflow-hidden">
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Vertical Line */}
              <div className="practice-line hidden lg:block w-px h-[44vh] bg-navy/20 origin-top mx-8" />

              {/* Text Content */}
              <div className="practice-text w-full lg:w-[40vw] lg:px-8">
                <h3 className="font-serif text-h3 text-navy mb-4">{area.title}</h3>
                <p className="text-body text-navy/70 mb-6 leading-relaxed">
                  {area.description}
                </p>

                {/* Services List */}
                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {area.services.map((service, sIndex) => (
                    <li
                      key={sIndex}
                      className="flex items-center gap-2 text-sm text-navy/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {service}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToBooking}
                  className="inline-flex items-center gap-2 text-navy font-semibold text-sm group"
                >
                  <span className="border-b border-navy/30 group-hover:border-gold transition-colors">
                    Consult on this matter
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
