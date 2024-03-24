import { Storybook } from '@/pages/storybook';
import { createLazyFileRoute } from '@tanstack/react-router';

function StorybookComponent() {
  return <Storybook />;
}

export const Route = createLazyFileRoute('/storybook')({
  component: StorybookComponent,
});
