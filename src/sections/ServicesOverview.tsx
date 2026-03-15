import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gavel, Building2, Users, Briefcase, Scale, Shield, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Vertical line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Gavel,
      title: 'Civil Litigation',
      description: 'Dispute resolution that prioritizes clarity and outcomes. We represent your interests with determination.',
    },
    {
      icon: Building2,
      title: 'Land & Property Law',
      description: 'Title, transfers, leases, and boundary matters. Protecting your property rights with precision.',
    },
    {
      icon: Users,
      title: 'Family Law',
      description: 'Divorce, custody, adoption, and estate planning. Compassionate guidance through sensitive matters.',
    },
    {
      icon: Briefcase,
      title: 'Business & Corporate Law',
      description: 'Contracts, governance, and risk management. Supporting your business growth with sound legal advice.',
    },
    {
      icon: Scale,
      title: 'Employment Law',
      description: 'Workplace policies, disputes, and compliance. Protecting rights of employers and employees.',
    },
    {
      icon: Shield,
      title: 'Criminal Defense',
      description: 'Rights-focused representation and bail applications. Vigilant defense of your constitutional rights.',
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
      id="services"
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-20"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left Heading Block */}
          <div ref={headingRef} className="lg:w-[35vw] lg:pr-12">
            <span className="label-uppercase text-gold mb-4 block">What We Do</span>
            <h2 className="font-serif text-h2 text-navy mb-6">
              Our Practice Areas
            </h2>
            <p className="text-body text-navy/70 mb-8 leading-relaxed">
              We advise on disputes, transactions, and compliance—always with your long-term interests in mind. Our comprehensive legal services cover every aspect of Kenyan law.
            </p>
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 text-navy font-semibold text-sm group"
            >
              <span className="border-b border-navy/30 group-hover:border-gold transition-colors">
                Get Legal Assistance
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="hidden lg:block w-px bg-navy/20 origin-top"
            style={{ height: 'auto', minHeight: '400px' }}
          />

          {/* Right Services Grid */}
          <div ref={cardsRef} className="lg:w-[55vw] lg:pl-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card group p-6 border-b border-navy/10 hover:border-gold/50 transition-all duration-300 cursor-pointer"
                  onClick={scrollToBooking}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                      <service.icon className="w-5 h-5 text-navy/70 group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-navy mb-2 group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-navy/60 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
