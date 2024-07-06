import { CredStatus } from '@/enums';
import { Home } from '@/pages/home';
import { Landing } from '@/pages/landing';
import { rootStore } from '@/stores';
import { createLazyFileRoute } from '@tanstack/react-router';

function IndexComponent() {
  const isLogged = rootStore.app.use.isLogged();
  return isLogged ? <Home status={[CredStatus.NotVerified, CredStatus.Waiting]} /> : <Landing />;
}

export const Route = createLazyFileRoute('/dashboard')({
  component: IndexComponent,
});
