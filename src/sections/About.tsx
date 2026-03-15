import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: '-3vh', scale: 1.04, opacity: 0.85 },
        {
          y: '3vh',
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      // Quote card animation
      gsap.fromTo(
        quoteCardRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteCardRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Text column animation
      gsap.fromTo(
        textRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Gold line animation
      gsap.fromTo(
        goldLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: goldLineRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const credentials = [
    { icon: Award, text: 'Law Society of Kenya' },
    { icon: Users, text: 'East Africa Law Society' },
    { icon: FileCheck, text: 'Commissioner for Oaths' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-0 z-30"
    >
      {/* Top Full-bleed Image */}
      <div ref={imageRef} className="relative w-full h-[40vh] lg:h-[52vh] overflow-hidden">
        <img
          src="/images/about_desk.jpg"
          alt="Legal desk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory/80" />
      </div>

      {/* Content */}
      <div className="relative px-6 sm:px-8 lg:px-[7vw] -mt-20 lg:-mt-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Quote Card */}
          <div
            ref={quoteCardRef}
            className="lg:w-[46vw] bg-ivory border border-navy/20 p-8 lg:p-12 relative z-10"
          >
            <div className="text-gold text-6xl font-serif leading-none mb-4">"</div>
            <blockquote className="font-serif text-xl lg:text-2xl text-navy leading-relaxed mb-6">
              We believe legal advice should be precise, practical, and delivered with integrity.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="/images/team_portrait_01.jpg"
                  alt="Samson Bosire Mbeche"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-navy">Samson Bosire Mbeche</p>
                <p className="text-sm text-navy/60">Managing Partner</p>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div ref={textRef} className="lg:w-[35vw] lg:pt-20">
            <span className="label-uppercase text-gold mb-4 block">About the Firm</span>
            <h3 className="font-serif text-h3 text-navy mb-6">
              A firm built on clarity and commitment.
            </h3>
            <p className="text-body text-navy/70 mb-6 leading-relaxed">
              Founded to serve individuals, families, and businesses across Kenya, we combine rigorous preparation with straightforward counsel. Our approach is collaborative, responsive, and always focused on protecting your interests.
            </p>
            <p className="text-body text-navy/70 mb-8 leading-relaxed">
              With over 15 years of legal practice, we have built a reputation for excellence in litigation, property law, family matters, and corporate advisory. Every case receives our full attention and the benefit of our extensive experience.
            </p>

            {/* Credentials */}
            <div className="space-y-4">
              <p className="label-uppercase text-navy/50">Professional Affiliations</p>
              <div className="flex flex-wrap gap-4">
                {credentials.map((cred, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-navy/70"
                  >
                    <cred.icon className="w-4 h-4 text-gold" />
                    <span>{cred.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gold Line */}
      <div className="px-6 sm:px-8 lg:px-[7vw] mt-16 lg:mt-24">
        <div
          ref={goldLineRef}
          className="h-px bg-gold/85 origin-left"
        />
      </div>
    </section>
  );
};

export default About;
