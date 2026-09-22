import { useLocation, useNavigate, useParams as useRouterParams } from 'react-router-dom';

export function usePathname() {
  return useLocation().pathname;
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (to) => navigate(to),
    replace: (to) => navigate(to, { replace: true }),
    back: () => navigate(-1),
    prefetch: () => {},
  };
}

export function useParams() {
  return useRouterParams();
}

export function notFound() {
  throw new Response(null, { status: 404, statusText: 'Not Found' });
}
