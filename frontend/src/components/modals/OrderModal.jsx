import { memo, useCallback, useEffect, useState } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { submitOrder } from '../../utils/api';
import { SITE } from '../../config/site';

function OrderModal({ open, onClose, preset }) {
  const { products } = useProducts();
  const { cart, clearCart } = useCart();
  const { showToast } = useToast();
  const [status, setStatus] = useState({ message: '', type: '' });
  const [waHref, setWaHref] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const resetForm = useCallback(() => {
    setStatus({ message: '', type: '' });
    setWaHref('');
    setShowAddress(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    resetForm();
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [open, resetForm]);

  useEffect(() => {
    if (!open || !preset) return;
    const form = document.getElementById('orderForm');
    if (!form) return;
    const nameEl = form.querySelector('[name="product_name"]');
    const idEl = form.querySelector('[name="product_id"]');
    const qtyEl = form.querySelector('[name="quantity"]');
    if (nameEl && preset.name) nameEl.value = preset.name;
    if (idEl && preset.id) idEl.value = preset.id;
    if (qtyEl && preset.qty) qtyEl.value = preset.qty;
  }, [open, preset]);

  useEffect(() => {
    if (!open || preset || cart.length === 0) return;
    const form = document.getElementById('orderForm');
    if (!form) return;
    const first = cart[0];
    const nameEl = form.querySelector('[name="product_name"]');
    const idEl = form.querySelector('[name="product_id"]');
    const qtyEl = form.querySelector('[name="quantity"]');
    const notesEl = form.querySelector('[name="notes"]');
    if (nameEl && first.name) nameEl.value = first.name;
    if (idEl && first.id) idEl.value = first.id;
    if (qtyEl) qtyEl.value = first.qty || 1;
    if (notesEl) notesEl.value = `Cart: ${cart.map((i) => `${i.name} x ${i.qty} kg`).join(', ')}`;
  }, [open, preset, cart]);

  const buildWhatsapp = (fd) => {
    const product = fd.get('product_name');
    const name = fd.get('name');
    const mobile = fd.get('mobile');
    const quantity = fd.get('quantity');
    const delivery = fd.get('delivery_type');
    const address = fd.get('address') || '';
    const preferredDate = fd.get('preferred_date');
    const notes = fd.get('notes') || '';
    let msg = `New Order - ${SITE.businessName}%0A%0A`;
    msg += `Name: ${encodeURIComponent(name)}%0A`;
    msg += `Mobile: ${encodeURIComponent(mobile)}%0A`;
    msg += `Product: ${encodeURIComponent(product)}%0A`;
    msg += `Quantity: ${encodeURIComponent(quantity)} kg%0A`;
    msg += `Delivery: ${encodeURIComponent(delivery)}%0A`;
    if (address.trim()) msg += `Address: ${encodeURIComponent(address)}%0A`;
    msg += `Date: ${encodeURIComponent(preferredDate)}%0A`;
    if (notes.trim()) msg += `Notes: ${encodeURIComponent(notes)}%0A`;
    return `https://wa.me/${SITE.whatsapp}?text=${msg}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const name = (fd.get('name') || '').trim();
    const mobile = (fd.get('mobile') || '').trim();
    const quantity = parseFloat(fd.get('quantity'));
    const delivery = fd.get('delivery_type');
    const preferredDate = fd.get('preferred_date');

    if (!name || !mobile || !quantity || !delivery || !preferredDate) {
      setStatus({ message: 'Please fill all required fields.', type: 'danger' });
      return;
    }

    setSubmitting(true);
    try {
      const data = await submitOrder(fd);
      if (data.success) {
        setStatus({ message: 'Thank you! Your order has been placed. We will contact you shortly.', type: 'success' });
        showToast('Order placed successfully!', 'success');
        setWaHref(buildWhatsapp(fd));
        form.reset();
        clearCart();
      } else {
        setStatus({ message: data.message || 'Something went wrong. Please try again.', type: 'danger' });
      }
    } catch {
      setStatus({ message: 'Unable to submit now. Please WhatsApp us directly.', type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="modal fade show d-block" id="orderModal" tabIndex={-1} aria-labelledby="orderModalLabel" aria-modal="true" role="dialog">
      <div className="modal-backdrop fade show" onClick={onClose} aria-hidden="true" />
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content modal-premium">
          <div className="modal-header">
            <div>
              <p className="modal-eyebrow">Secure checkout</p>
              <h5 className="modal-title" id="orderModalLabel">Place Your Order</h5>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
          </div>
          <div className="modal-body p-4">
            <p className="text-muted-warm mb-4">Fill in your details. We confirm via call/WhatsApp and arrange delivery or pickup.</p>
            <form id="orderForm" noValidate onSubmit={handleSubmit}>
              <input type="hidden" name="product_id" id="orderProductId" defaultValue="" />
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="customerName" className="form-label">Your Name *</label>
                  <input type="text" className="form-control" id="customerName" name="name" placeholder="Ramesh Kumar" required autoComplete="name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="customerMobile" className="form-label">Mobile Number *</label>
                  <input type="tel" className="form-control" id="customerMobile" name="mobile" placeholder="9490462947" required autoComplete="tel" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="orderProductName" className="form-label">Product *</label>
                  <select
                    className="form-select"
                    id="orderProductName"
                    name="product_name"
                    required
                    defaultValue=""
                    onChange={(e) => {
                      const opt = e.target.selectedOptions[0];
                      const hid = document.getElementById('orderProductId');
                      if (hid) hid.value = opt?.dataset?.productId || '';
                    }}
                  >
                    <option value="">Select Product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name} data-product-id={p.id}>
                        {p.name} — ₹{Math.round(p.price)}/kg
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="quantity" className="form-label">Quantity (kg) *</label>
                  <input type="number" min="0.5" step="0.5" className="form-control" id="quantity" name="quantity" placeholder="1" required defaultValue="1" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="deliveryType" className="form-label">Delivery Type *</label>
                  <select
                    className="form-select"
                    id="deliveryType"
                    name="delivery_type"
                    required
                    defaultValue=""
                    onChange={(e) => setShowAddress(e.target.value === 'delivery')}
                  >
                    <option value="">Select</option>
                    <option value="pickup">Pickup from our location</option>
                    <option value="delivery">Home Delivery</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="preferredDate" className="form-label">Preferred Date *</label>
                  <input type="date" className="form-control" id="preferredDate" name="preferred_date" required min={minDate} />
                </div>
                <div className={`col-12 ${showAddress ? '' : 'd-none'}`} id="addressWrapper">
                  <label htmlFor="address" className="form-label">Delivery Address *</label>
                  <textarea className="form-control" id="address" name="address" rows={2} placeholder="Full delivery address" required={showAddress} />
                </div>
                <div className="col-12">
                  <label htmlFor="notes" className="form-label">Special Instructions</label>
                  <textarea className="form-control" id="notes" name="notes" rows={2} placeholder="Festival, bulk, or custom notes" />
                </div>
              </div>
              {status.message && (
                <div className={`alert mt-3 alert-${status.type}`} role="alert">
                  {status.message}
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
                <button type="button" className="btn btn-ghost" onClick={onClose}>
                  Cancel
                </button>
                <div className="d-flex gap-2 flex-wrap">
                  {waHref && (
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa-outline">
                      WhatsApp Order
                    </a>
                  )}
                  <button type="submit" className="btn btn-saffron btn-glow" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Order'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderModal);
