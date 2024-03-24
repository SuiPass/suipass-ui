import { Home } from '@/pages/home';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/home')({
  component: Home,
});
