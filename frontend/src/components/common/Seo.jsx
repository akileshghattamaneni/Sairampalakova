import { Helmet } from 'react-helmet-async';
import { SITE } from '../../config/site';

export default function Seo({
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  schema,
}) {
  const pageTitle = title ? `${title} | ${SITE.businessName}` : SITE.businessName;
  
  // Resolve absolute canonical URL
  const base = `${import.meta.env.BASE_URL}`.replace(/\/$/, '');
  const path = canonical ? (canonical.startsWith('/') ? canonical : `/${canonical}`) : '';
  const canonicalUrl = `${SITE.siteUrl}${base}${path || '/'}`;

  // Resolve absolute Open Graph image path
  const cleanImage = image ? image.replace(/^\//, '') : 'assets/images/sweet_kova.jpg';
  const imageUrl = `${SITE.siteUrl}${import.meta.env.BASE_URL}${cleanImage}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || ''} />
      <meta name="keywords" content={keywords || ''} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={imageUrl} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
