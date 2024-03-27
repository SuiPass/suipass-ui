import { Header, Loader } from '@/components';
import { useInitialize } from '@/hooks';
import { appStore } from '@/stores/app-store';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function RouteComponent() {
  useInitialize();
  const isLoading = appStore.use.isLoading();

  const { location } = useRouterState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading)
    return (
      <div className="w-dvw h-dvh">
        <Loader />
      </div>
    );

  return (
    <div className="animate-fade-in">
      {createPortal(<></>, document.body)}
      <Header />
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: RouteComponent,
});
