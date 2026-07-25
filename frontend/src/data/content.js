import { asset } from '../config/site';

export const FEATURED_IDS = [1, 2, 5];

export const FEATURES = [
  { icon: '<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>', title: 'Kattela Poyyi', text: 'Wood-fire slow cooking brings authentic village flavour no modern method can replicate.' },
  { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: 'Pure Buffalo Milk', text: 'Fresh daily from village farmers — naturally high butter for creamy, melt-in-mouth texture.' },
  { icon: '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', title: 'Zero Chemicals', text: 'No preservatives, artificial flavours or colours — only pure ingredients and passion.' },
  { icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', title: 'Trusted Supply', text: 'Murli Krishna Sweets and Nellore shops rely on our daily supply for consistent quality.' },
  { icon: '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>', title: 'Daily Fresh', text: 'Limited batches every morning — maximum freshness, never mass-produced.' },
  { icon: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5" rx="1"/><path d="M12 22V7"/>', title: 'Festival Orders', text: 'Weddings, festivals, bulk supply — plan 2–3 days ahead for custom quantities.' },
];

export const PROCESS_STEPS = [
  ['Fresh Milk', 'Collected every morning from village buffalo farmers'],
  ['Wood-Fire', 'Poured into large vessels on kattela poyyi'],
  ['Slow Stir', 'Hours of continuous stirring for perfect texture'],
  ['Natural Set', 'Allowed to set naturally — no shortcuts'],
  ['Fresh Pack', 'Packed same day for maximum freshness'],
  ['Delivered', 'Dispatched to Nellore shops and homes daily'],
];

export const REVIEWS = [
  { initial: 'R', name: 'Ramesh Kumar', location: 'Nellore', text: "The taste takes me back to my grandmother's kitchen. Pure, rich, absolutely authentic — nothing like it in Nellore!" },
  { initial: 'S', name: 'Suresh Reddy', location: 'Sweet Shop Owner', text: 'We order Sweetless Kova every week. Quality is consistent, taste unmatched, delivery always on time.' },
  { initial: 'L', name: 'Lakshmi Devi', location: 'Nellore', text: "Ginni Kova for our daughter's wedding — every guest asked where we got it. The wood-fire flavour is special!" },
  { initial: 'M', name: 'Murli Krishna Team', location: 'Nellore', text: "Daily supply partner for years. Their PalaKova is the foundation of our shop's reputation." },
];

export const FAQS = [
  ['What makes your PalaKova different?', 'Prepared on kattela poyyi using pure buffalo milk collected fresh daily. No chemicals, preservatives, or artificial flavours — generations-old recipe.'],
  ['How fresh is it when I receive?', 'Every batch is made fresh daily and dispatched the same day. You receive PalaKova only hours old.'],
  ['Do you accept bulk orders?', 'Yes — weddings, festivals, corporate events. Contact us 2–3 days ahead via WhatsApp or phone.'],
  ['Minimum order quantity?', '500g (half kg) for most products. Ghee and Paneer depend on daily production — contact us.'],
  ['How long does it stay fresh?', '3–5 days at room temperature, 10–15 days refrigerated. Best taste within 2–3 days.'],
];

export const GALLERY_IMAGES = [
  'sweet_kova.jpg',
  'sweetless_palakova.jpg',
  'ginni-kova.jpg',
  'ghee.jpg',
  'Paneer.jpg',
  'sweet_kova.jpg',
];

export const ABOUT_GALLERY = [
  ['sweet_kova.jpg', 'Sweet Kova'],
  ['sweetless_palakova.jpg', 'Sweetless Kova'],
  ['ginni-kova.jpg', 'Ginni Kova'],
  ['ghee.jpg', 'Golden Ghee'],
  ['Paneer.jpg', 'Fresh Paneer'],
  ['sweet_kova.jpg', 'Daily preparation'],
];

export const STATS = [
  { count: 6, suffix: 'plus', label: 'Years of Legacy' },
  { count: 5, suffix: 'plus', label: 'Signature Products' },
  { count: 100, suffix: '%', label: 'Pure Milk' },
  { count: 0, suffix: 'none', label: 'Chemicals Used' },
];

export const FALLBACK_FEATURED = [
  { id: 1, name: 'Sweetless Kova', description: 'Pure buffalo milk kova without added sugar. Ideal for home sweets and diabetic-friendly recipes.', price: 480, image: asset('assets/images/sweetless_palakova.jpg') },
  { id: 2, name: 'Sweet Kova', description: 'Classic sweet PalaKova slow-cooked on kattela poyyi — rich, creamy, authentic village taste.', price: 520, image: asset('assets/images/sweet_kova.jpg') },
  { id: 5, name: 'Ginni Kova', description: 'Hand-shaped Ginni Kova — melt-in-mouth festive favourite loved by all ages.', price: 560, image: asset('assets/images/ginni-kova.jpg') },
];

export function productTags(name = '') {
  let tags = name.toLowerCase();
  if (tags.includes('ghee')) tags += ' ghee';
  if (tags.includes('paneer')) tags += ' paneer';
  if (tags.includes('kova') || tags.includes('palakova')) tags += ' kova';
  return tags;
}
