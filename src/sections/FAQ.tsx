import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemsRef.current,
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

  const faqs = [
    {
      question: 'What should I bring to the first consultation?',
      answer: 'Please bring any relevant documents related to your case, including contracts, correspondence, court documents, identification, and a written summary of your situation. The more information you provide, the better we can assess your case.',
    },
    {
      question: 'How are legal fees structured?',
      answer: 'Our fees vary depending on the nature and complexity of the matter. We offer hourly rates, fixed fees for certain services, and contingency arrangements where appropriate. We will discuss all costs transparently during your initial consultation.',
    },
    {
      question: 'Do you handle matters outside Nairobi?',
      answer: 'Yes, we serve clients across Kenya including Mombasa, Kisumu, Nakuru, and other major towns. We can conduct consultations via phone or video call and travel to court when necessary.',
    },
    {
      question: 'How long will my case take?',
      answer: 'Case duration depends on many factors including complexity, court schedules, and whether the matter settles or goes to trial. We will provide a realistic timeline estimate after reviewing your specific situation.',
    },
    {
      question: 'Can you represent me in court?',
      answer: 'Yes, our advocates are fully licensed to represent clients in all Kenyan courts, from Magistrate Courts to the Court of Appeal. We have extensive litigation experience across various practice areas.',
    },
    {
      question: 'Is my consultation confidential?',
      answer: 'Absolutely. All consultations are strictly confidential under attorney-client privilege. We take your privacy seriously and maintain the highest standards of professional confidentiality.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[110]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="label-uppercase text-gold mb-4 block">Common Questions</span>
          <h2 className="font-serif text-h2 text-navy">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Grid */}
        <div
          ref={itemsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border border-navy/10 hover:border-gold/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 flex items-start justify-between text-left"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="font-serif text-lg text-navy pr-4">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-navy/50 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pl-14">
                  <p className="text-body text-navy/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-navy/60 mb-4">Still have questions?</p>
          <a
            href="tel:+254722840238"
            className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 font-semibold text-sm tracking-wider uppercase hover:bg-[#B8941F] transition-colors"
          >
            Call Us: 0722 840 238
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
