import { SITE } from '../config/site';

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: SITE.businessName,
    url: 'https://example.com',
    description: 'Traditional buffalo milk Palakova and milk sweets from Nellore.',
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nellore',
      addressRegion: 'AP',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:00',
        closes: '20:00',
      },
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.businessName,
    url: 'https://example.com',
    sameAs: ['https://wa.me/919491077605'],
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.businessName,
    url: 'https://example.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://example.com/products',
      'query-input': 'required name=search_term_string',
    },
  };
}
