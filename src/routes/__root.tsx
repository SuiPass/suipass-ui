import { Header, InstallWalletExtensionDialog, Loader, SelectWalletDialog } from '@/components';
import { useInitialize } from '@/hooks';
import { appStore } from '@/stores/app-store';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

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
      {createPortal(
        <>
          <Toaster
            toastOptions={{
              style: {
                background: '#36D4B7',
                border: 'none',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                color: '#111019',
                fontFamily: 'Poppins',
                fontSize: '0.875rem',
                fontWeight: 300,
              },
              success: {
                iconTheme: {
                  primary: 'black',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'black',
                  secondary: 'white',
                },
              },
            }}
          />
          <InstallWalletExtensionDialog />
          <SelectWalletDialog />
        </>,
        document.body,
      )}
      <Header />
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: RouteComponent,
});
