/** Site config — synced with includes/config.php */
export const SITE = {
  businessName: 'Sai Ram PalaKova',
  phone: '+918187007374',
  whatsapp: '918187007374',
  siteUrl: 'https://sairampalakova.com',
  instagram: 'https://www.instagram.com/sairampalakova/',
  youtube: 'https://www.youtube.com/@bharanighattamaneni9808',
  address: '1-22, Punnepalli, Nayudupeta, Andhra Pradesh 524126',
};

export const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+/g, '/').replace(/\/$/, '');

/** Resolve static asset path (images live in project /assets/) */
export function asset(path) {
  const clean = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}

export function waLink(text = 'Hello, I want to order Palakova') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
