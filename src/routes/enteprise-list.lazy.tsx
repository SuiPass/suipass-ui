import { Container, Loader } from '@/components';
import { useListOfScoreUseCase, useListOfScorers } from '@/hooks';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import CopyIcon from '@/assets/icons/copy.svg';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

function Enterprise() {
  const { listOfScorersData, listOfScorersIsLoading } = useListOfScorers();
  const { listOfScoreUseCaseData, listOfScoreUseCaseIsLoading } = useListOfScoreUseCase();
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const isLoading = useMemo(
    () => listOfScorersIsLoading || listOfScoreUseCaseIsLoading,
    [listOfScorersIsLoading, listOfScoreUseCaseIsLoading],
  );
  if (isLoading)
    return (
      <div className="w-dvw h-dvh">
        <Loader />
      </div>
    );

  return (
    <Container>
      <main className="flex flex-col self-center mt-40 w-full max-w-[1120px] max-md:max-w-full">
        <div className="text-base  text-white w-full max-w-[768px] mx-auto">
          <h1 className="text-3xl">List Scorer</h1>
          <div className="grid grid-cols-1 gap-8 mt-8">
            {listOfScorersData?.map((scorerData) => {
              const usecase = listOfScoreUseCaseData?.find(
                (i) => i.id === scorerData.metadata.usecaseId,
              );
              return (
                <div className="bg-dark-grey p-6 rounded-[2rem]">
                  <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                      <img src={usecase?.thumbnailUrl} className="w-4" />
                      <div className="text-sm font-light text-light-grey">{usecase?.name}</div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-0.5 px-4 py-2 rounded-2xl bg-neutral-900 bg-opacity-40">
                        <div className="text-base font-semibold text-white">
                          {scorerData.threshold}
                        </div>
                        &nbsp;
                        <div className="text-xs font-light text-light-grey"> points</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 divide-x divide-dashed divide-light-grey">
                    <div className="flex-1">
                      <div className="text-lg font-semibold">{scorerData.name}</div>
                      <div className="text-sm font-light mt-2">{scorerData.metadata.desc}</div>
                    </div>
                    <div className="flex-1 pl-6">
                      <div className="text-sm font-light">
                        {dayjs(scorerData.metadata.createdAt ?? Date.now()).format(
                          'ddd, MMM DD YYYY',
                        )}
                      </div>
                      <div className="text-sm font-light mt-4 text-light-grey">Date Created</div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="text-sm font-light mt-2">API key: {scorerData.id}</div>
                    <img
                      src={CopyIcon}
                      className="w-6 cursor-pointer"
                      onClick={() => {
                        copyToClipboard(scorerData.id);
                        toast.success(`Copied.`);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </Container>
  );
}

export const Route = createLazyFileRoute('/enteprise-list')({
  component: Enterprise,
});
