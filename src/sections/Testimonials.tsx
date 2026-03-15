import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '8vh', opacity: 0 },
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

  const testimonials = [
    {
      quote: 'Clear, calm, and relentless in protecting my interests. The team handled my business dispute with professionalism that exceeded my expectations.',
      author: 'Business Client',
      location: 'Nairobi',
      matter: 'Commercial Litigation',
    },
    {
      quote: 'They turned a complex property issue into a clear path forward. Their expertise in land law saved me from a potentially devastating loss.',
      author: 'Landowner',
      location: 'Kisumu',
      matter: 'Land Dispute',
    },
    {
      quote: 'Professional, respectful, and always available to explain the next step. They made a difficult family matter much easier to navigate.',
      author: 'Family Client',
      location: 'Mombasa',
      matter: 'Family Law',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[80]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="label-uppercase text-gold mb-4 block">Testimonials</span>
          <h2 className="font-serif text-h2 text-navy">
            What Clients Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative p-8 bg-ivory border border-navy/10 hover:border-gold/30 transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gold flex items-center justify-center">
                  <Quote className="w-4 h-4 text-navy" />
                </div>
              </div>

              {/* Content */}
              <div className="pt-4">
                <p className="font-serif text-lg text-navy leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="border-t border-navy/10 pt-4">
                  <p className="font-semibold text-navy">{testimonial.author}</p>
                  <div className="flex items-center gap-2 text-sm text-navy/60">
                    <span>{testimonial.location}</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span>{testimonial.matter}</span>
                  </div>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
