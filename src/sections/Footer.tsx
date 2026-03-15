import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        goldLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#booking' },
  ];

  const services = [
    'Civil Litigation',
    'Land & Property Law',
    'Family Law',
    'Business & Corporate Law',
    'Employment Law',
    'Criminal Defense',
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-navy text-ivory z-[130]"
    >
      {/* Gold Line */}
      <div
        ref={goldLineRef}
        className="h-px bg-gold/90 origin-left"
      />

      {/* Main Footer Content */}
      <div ref={contentRef} className="px-6 sm:px-8 lg:px-[7vw] py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-xl mb-4">
              Samson Bosire Mbeche <span className="text-gold">&</span> Associates
            </h3>
            <p className="text-sm text-ivory/60 mb-6 leading-relaxed">
              Strategic counsel. Clear communication. Resolute advocacy. Serving clients across Kenya with integrity and excellence.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-uppercase text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="label-uppercase text-gold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection('#services')}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="label-uppercase text-gold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+254722840238"
                  className="flex items-center gap-3 text-sm text-ivory/70 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  +254 722 840 238
                </a>
              </li>
              <li>
                <a
                  href="mailto:mbechesam@yahoo.com"
                  className="flex items-center gap-3 text-sm text-ivory/70 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  mbechesam@yahoo.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ivory/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-xs text-ivory/50 text-center lg:text-left">
              This website provides general information and does not constitute legal advice. No attorney-client relationship is formed by use of this site.
            </p>
            <div className="flex gap-6 text-xs text-ivory/50">
              <button className="hover:text-gold transition-colors">Privacy Policy</button>
              <button className="hover:text-gold transition-colors">Terms of Service</button>
            </div>
          </div>
          <p className="text-xs text-ivory/40 text-center mt-4">
            © 2026 Samson Bosire Mbeche & Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
