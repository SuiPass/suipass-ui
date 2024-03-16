import { providerRepository } from '@/repositories';
import { useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';

export const useSubmitRequestDialogStore = create<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export function useSubmitRequestDialog() {
  const { open, setOpen } = useSubmitRequestDialogStore();
  const { suipassProvider, code } = useSearch<any, { suipassProvider: string; code: string }>({
    strict: false,
  });

  const mutation = useMutation({
    mutationFn: (payload: { provider: string; proof: string }) => {
      return providerRepository.submitReq(payload);
    },
  });

  const submitButtonOnClick = useCallback(() => {
    mutation.mutate({ provider: suipassProvider, proof: code });
  }, [suipassProvider, code]);

  useEffect(() => {
    if (suipassProvider) {
      setTimeout(() => {
        setOpen(true);
      }, 200);
    }
  }, [suipassProvider]);

  return {
    open,
    mutation,
    setOpen,
    submitButtonOnClick,
  };
}
