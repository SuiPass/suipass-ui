import { useAppWallet } from '@/hooks';
import { Dashboard } from '@/pages/dashboard';
import { Home } from '@/pages/home';
import { createLazyFileRoute } from '@tanstack/react-router';

function HomeComponent() {
  const { logged } = useAppWallet();

  return logged ? <Dashboard /> : <Home />;
}

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
});
