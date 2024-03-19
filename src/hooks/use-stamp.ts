import { providerRepository, requestRepository } from '@/repositories';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

export enum StampStatus {
  NOT_CONNECT = 'NOT_CONNECT',
  WAITING = 'WAITING',
  CONNECTED = 'CONNECTED',
  UPDATING = 'UPDATING',
}

export function useStamp({ code }: { code: string }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [status, setStatus] = useState(StampStatus.NOT_CONNECT);
  const { suipassProvider, code: providerProof } = useSearch<
    any,
    { suipassProvider: string; code: string }
  >({
    strict: false,
  });

  // Query
  const { data: requestListData, isLoading: requestListIsLoading } = useQuery({
    queryKey: ['request/list'],
    queryFn: () => {
      return requestRepository.list({ provider: code });
    },
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: async (payload: { provider: string; proof: string }) => {
      await providerRepository.submitReq(payload);
      await requestRepository.create({
        provider: suipassProvider,
      });
    },
  });

  const submitButtonOnClick = useCallback(() => {
    mutation.mutate({ provider: suipassProvider, proof: providerProof });
  }, [suipassProvider, providerProof]);

  useEffect(() => {
    if (suipassProvider) {
      setOpenDrawer(true);
    }
  }, [suipassProvider]);

  useEffect(() => {
    if (!requestListData) return;

    const waitingRequest = requestListData.find((i: any) => i.isApproved === false);
    const approvedRequest = requestListData.find((i: any) => i.isApproved === true);
    if (waitingRequest && approvedRequest) {
      setStatus(StampStatus.UPDATING);
      return;
    }
    if (waitingRequest) {
      setStatus(StampStatus.WAITING);
      return;
    }
    if (approvedRequest) {
      setStatus(StampStatus.CONNECTED);
      return;
    }
  }, [requestListData]);

  return {
    isLoading: requestListIsLoading,
    status,
    needToSubmit: !!suipassProvider,
    openDrawer,
    mutation,
    setOpenDrawer,
    submitButtonOnClick,
  };
}
