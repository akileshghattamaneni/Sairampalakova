import { memo, useState } from 'react';
import { FAQS } from '../../data/content';
import SectionHeader from '../../components/ui/SectionHeader';

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="section-pad faq-premium" id="faq">
      <div className="container">
        <SectionHeader eyebrow="FAQ" title={<>Questions &amp; <span className="accent">Answers</span></>} />
        <div className="row justify-content-center">
          <div className="col-lg-8 reveal">
            {FAQS.map(([q, a], i) => (
              <div key={q} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                <div
                  className="faq-question"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(i);
                    }
                  }}
                >
                  <span>{q}</span>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FaqSection);
