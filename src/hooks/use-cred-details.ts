import { SUIPASS_CONFIGS } from '@/configs';
import { QUERY_KEYS } from '@/consts';
import { CredDto } from '@/dtos';
import { providerRepository, requestRepository } from '@/repositories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo } from 'react';

export enum CredStatus {
  NotConnected = 'NOT_CONNECTED',
  NeedToSubmit = 'NEED_TO_SUBMIT',
  Waiting = 'WAITING',
  Connected = 'CONNECTED',
  Updating = 'UPDATING',
}

const verifyFunctions = {
  githubOAuth: () => {
    const rootURl = 'https://github.com/login/oauth/authorize';
    const options = {
      client_id: '5f5991f94e3f8e1224df',
      redirect_uri: `${SUIPASS_CONFIGS.URL}/dashboard?suipassProvider=github`,
      scope: 'user:email',
      state: location.pathname,
    };

    const qs = new URLSearchParams(options);
    const url = `${rootURl}?${qs.toString()}`;
    window.location.href = url;
  },
  googleOAuth: () => {
    const rootURl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      client_id: '711294972943-nonheh2v74203ksus9l2ekfiqhbe202s.apps.googleusercontent.com',
      redirect_uri: `${SUIPASS_CONFIGS.URL}/dashboard?suipassProvider=google`,
      state: location.pathname,
      response_type: 'code',
      scope:
        'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    };

    const qs = new URLSearchParams(options);
    const url = `${rootURl}?${qs.toString()}`;
    window.location.href = url;
  },
} as const;

export function useCredDetails({
  data,
  setDrawerIsOpen,
}: {
  data: CredDto;
  setDrawerIsOpen: (isOpen: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { suipassProvider, code: providerProof } = useSearch<
    any,
    { suipassProvider: string; code: string }
  >({
    strict: false,
  });
  const providerCode = useMemo(() => data.name.toLowerCase(), [data]);

  const { data: listOfRequestsData, isLoading: listOfRequestsIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_REQUESTS, providerCode],
    queryFn: async () => {
      return requestRepository.getList({ provider: providerCode });
    },
  });

  const status = useMemo(() => {
    if (listOfRequestsIsLoading) return null;

    if (listOfRequestsData) {
      if (listOfRequestsData.length) {
        if (listOfRequestsData.find((request: any) => request.isApproved))
          return CredStatus.Connected;
        else return CredStatus.Waiting;
      }
    }

    if (providerCode === suipassProvider) return CredStatus.NeedToSubmit;

    return CredStatus.NotConnected;
  }, [providerCode, suipassProvider, listOfRequestsIsLoading, listOfRequestsData]);

  // Mutation
  const mutation = useMutation({
    mutationFn: async (payload: { providerAddress: string; proof: string }) => {
      await providerRepository.submitReq(payload);
      await requestRepository.create({
        provider: suipassProvider,
        proof: providerProof,
      });
      await new Promise((res) => setTimeout(() => res(true), 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LIST_OF_REQUESTS, providerCode],
      });
    },
  });

  const verifyBtnOnClick = useCallback(() => {
    switch (providerCode) {
      case 'github':
        verifyFunctions.githubOAuth();
        return;

      case 'google':
        verifyFunctions.googleOAuth();
        return;
    }
  }, [data]);

  const submitBtnOnClick = useCallback(() => {
    console.log({ providerAddress: data.id, proof: providerProof });
    mutation.mutate({ providerAddress: data.id, proof: providerProof });
  }, [suipassProvider, providerProof]);

  useEffect(() => {
    if (suipassProvider === providerCode) setDrawerIsOpen(true);
  }, [suipassProvider, providerCode]);

  return {
    status,
    mutation,
    verifyBtnOnClick,
    submitBtnOnClick,
    submitBtnIsLoading: mutation.isPending,
  };
}
