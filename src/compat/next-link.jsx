import { Link as RouterLink } from 'react-router-dom';

export default function Link({ href = '/', children, replace, prefetch: _prefetch, ...props }) {
  const isExternal =
    typeof href === 'string' &&
    (href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('whatsapp:'));

  if (isExternal) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} replace={replace} {...props}>
      {children}
    </RouterLink>
  );
}
