import { Home } from '@/pages/home';
import { Landing } from '@/pages/landing';
import { rootStore } from '@/stores';
import { createLazyFileRoute } from '@tanstack/react-router';

function IndexComponent() {
  const isLogged = rootStore.app.use.isLogged();
  return isLogged ? <Home /> : <Landing />;
}

export const Route = createLazyFileRoute('/')({
  component: IndexComponent,
});
