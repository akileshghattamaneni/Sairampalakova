import { memo, useState } from 'react';
import Seo from '../components/common/Seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGsapAnimations } from '../hooks/useGsapAnimations';
import { useToast } from '../context/ToastContext';
import { SITE, waLink } from '../config/site';

function ContactPage() {
  usePageMeta('Contact Us — Orders & Enquiries', 'Call, WhatsApp, or message Sai Ram PalaKova for orders, bulk supply, and delivery enquiries in Nellore.');
  useScrollReveal();
  useGsapAnimations();
  const { showToast } = useToast();
  const [status, setStatus] = useState({ message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const mobile = form.mobile.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !mobile || !subject || !message) {
      setStatus({ message: 'Please fill in all required fields.', type: 'danger' });
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      const formData = new FormData(form);
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (res.ok) {
        setStatus({ message: 'Thank you! We will reach out shortly.', type: 'success' });
        showToast('Message sent! We will contact you via phone/WhatsApp.', 'success');
        form.reset();
      } else {
        throw new Error('Netlify form submission failed');
      }
    } catch {
      setStatus({ message: 'Unable to send. Please WhatsApp us directly.', type: 'danger' });
      showToast('Unable to send. Please WhatsApp us directly.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Us — Orders & Enquiries"
        description="Call, WhatsApp, or message Sai Ram PalaKova for orders, bulk supply, and delivery enquiries in Nellore."
        keywords="contact palakova, order palakova, Nellore sweets contact"
        canonical="/contact"
      />
      
      {/* 1. Hero Header */}
      <section className="page-hero-premium" style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-lg-8 reveal-left">
              <div className="hero-eyebrow mb-2">
                <span className="dot" /> We're Here to Help
              </div>
              <h1 className="page-title" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                Contact <span className="text-saffron" style={{ fontStyle: 'italic' }}>Us</span>
              </h1>
              <p className="page-subtitle mb-0" style={{ fontSize: '1rem' }}>Place bulk orders or ask any questions directly via WhatsApp or Form.</p>
            </div>
            <div className="col-lg-4 reveal-right text-lg-end">
              <a href={waLink("Hello, I want to make an enquiry")} className="btn btn-saffron btn-md" target="_blank" rel="noopener noreferrer">
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Classic Split Section */}
      <section className="section-pad bg-cream-soft">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            {/* Left Column: Form */}
            <div className="col-lg-6 reveal-left">
              <form id="contactForm" noValidate className="contact-card-lux h-100 p-4" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <div className="d-none">
                  <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  Send an <span className="accent">Enquiry</span>
                </h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="contactName" className="form-label">Name *</label>
                    <input type="text" className="form-control" id="contactName" name="name" required autoComplete="name" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contactMobile" className="form-label">Mobile *</label>
                    <input type="tel" className="form-control" id="contactMobile" name="mobile" required autoComplete="tel" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="contactSubject" className="form-label">Subject *</label>
                    <input type="text" className="form-control" id="contactSubject" name="subject" required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="contactMessage" className="form-label">Message *</label>
                    <textarea className="form-control" id="contactMessage" name="message" rows={4} required placeholder="Sweets, quantity, delivery address details..." />
                  </div>
                </div>
                {status.message && <div className={`alert alert-${status.type} mt-3`} role="alert">{status.message}</div>}
                <button type="submit" className="btn btn-saffron w-100 btn-glow mt-4" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Right Column: Business Info & Nested Map */}
            <div className="col-lg-6 reveal-right" id="map">
              <div className="contact-card-lux h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon)', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                    Visit &amp; <span className="accent">Call</span>
                  </h2>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text)', marginBottom: '1rem' }}>
                    <strong>Phone:</strong> <a href={`tel:${SITE.phone}`} className="text-saffron fw-bold">{SITE.phone}</a> <br />
                    <strong>WhatsApp:</strong> <a href={waLink()} className="text-saffron fw-bold" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a> <br />
                    <strong>Open Hours:</strong> Daily 6:00 AM – 8:00 PM <br />
                    <strong>Location:</strong> {SITE.address}
                  </p>
                </div>

                {/* Location Map Nested Directly Inside the Card */}
                <div className="map-frame mt-2 shadow-sm" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(201,162,39,0.2)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.122392948353!2d79.87230387323055!3d13.951317292646719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d1b5054f1ee77%3A0x7d10736d613c800d!2sSai%20ram%20Palakova%2C%20Gattamaneni%20Nilayam!5e0!3m2!1sen!2sin!4v1772728390272!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sai Ram PalaKova location map card"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ContactPage);
