import { useInitialize } from '@/hooks';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function RouteComponent() {
  useInitialize();

  const { location } = useRouterState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="animate-fade-in">
      {createPortal(<></>, document.body)}
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: RouteComponent,
});
