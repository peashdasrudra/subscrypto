'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Search } from 'lucide-react';
import { faqItems } from '@/lib/content';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default for immediate context
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="section-spacing relative overflow-hidden">
      <div className="container-main relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Frequently Asked Questions.
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Everything you need to know about the 18-month student pass, bKash payments, and activation timeline.
          </p>

          {/* Quick Filter Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions (e.g. bKash, storage, timeline)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 glass-panel">
              <p className="text-slate-400 text-sm">No matching questions found.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-indigo-400 hover:underline"
              >
                Reset search
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`glass-panel border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-indigo-500/40 bg-navy-900/90' : 'border-white/[0.07] hover:border-white/[0.14]'
                  }`}
                >
                  <button
                    className="accordion-trigger w-full text-left flex items-center justify-between p-5 md:p-6 cursor-pointer"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-btn-${index}`}
                  >
                    <span className="pr-4 text-sm md:text-base font-bold text-white leading-snug">
                      {item.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-500/20 text-indigo-400' : 'text-slate-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className={`accordion-content ${isOpen ? 'open' : ''}`}
                  >
                    <div className="pt-1 pb-5 md:pb-6 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/[0.06]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            Still have questions before placing your order?
          </p>
          <a
            href="https://wa.me/8801533679773"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat directly on WhatsApp (+880 1533-679773)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
