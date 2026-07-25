import { memo, useState } from 'react';

function LazyImage({ src, alt, className = '', width, height, eager = false, ...rest }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded || eager ? 'loaded' : ''}`.trim()}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  );
}

export default memo(LazyImage);
