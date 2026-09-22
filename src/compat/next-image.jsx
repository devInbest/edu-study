function resolveSrc(src) {
  if (!src) return '';
  if (typeof src === 'string') return src;
  if (typeof src === 'object' && src.src) return src.src;
  return String(src);
}

export default function Image({
  src,
  alt = '',
  width,
  height,
  fill = false,
  className = '',
  style,
  priority = false,
  sizes,
  ...rest
}) {
  const resolved = resolveSrc(src);
  const imgStyle = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }
    : style;

  return (
    <img
      src={resolved}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={imgStyle}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...rest}
    />
  );
}
