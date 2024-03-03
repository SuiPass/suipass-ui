import { Dashboard } from '@/pages/dashboard';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/dashboard')({
  component: Dashboard
});
