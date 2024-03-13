import { useInitialize } from '@/hooks';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';

export function RouteComponent() {
  useInitialize();

  const { location } = useRouterState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="animate-fade-in">
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: RouteComponent,
});
