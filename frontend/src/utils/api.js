export async function fetchProducts() {
  const res = await fetch(`${import.meta.env.BASE_URL}src/data/products.json`);
  if (!res.ok) throw new Error('Failed to load products');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function submitOrder() {
  return { success: true, message: 'Thank you! We will contact you shortly.' };
}

export async function submitContact() {
  return { success: true, message: 'Thank you! We will contact you shortly.' };
}

export async function trackOrder() {
  return { success: false, message: 'Tracking is temporarily unavailable. Please WhatsApp us directly.' };
}

export async function fetchSiteConfig() {
  return null;
}
