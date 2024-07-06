import { OAUTH2_CONFIG } from '@/configs';
import { QUERY_KEYS } from '@/consts';
import { CredDto } from '@/dtos';
import { providerRepository, requestRepository } from '@/repositories';
import { rootStore } from '@/stores';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export enum CredStatus {
  NotConnected = 'NOT_CONNECTED',
  NeedToSubmit = 'NEED_TO_SUBMIT',
  Waiting = 'WAITING',
  Connected = 'CONNECTED',
  Updating = 'UPDATING',
}

const verifyFunctions = {
  githubOAuth: () => {
    const qs = new URLSearchParams(OAUTH2_CONFIG.GITHUB.OPTIONS);
    const url = `${OAUTH2_CONFIG.GITHUB.ROOT_URL}?${qs.toString()}`;
    window.location.href = url;
  },
  googleOAuth: () => {
    const qs = new URLSearchParams(OAUTH2_CONFIG.GOOGLE.OPTIONS);
    const url = `${OAUTH2_CONFIG.GOOGLE.ROOT_URL}?${qs.toString()}`;
    window.location.href = url;
  },
  twitterOAuth: () => {
    const qs = new URLSearchParams(OAUTH2_CONFIG.TWITTER.OPTIONS).toString();
    const url = `${OAUTH2_CONFIG.TWITTER.ROOL_URL}?${qs}`;
    window.location.href = url;
  },
  verisoulOAuth: (sessionId: string) => {
    const qs = new URLSearchParams({
      ...OAUTH2_CONFIG.VERISOUL.OPTIONS,
      session_id: sessionId,
    });
    const url = `${OAUTH2_CONFIG.VERISOUL.ROOT_URL}?${qs.toString()}`;
    window.location.href = url;
  },
} as const;

async function submitProof(payload: { providerAddress: string; providerCode: string; proof: any }) {
  await providerRepository.submitReq(payload);
  const res = await requestRepository.create({
    provider: payload.providerCode,
    proof: payload.proof,
  });
  await new Promise((res) => setTimeout(() => res(true), 5000));
  return res;
}

export function useCredDetails({
  data,
  setDrawerIsOpen,
}: {
  data: CredDto;
  setDrawerIsOpen: (isOpen: boolean) => void;
}) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<CredStatus | null>(null);
  const queryClient = useQueryClient();
  const queries = useSearch<any, { suipassProvider: string; code: string }>({
    strict: false,
  });
  const { suipassProvider } = queries;
  const providerCode = useMemo(() => data.name.toLowerCase(), [data]);

  const { data: listOfRequestsData, isLoading: listOfRequestsIsLoading } = useQuery({
    queryKey: [QUERY_KEYS.LIST_OF_REQUESTS, providerCode],
    queryFn: async () => {
      return requestRepository.getList({ provider: providerCode });
    },
  });

  useEffect(() => {
    if (listOfRequestsIsLoading) {
      setStatus(null);
      return;
    }

    if (listOfRequestsData) {
      if (listOfRequestsData.length) {
        if (listOfRequestsData.find((request: any) => request.isApproved)) {
          if (data.currentLevel === 0) setStatus(CredStatus.NotConnected);
          else setStatus(CredStatus.Connected);
          return;
        } else {
          setStatus(CredStatus.Waiting);
          return;
        }
      }
    }

    if (providerCode === suipassProvider) {
      setStatus(CredStatus.NeedToSubmit);
      return;
    }

    setStatus(CredStatus.NotConnected);
  }, [providerCode, suipassProvider, listOfRequestsIsLoading, listOfRequestsData]);

  const afterVerified = (res: any) => {
    queryClient.refetchQueries({
      queryKey: [QUERY_KEYS.LIST_OF_REQUESTS, providerCode],
    });
    queryClient.refetchQueries({
      queryKey: [QUERY_KEYS.LIST_OF_CREDS],
    });
    queryClient.refetchQueries({
      queryKey: [QUERY_KEYS.STATISTICS_OF_USER],
    });

    if (res.level > 0) {
      const points = (res.level * data.maxPoints) / data.levels.length;
      toast.success(`Congratulations! You've earned ${points} points.`);
      navigate({ to: '/collected-creds', search: { suipassProvider: providerCode } });
    } else {
      toast.error(`No points awarded!`);
    }
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: async (payload: { providerAddress: string; proof: string }) => {
      await submitProof({
        ...payload,
        providerCode,
      })
        .then((res) => {
          afterVerified(res);
        })
        .catch((err) => {
          if (data.currentLevel === 0) setStatus(CredStatus.NotConnected);
          else setStatus(CredStatus.Connected);
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

      case 'twitter':
        verifyFunctions.twitterOAuth();
        return;

      case 'sui': {
        const beforeSubmitStatus = status;
        setStatus(CredStatus.NeedToSubmit);
        submitProof({
          providerCode: providerCode,
          providerAddress: data.id,
          proof: {
            walletAddress: rootStore.contract.get.account()?.address!,
          },
        })
          .then((res) => {
            afterVerified(res);
          })
          .catch((err) => {
            setStatus(beforeSubmitStatus);
          });
        return;
      }

      case 'verisoul': {
        setStatus(CredStatus.NeedToSubmit);
        (async () => {
          const res = await providerRepository.getVerisoulSession();
          const { sessionId } = res;
          verifyFunctions.verisoulOAuth(sessionId);
        })();
        return;
      }
    }
  }, [data, status]);

  // Submit proof for google, twitter, github
  useEffect(() => {
    if (status === CredStatus.NeedToSubmit) {
      if (suipassProvider === providerCode) {
        setDrawerIsOpen(true);
        const providerAddress = data.id;
        let proof;
        switch (suipassProvider) {
          case 'github':
          case 'google':
          case 'twitter':
            proof = queries.code;
            break;

          case 'verisoul':
            const success = queries.success;

            if (success != true) {
              toast.error(`Authentication with Verisoul failed!`);
              setStatus(CredStatus.NotConnected);
              return;
            }

            proof = queries.session_id;
            break;
        }

        mutation.mutate({ providerAddress, proof });
      }
    }
  }, [suipassProvider, providerCode, status, queries]);

  return {
    status,
    mutation,
    verifyBtnOnClick,
    // submitBtnOnClick,
    // submitBtnIsLoading: mutation.isPending,
  };
}
