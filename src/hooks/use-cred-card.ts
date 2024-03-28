import { CredDto } from '@/dtos';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';

export function useCredCard({
  data,
  setDrawerIsOpen,
}: {
  data: CredDto;
  setDrawerIsOpen: (isOpen: boolean) => void;
}) {
  const { suipassProvider } = useSearch<any, { suipassProvider: string; code: string }>({
    strict: false,
  });
  const providerCode = useMemo(() => data.name.toLowerCase(), [data]);

  useEffect(() => {
    if (suipassProvider === providerCode) setDrawerIsOpen(true);
  }, [suipassProvider, providerCode]);
}
