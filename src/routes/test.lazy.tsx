import { Test } from '@/pages/test-page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/test')({
  component: Test
});
