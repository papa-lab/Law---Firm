import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, ClipboardList, Gavel, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        }
      );

      // Steps animation
      const steps = stepsRef.current?.querySelectorAll('.process-step');
      if (steps) {
        gsap.fromTo(
          steps,
          { x: '6vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
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

  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Consultation',
      description: 'We listen, assess, and outline your options. This initial meeting helps us understand your situation and goals.',
    },
    {
      number: '02',
      icon: ClipboardList,
      title: 'Strategy',
      description: 'We build a plan with clear timelines and costs. You will know exactly what to expect at every stage.',
    },
    {
      number: '03',
      icon: Gavel,
      title: 'Action',
      description: 'We represent you with discipline and communication. Regular updates keep you informed of progress.',
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Resolution',
      description: 'We close matters cleanly and document everything. Our goal is your complete satisfaction.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[90]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Heading */}
          <div className="lg:w-[35vw]">
            <span className="label-uppercase text-gold mb-4 block">Our Approach</span>
            <h2 className="font-serif text-h2 text-navy mb-6">
              How We Work
            </h2>
            <p className="text-body text-navy/70 leading-relaxed mb-8">
              A simple, transparent process—from first contact to resolution. We believe in keeping our clients informed and involved every step of the way.
            </p>
            <div className="hidden lg:block p-6 border border-navy/10 bg-navy/5">
              <p className="font-serif text-lg text-navy mb-2">
                "Your case deserves personal attention."
              </p>
              <p className="text-sm text-navy/60">
                Every client receives dedicated support throughout their legal journey.
              </p>
            </div>
          </div>

          {/* Right Timeline */}
          <div className="lg:w-[50vw] relative">
            {/* Vertical Line */}
            <div
              ref={lineRef}
              className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-navy/20 origin-top"
            />

            {/* Steps */}
            <div ref={stepsRef} className="space-y-8 lg:space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="process-step relative pl-16 lg:pl-20"
                >
                  {/* Number Badge */}
                  <div className="absolute left-0 top-0 w-12 h-12 lg:w-16 lg:h-16 bg-gold flex items-center justify-center">
                    <span className="font-serif text-xl lg:text-2xl text-navy font-semibold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-xl text-navy">{step.title}</h3>
                    </div>
                    <p className="text-body text-navy/70 leading-relaxed">
                      {step.description}
                    </p>
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

export default Process;
