import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { EventNames, rootEventHandler } from '@/events';

export function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    rootEventHandler.on(EventNames.WALLET_CONNECTED, () => {
      navigate({
        to: '/dashboard',
      });
    });

    rootEventHandler.on(EventNames.WALLET_DISCONNECTED, () => {
      navigate({
        to: '/',
      });
    });

    return () => {
      rootEventHandler.remove(EventNames.WALLET_CONNECTED);
      rootEventHandler.remove(EventNames.WALLET_DISCONNECTED);
    };
  }, []);

  return (
    <div className=" animate-fade-in">
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: RouteComponent,
});
