import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Insights = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.insight-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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

  const articles = [
    {
      image: '/images/article_thumb_01.jpg',
      category: 'Property Law',
      title: 'How to Resolve Land Disputes in Kenya',
      excerpt: 'A step-by-step guide to documentation, negotiation, and litigation for land-related conflicts.',
      date: 'March 10, 2026',
      readTime: '5 min read',
    },
    {
      image: '/images/article_thumb_02.jpg',
      category: 'Family Law',
      title: 'Steps to Filing for Divorce in Kenya',
      excerpt: 'What to prepare, what to expect, and how to protect your interests during divorce proceedings.',
      date: 'March 5, 2026',
      readTime: '7 min read',
    },
    {
      image: '/images/article_thumb_03.jpg',
      category: 'Employment Law',
      title: 'Employee Rights in Kenya',
      excerpt: 'Contracts, termination, and dispute resolution essentials every worker should know.',
      date: 'February 28, 2026',
      readTime: '6 min read',
    },
  ];

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[100]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="label-uppercase text-gold mb-4 block">Legal Resources</span>
            <h2 className="font-serif text-h2 text-navy">
              Insights
            </h2>
          </div>
          <p className="text-body text-navy/70 max-w-md mt-4 lg:mt-0">
            Practical guidance on Kenyan law—written in plain English to help you understand your rights.
          </p>
        </div>

        {/* Article Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {articles.map((article, index) => (
            <article
              key={index}
              className="insight-card group bg-ivory border border-navy/10 hover:border-gold/50 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-navy text-ivory text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-navy/50 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-navy/60 mb-4 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-navy font-semibold text-sm group/link">
                  <span className="border-b border-navy/30 group-hover/link:border-gold transition-colors">
                    Read more
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-navy font-semibold text-sm group">
            <span className="border-b border-navy/30 group-hover:border-gold transition-colors">
              View all articles
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Insights;
