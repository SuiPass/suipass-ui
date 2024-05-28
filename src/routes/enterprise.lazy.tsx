import { Button, Container, Loader } from '@/components';
import { CredCardMini } from '@/components/cred-card-mini';
import { useCreateScorer, useListOfCreds, useListOfScoreUseCase, useListOfScorers } from '@/hooks';
import { cn } from '@/lib/utils';
import { Landing } from '@/pages/landing';
import { rootStore } from '@/stores';
import * as Form from '@radix-ui/react-form';
import * as Slider from '@radix-ui/react-slider';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { ScoreUseCaseModel } from '@/models';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import CopyIcon from '@/assets/icons/copy.svg';

function Enterprise() {
  const [step, setStep] = useState<number>(0);
  const [useCase, setUseCase] = useState<ScoreUseCaseModel>();
  const [name, setName] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [threshold, setThreshold] = useState<number>(0);

  const step2Completed = useMemo(() => !!useCase && !!name && desc, [useCase, name, desc]);
  const step3Completed = useMemo(
    () => !!step2Completed && !!threshold,
    [step2Completed, threshold],
  );

  const nextStep = (step: number) => {
    setStep(step);
    window.scrollTo(0, 0);
  };
  ///////////
  const isLogged = rootStore.app.use.isLogged();
  const { listOfScoreUseCaseData, listOfScoreUseCaseIsLoading } = useListOfScoreUseCase();
  const { createScorerMutation } = useCreateScorer();
  const [selectIndex, setSelectIndex] = useState(-1);
  const [values, setValues] = useState<any>({});
  const [selectedCard, setSelectedCard] = useState<Set<string>>(new Set());

  const { listOfCredsData } = useListOfCreds({});

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    setValues({ ...values, [ev.target.name]: ev.target.value });
  };

  const maxPoint = useMemo(() => {
    if (listOfCredsData) {
      return listOfCredsData.reduce((cum, item) => {
        if (selectedCard.has(item.id)) {
          return cum + item.maxPoints;
        }
        return cum;
      }, 0);
    }
    return 0;
  }, [listOfCredsData, selectedCard]);

  useEffect(() => {
    setThreshold(maxPoint);
  }, [maxPoint]);

  const arrayPoint = useMemo(() => {
    const start = 0;
    const end = maxPoint;

    if (maxPoint === 0) {
      return [0, 0];
    }
    return [start, end];
  }, [maxPoint]);

  const option = (listOfScoreUseCaseData ?? [])![selectIndex];

  const suggestedCreds = useMemo(
    () => listOfCredsData?.filter((item) => option?.providerIds.includes(item.id)) ?? [],
    [listOfCredsData, option],
  );
  const availableCreds = useMemo(
    () => listOfCredsData?.filter((item) => !option?.providerIds.includes(item.id)) ?? [],
    [listOfCredsData, option],
  );

  const { listOfScorersData, listOfScorersIsLoading, refectlistOfScorers } = useListOfScorers();
  const [_, copyToClipboard] = useCopyToClipboard();

  const isLoading = useMemo(
    () => listOfScoreUseCaseIsLoading || listOfScorersIsLoading,
    [listOfScoreUseCaseIsLoading, listOfScorersIsLoading],
  );

  if (isLogged && isLoading)
    return (
      <div className="w-dvw h-dvh">
        <Loader />
      </div>
    );

  return !isLogged ? (
    <Landing />
  ) : (
    <Container>
      <main className="flex flex-col self-center mt-40 w-full max-w-[1120px] max-md:max-w-full">
        <div className="text-white w-full max-w-[768px] mx-auto">
          <Form.Root
            onSubmit={async (ev) => {
              ev.preventDefault();
              await createScorerMutation.mutateAsync({
                name: values.name,
                metadata: {
                  desc: values.description,
                  usecaseId: useCase?.id!,
                  createdAt: Date.now(),
                },
                providerIds: Array.from(selectedCard),
                threshold,
              });

              nextStep(0);
              refectlistOfScorers();
              toast.success(`Successfully create a scorer.`);
            }}
          >
            <div
              aria-label="step-0"
              className={`${step === 0 ? 'block' : 'hidden'} w-full text-center`}
            >
              <h1 className="text-xl">Create a Scorer</h1>
              <p className="mt-5 text-sm text-light-grey">
                Choose scoring methods that specifically cater to your application's objectives.
              </p>
              <div className="flex justify-center">
                <Button type="button" className="mt-8" onClick={() => nextStep(1)}>
                  Add Scorer
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-8 mt-8 text-left">
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
                          <div className="text-sm font-light mt-4 text-light-grey">
                            Date Created
                          </div>
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
            <div aria-label="step-1" className={`${step === 1 ? 'block' : 'hidden'} w-full`}>
              <div className="flex justify-between items-center">
                <img
                  src={ArrowLeftIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => nextStep(0)}
                />
                <h2 className="text-xl">Create New Scorer</h2>
                <img
                  src={CloseIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => nextStep(0)}
                />
              </div>
              <div className="divide-y divide-dashed mt-8">
                <div className="py-8">
                  <h3 className="text-base">Select Use Case</h3>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {listOfScoreUseCaseData?.map((e, i) => (
                      <div
                        className={cn(
                          'p-6 bg-dark-grey border-2 border-transparent rounded-[2rem] cursor-pointer hover:border-aqua-green',
                          {
                            'border-aqua-green': selectIndex === i,
                          },
                        )}
                        onClick={() => {
                          setSelectIndex(i);
                          setSelectedCard(new Set(listOfScoreUseCaseData[i].providerIds));
                          setUseCase(e);
                        }}
                      >
                        <img src={e.thumbnailUrl} className="w-6 aspect-square cursor-pointer" />
                        <h2 className="mt-4 text-lg font-semibold">{e.name}</h2>
                        <p className="text-sm font-light mt-2">{e.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="py-8">
                  <h3 className="text-base">Use Case Details</h3>
                  <div className="grid grid-cols-2 gap-8 mt-8 align-top">
                    <Form.Field name="name" className="grid grid-cols-1 gap-3">
                      <Form.Label className="text-sm font-light">Name</Form.Label>
                      <Form.Control asChild>
                        <input
                          required
                          className="rounded-2xl p-3 font-light text-sm bg-dark-grey border-none"
                          placeholder="App / Use Case Name"
                          onChange={(e) => {
                            setName(e.target.value);
                            onChange(e);
                          }}
                        />
                      </Form.Control>
                      <Form.Message
                        className="ml-3 text-red-400 font-extralight text-sm"
                        match="valueMissing"
                      >
                        Please enter your App / Use Case Name
                      </Form.Message>
                    </Form.Field>
                    <Form.Field name="description" className="grid grid-cols-1 gap-3">
                      <Form.Label className="text-sm font-light">Description</Form.Label>
                      <Form.Control asChild>
                        <input
                          required
                          className="rounded-2xl p-3 font-light text-sm bg-dark-grey border-none"
                          placeholder="Enter Use Case Description"
                          onChange={(e) => {
                            setDesc(e.target.value);
                            onChange(e);
                          }}
                        />
                      </Form.Control>
                      <Form.Message
                        className="ml-3 text-red-400 font-extralight text-sm"
                        match="valueMissing"
                      >
                        Enter Use Case Description
                      </Form.Message>
                    </Form.Field>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="mt-8"
                      disabled={!step2Completed}
                      onClick={() => nextStep(2)}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div aria-label="step-2" className={`${step === 2 ? 'block' : 'hidden'} w-full`}>
              <div className="flex justify-between items-center">
                <img
                  src={ArrowLeftIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => nextStep(1)}
                />
                <h2 className="text-xl">Customize Creds</h2>
                <img
                  src={CloseIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => nextStep(0)}
                />
              </div>
              <div className="divide-y divide-dashed mt-8">
                {!!suggestedCreds.length && (
                  <div className="py-8">
                    <h3 className="text-base">Suggested Creds</h3>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {suggestedCreds.map((credData) => (
                        <CredCardMini
                          onClick={() => {
                            if (selectedCard.has(credData.id)) {
                              selectedCard.delete(credData.id);
                            } else {
                              selectedCard.add(credData.id);
                            }
                            setSelectedCard(new Set(selectedCard));
                          }}
                          key={credData.id}
                          data={credData}
                          isSelected={selectedCard.has(credData.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="py-8">
                  <h3 className="text-base">Available Creds</h3>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {availableCreds.map((credData) => (
                      <CredCardMini
                        onClick={() => {
                          if (selectedCard.has(credData.id)) {
                            selectedCard.delete(credData.id);
                          } else {
                            selectedCard.add(credData.id);
                          }
                          setSelectedCard(new Set(selectedCard));
                        }}
                        key={credData.id}
                        data={credData}
                        isSelected={selectedCard.has(credData.id)}
                      />
                    ))}
                  </div>
                  {!!availableCreds.length && (
                    <div className="py-8">
                      <h3 className="text-base">Threshold Adjustment</h3>
                      <div className="mt-14">
                        <Slider.Root
                          className="relative flex items-center select-none w-full mt-2"
                          defaultValue={[maxPoint]}
                          max={maxPoint}
                          step={1}
                          onValueChange={(value) => {
                            setThreshold(value[0]);
                          }}
                          value={[threshold]}
                        >
                          <Slider.Track className="bg-gray-300 relative flex-1 rounded-full h-6 overflow-hidden border-[4px] border-dark-grey">
                            <Slider.Range className="absolute bg-aqua-green h-full" />
                          </Slider.Track>
                          <Slider.Thumb
                            className="block size-10 border-[4px] border-dark-grey bg-aqua-green rounded-full cursor-pointer"
                            aria-label="Volume"
                          >
                            <div className="text-base font-bold text-aqua-green text-center translate-y-[-2rem]">
                              {threshold}
                            </div>
                          </Slider.Thumb>
                        </Slider.Root>
                        <div className="flex justify-between w-full mt-4 text-sm px-2">
                          {arrayPoint.map((e) => (
                            <div key={e} className="text-sm">
                              {e}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Button
                      className="mt-8"
                      isLoading={createScorerMutation.isPending}
                      disabled={!step3Completed}
                    >
                      Create Scorer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div aria-label="step-3" className={`${step === 3 ? 'block' : 'hidden'} w-full`}>
              3
            </div>
          </Form.Root>
        </div>
      </main>
    </Container>
  );
}

export const Route = createLazyFileRoute('/enterprise')({
  component: Enterprise,
});
