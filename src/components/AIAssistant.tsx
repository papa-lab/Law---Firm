import { useMemo, useState } from 'react';
import { Bot, MessageSquare, Send, X } from 'lucide-react';

const knowledgeBase: Record<string, string> = {
  consultation:
    'You can book a consultation in the contact section by sharing your name, email, matter type, preferred date, and case details.',
  services:
    'We handle civil litigation, land and property matters, family law, business and corporate law, employment issues, and criminal defense.',
  fees:
    'Legal fees depend on complexity. During your first consultation, we provide a transparent breakdown of estimated costs.',
  location:
    'The firm is based in Nairobi and serves clients across Kenya, including remote consultations where appropriate.',
  response:
    'Consultation requests are typically reviewed within one business day.',
};

const fallback =
  'I can help with consultations, legal services, fees, timelines, and location details. Try asking about “services”, “fees”, or “consultation”.';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I\'m your AI legal assistant. Ask me about services, consultation steps, timelines, or fees.',
    },
  ]);

  const keywords = useMemo(() => Object.keys(knowledgeBase), []);

  const getReply = (question: string) => {
    const lower = question.toLowerCase();
    const key = keywords.find((item) => lower.includes(item));
    return key ? knowledgeBase[key] : fallback;
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const response = getReply(trimmed);

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: response },
    ]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[210] w-14 h-14 rounded-full bg-navy text-ivory shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Open AI assistant"
      >
        {isOpen ? <X className="w-6 h-6 mx-auto" /> : <MessageSquare className="w-6 h-6 mx-auto" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[210] w-[min(24rem,calc(100vw-3rem))] border border-navy/20 bg-ivory shadow-2xl">
          <div className="flex items-center gap-3 border-b border-navy/10 px-4 py-3 bg-navy text-ivory">
            <Bot className="w-5 h-5 text-gold" />
            <div>
              <p className="text-sm font-semibold">AI Assistant</p>
              <p className="text-xs text-ivory/80">Instant help for common legal questions</p>
            </div>
          </div>

          <div className="h-72 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto bg-gold/20 text-navy'
                    : 'bg-navy/5 text-navy/90'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-navy/10 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about services, fees, or booking"
              className="flex-1 border border-navy/20 bg-ivory px-3 py-2 text-sm outline-none focus:border-gold"
            />
            <button
              onClick={sendMessage}
              className="bg-gold text-navy px-3 py-2 hover:bg-[#B8941F] transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
