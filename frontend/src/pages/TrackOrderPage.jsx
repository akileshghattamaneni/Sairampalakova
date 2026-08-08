import { memo, useState } from 'react';
import Seo from '../components/common/Seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { waLink } from '../config/site';
import PageHeroPremium from '../components/layout/PageHeroPremium';

function TrackOrderPage() {
  usePageMeta('Track Your Order', 'Track your Sai Ram PalaKova order status using your mobile number.');
  useScrollReveal();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobile = e.target.mobile.value.trim();
    setLoading(true);
    setResults(null);
    setError('');
    try {
      const data = { success: false, message: 'Tracking is temporarily unavailable. Please WhatsApp us directly.' };
      if (!data.success || !data.orders?.length) {
        setError(data.message || 'No orders found.');
      } else {
        setResults(data.orders);
      }
    } catch {
      setError('Unable to track now. Please contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Track Your Order"
        description="Track your Sai Ram PalaKova order status using your mobile number."
        keywords="track palakova order, order status"
        canonical="/track-order"
      />
      <PageHeroPremium image="assets/images/ghee.jpg">
        <div className="container">
          <div className="reveal">
            <div className="hero-eyebrow mb-3">
              <span className="dot" /> Order Status
            </div>
            <h1 className="page-title">
              Track Your <span className="text-saffron" style={{ fontStyle: 'italic' }}>Order</span>
            </h1>
            <p className="page-subtitle">Enter the mobile number used when placing your order.</p>
          </div>
        </div>
      </PageHeroPremium>

      <section className="section-pad-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 reveal">
              <div className="contact-card-lux">
                <form id="trackOrderForm" noValidate onSubmit={handleSubmit}>
                  <label htmlFor="trackMobile" className="form-label">
                    Mobile Number *
                  </label>
                  <div className="input-group mb-3">
                    <input type="tel" className="form-control" id="trackMobile" name="mobile" placeholder="9490462947" required autoComplete="tel" />
                    <button type="submit" className="btn btn-saffron" disabled={loading}>
                      {loading ? '…' : 'Track'}
                    </button>
                  </div>
                </form>
                {loading && <div className="text-center py-4 text-muted-warm">Searching orders…</div>}
                {error && <div className="alert alert-warning mb-0">{error}</div>}
                {results && (
                  <div id="trackResults">
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--maroon)', fontSize: '1.25rem', marginBottom: '1rem' }}>Your Recent Orders</h3>
                    {results.map((o) => (
                      <div
                        key={o.id}
                        className="track-order-card mb-3 p-3"
                        style={{ background: 'var(--cream)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201,162,39,0.2)' }}
                      >
                        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
                          <strong style={{ color: 'var(--maroon)' }}>
                            #{o.id} · {o.product}
                          </strong>
                          <span className="badge" style={{ background: 'rgba(22,101,52,0.12)', color: '#166534', fontSize: '0.72rem' }}>
                            {o.status}
                          </span>
                        </div>
                        <div className="small text-muted-warm">
                          <div>
                            Qty: {o.quantity_kg} kg · {o.delivery}
                          </div>
                          <div>
                            Preferred: {o.preferred_date} · Placed: {o.placed_at}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="small text-muted-warm mt-3 mb-0">
                  Can&apos;t find your order?{' '}
                  <a href={waLink()} className="text-saffron fw-bold" target="_blank" rel="noopener noreferrer">
                    WhatsApp us
                  </a>{' '}
                  with your order details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(TrackOrderPage);
