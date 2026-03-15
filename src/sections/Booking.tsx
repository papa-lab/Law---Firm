import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Clock, MapPin, Mail, Calendar, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const Booking = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    preferredDate: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
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

      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(`Legal Consultation Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Matter Type: ${formData.matterType}\n` +
      `Preferred Date: ${formData.preferredDate || 'Not specified'}\n\n` +
      `Message:\n${formData.message || 'No additional message'}`
    );
    
    // Open email client with pre-filled content
    window.open(`mailto:mbechesam@yahoo.com?subject=${subject}&body=${body}`, '_blank');
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        matterType: '',
        preferredDate: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+254 722 840 238', href: 'tel:+254722840238' },
    { icon: Mail, label: 'Email', value: 'mbechesam@yahoo.com', href: 'mailto:mbechesam@yahoo.com' },
    { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 9:00 AM – 5:00 PM' },
    { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya' },
  ];

  const matterTypes = [
    'Civil Litigation',
    'Land & Property Law',
    'Family Law',
    'Business & Corporate Law',
    'Employment Law',
    'Criminal Defense',
    'Other',
  ];

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative w-full bg-ivory py-20 lg:py-32 z-[120]"
    >
      <div className="px-6 sm:px-8 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div ref={leftRef} className="lg:w-[34vw]">
            <span className="label-uppercase text-gold mb-4 block">Get in Touch</span>
            <h2 className="font-serif text-h2 text-navy mb-6">
              Book a Consultation
            </h2>
            <p className="text-body text-navy/70 mb-8 leading-relaxed">
              Tell us what you need. We will respond within one business day to confirm availability and discuss your legal matter.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-navy/50 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-navy font-medium hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-navy font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="mt-10 p-6 border border-navy/10 bg-navy/5">
              <p className="label-uppercase text-navy/50 mb-4">Payment Methods</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-navy text-ivory text-xs px-3 py-2">M-Pesa</span>
                <span className="bg-navy text-ivory text-xs px-3 py-2">Visa</span>
                <span className="bg-navy text-ivory text-xs px-3 py-2">Mastercard</span>
                <span className="bg-navy text-ivory text-xs px-3 py-2">Bank Transfer</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            ref={formRef}
            className="lg:w-[47vw] bg-ivory border border-navy/10 p-6 lg:p-10"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-3">
                  Email Ready to Send!
                </h3>
                <p className="text-navy/70">
                  Your email client should have opened with your consultation request. If not, you can email directly to mbechesam@yahoo.com
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-navy/70 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-navy/20 focus:border-gold focus:ring-gold/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-navy/70 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-navy/20 focus:border-gold focus:ring-gold/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-navy/70 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-navy/20 focus:border-gold focus:ring-gold/20"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-navy/70 mb-2">
                      Matter Type *
                    </label>
                    <Select
                      value={formData.matterType}
                      onValueChange={(value) => setFormData({ ...formData, matterType: value })}
                    >
                      <SelectTrigger className="border-navy/20 focus:border-gold focus:ring-gold/20">
                        <SelectValue placeholder="Select matter type" />
                      </SelectTrigger>
                      <SelectContent>
                        {matterTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-navy/70 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
                    <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="border-navy/20 focus:border-gold focus:ring-gold/20 pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-navy/70 mb-2">
                    Tell us about your case
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-navy/20 focus:border-gold focus:ring-gold/20 min-h-[120px]"
                    placeholder="Briefly describe your legal matter..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-navy hover:bg-[#B8941F] font-semibold text-sm tracking-wider uppercase py-6 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Consultation Request
                </Button>

                <p className="text-xs text-navy/50 text-center">
                  This will open your email client with a pre-filled message to mbechesam@yahoo.com
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
