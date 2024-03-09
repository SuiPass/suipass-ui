import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/dashboard" className="[&.active]:font-bold">
          Dashboard
        </Link>
      </div>
      <hr /> */}
      <div className=" animate-fade-in">
        <Outlet />
      </div>
    </>
  )
});
