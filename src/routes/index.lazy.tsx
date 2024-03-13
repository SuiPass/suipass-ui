import { Dashboard } from '@/pages/dashboard';
import { Home } from '@/pages/home';
import { useAppStore } from '@/stores';
import { createLazyFileRoute } from '@tanstack/react-router';

function HomeComponent() {
  const { isLogged } = useAppStore();
  return isLogged ? <Dashboard /> : <Home />;
}

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
});
