import { memo } from 'react';
import { SITE } from '../../config/site';

function OfferBanner() {
  const items = [
    '✦ Fresh batches on Kattela Poyyi every morning',
    '✦ 100% Pure Buffalo Milk — Zero Chemicals',
    '✦ Daily supply to Murli Krishna Sweets, Nellore',
    '✦ Festival & bulk orders welcome',
    `✦ Order: ${SITE.phone}`,
  ];

  return (
    <div className="offer-banner" role="banner">
      <div className="offer-track">
        {[...items, ...items.slice(0, 2)].map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
}

export default memo(OfferBanner);
