import { Home } from '@/pages/home';
import { HomeLogged } from '@/pages/home-logged';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: localStorage.getItem('logged') ? HomeLogged : Home
});
