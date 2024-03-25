import React from 'react';

export function Container({ children }: React.PropsWithChildren) {
  return <div className="relative w-full h-dvh min-h-[900px] px-40 max-md:px-4">{children}</div>;
}
