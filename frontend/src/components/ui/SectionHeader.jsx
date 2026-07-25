import { memo } from 'react';

function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const style = align === 'left' ? { textAlign: 'left' } : undefined;
  return (
    <div className={`section-header reveal ${align === 'left' ? '' : ''}`} style={style}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title" style={style}>{title}</h2>
      {subtitle && <p className="section-subtitle" style={align === 'left' ? { textAlign: 'left' } : undefined}>{subtitle}</p>}
      <div className="section-divider" style={align === 'left' ? { marginLeft: 0 } : undefined} />
    </div>
  );
}

export default memo(SectionHeader);
