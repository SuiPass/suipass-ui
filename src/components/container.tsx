import React from 'react';

export function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="relative max-w-screen-2xl min-h-[900px] px-40 pb-40 mx-auto max-md:px-4">
      {children}
    </div>
  );
}
