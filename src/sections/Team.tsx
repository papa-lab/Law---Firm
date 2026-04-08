import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[70]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          {/* Section Header */}
          <span className="label-uppercase text-gold mb-4 block">About the Advocate</span>
          <h2 className="font-serif text-h2 text-navy mb-8">
            Samson Bosire Mbeche
          </h2>

          {/* Portrait */}
          <div className="relative w-64 h-64 mx-auto mb-8 overflow-hidden border-2 border-gold/50">
            <img
              src="/images/team_portrait_01.jpg"
              alt="Samson Bosire Mbeche"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <p className="text-gold font-medium mb-4">Managing Partner & Advocate</p>
          
          <p className="text-body text-navy/70 leading-relaxed mb-6">
            With over 15 years of experience in litigation and corporate law, Samson Bosire Mbeche 
            has built a reputation for delivering exceptional legal services to individuals, families, 
            and businesses across Kenya. His commitment to integrity, clear communication, and 
            resolute advocacy has helped countless clients navigate complex legal matters.
          </p>

          <p className="text-body text-navy/70 leading-relaxed mb-8">
            A member of the Law Society of Kenya and the East Africa Law Society, Samson is 
            also a Commissioner for Oaths. His practice areas include civil litigation, land and 
            property law, family law, business and corporate law, employment law, and criminal defense.
          </p>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:mbechesam@yahoo.com"
              className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 font-semibold text-sm tracking-wider uppercase hover:bg-[#B8941F] transition-colors"
            >
              <Mail className="w-4 h-4" />
              mbechesam@yahoo.com
            </a>
            <span className="inline-flex items-center gap-2 border border-navy/30 text-navy px-6 py-3 font-semibold text-sm tracking-wider uppercase">
              AI Assistant Available 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
