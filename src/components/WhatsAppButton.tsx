import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '254722840238';
  const message = encodeURIComponent('Hello, I would like to inquire about your legal services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  );
};

export default WhatsAppButton;
