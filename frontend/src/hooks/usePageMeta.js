import { useEffect } from 'react';
import { SITE } from '../config/site';

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.businessName}` : SITE.businessName;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (description) meta.content = description;
  }, [title, description]);
}
