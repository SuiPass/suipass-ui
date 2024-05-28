import { Button, Container, Loader } from '@/components';
import { CredCardMini } from '@/components/cred-card-mini';
import { useCreateScorer, useListOfCreds, useListOfScoreUseCase } from '@/hooks';
import { cn } from '@/lib/utils';
import { Landing } from '@/pages/landing';
import { rootStore } from '@/stores';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import * as Slider from '@radix-ui/react-slider';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ChevronLeft, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CloseIcon from '@/assets/icons/close.svg';

function Enterprise() {
  const [stepNew, setStepNew] = useState<number>(0);
  ///////////
  const isLogged = rootStore.app.use.isLogged();
  const { listOfScoreUseCaseData, listOfScoreUseCaseIsLoading } = useListOfScoreUseCase();
  const { createScorerMutation } = useCreateScorer();
  const [selectIndex, setSelectIndex] = useState(-1);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<any>({});
  const [selectedCard, setSelectedCard] = useState<Set<string>>(new Set());
  const [threshold, setThreshold] = useState<number>(0);

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

  const isLoading = useMemo(() => listOfScoreUseCaseIsLoading, [listOfScoreUseCaseIsLoading]);

  const option = (listOfScoreUseCaseData ?? [])![selectIndex];

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
        <div className="text-white max-w-[768px]">
          <Form.Root
            onSubmit={async (ev) => {
              ev.preventDefault();
              createScorerMutation.mutateAsync({
                name: values.name,
                metadata: values.description,
                providerIds: Array.from(selectedCard),
                threshold,
              });
            }}
          >
            <div
              aria-label="step-0"
              className={`${stepNew === 0 ? 'block' : 'hidden'} w-full text-center`}
            >
              <h1 className="text-xl">Create a Scorer</h1>
              <p className="mt-5 text-sm text-light-grey">
                Choose scoring methods that specifically cater to your application's objectives.
              </p>
              <div className="flex justify-center">
                <Button type="button" className="mt-8" onClick={() => setStepNew(1)}>
                  Add Scorer
                </Button>
              </div>
            </div>
            <div aria-label="step-1" className={`${stepNew === 1 ? 'block' : 'hidden'} w-full`}>
              <div className="flex justify-between items-center">
                <img
                  src={ArrowLeftIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => setStepNew(0)}
                />
                <h2 className="text-xl">Create New Scorer</h2>
                <img
                  src={CloseIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => setStepNew(0)}
                />
              </div>
              <div className="divide-y divide-dashed mt-8">
                <div className="py-8">
                  <h3 className="text-base">Select Use Case</h3>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {listOfScoreUseCaseData?.map((e, i) => (
                      <div
                        className={cn(
                          'p-4 border rounded border-gray-300 cursor-pointer hover:border-aqua-green',
                          {
                            'border-aqua-green': selectIndex === i,
                          },
                        )}
                        onClick={() => {
                          setSelectIndex(i);
                          setSelectedCard(new Set(listOfScoreUseCaseData[i].providerIds));
                        }}
                      >
                        <h2 className="text-base font-semibold">{e.name}</h2>
                        <p className="text-sm opacity-60 mt-2">{e.description}</p>
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
                          onChange={onChange}
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
                          onChange={onChange}
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
                    <Button type="button" className="mt-8" onClick={() => setStepNew(2)}>
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div aria-label="step-2" className={`${stepNew === 2 ? 'block' : 'hidden'} w-full`}>
              <div className="flex justify-between items-center">
                <img
                  src={ArrowLeftIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => setStepNew(0)}
                />
                <h2 className="text-xl">Customize Creds</h2>
                <img
                  src={CloseIcon}
                  className="w-6 aspect-square cursor-pointer"
                  onClick={() => setStepNew(0)}
                />
              </div>
              <div className="divide-y divide-dashed mt-8">
                <div className="py-8">
                  <h3 className="text-base">Suggested Creds</h3>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {listOfCredsData
                      ?.filter(
                        (item) =>
                          option?.providerIds.length === 0 || option?.providerIds.includes(item.id),
                      )
                      .map((credData) => (
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
                <div className="py-8">
                  <h3 className="text-base">Available Creds</h3>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {listOfCredsData
                      ?.filter(
                        (item) =>
                          !(
                            option?.providerIds.length === 0 ||
                            option?.providerIds.includes(item.id)
                          ),
                      )
                      .map((credData) => (
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
                  <div className="py-8">
                    <h3 className="text-base">Threshold Adjustment</h3>
                    <div className="mt-8">
                      <Slider.Root
                        className="relative flex items-center select-none w-full"
                        defaultValue={[maxPoint]}
                        max={maxPoint}
                        step={1}
                        onValueChange={(value) => {
                          setThreshold(value[0]);
                        }}
                      >
                        <Slider.Track className="bg-gray-300 relative flex-1 rounded-full h-1">
                          <Slider.Range className="absolute bg-aqua-green rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="block size-5 bg-aqua-green rounded-full shadow-md"
                          aria-label="Volume"
                        />
                      </Slider.Root>
                      <div className="flex justify-between w-full mt-2 text-sm">
                        {arrayPoint.map((e) => (
                          <div key={e}>{e}</div>
                        ))}
                      </div>
                      <div className="pt-4 text-2xl text-center ">{threshold}</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Form.Submit className="mt-8">
                      <Button isLoading={createScorerMutation.isPending}>Create Scorer</Button>
                    </Form.Submit>
                  </div>
                </div>
              </div>
            </div>
            <div aria-label="step-3" className={`${stepNew === 3 ? 'block' : 'hidden'} w-full`}>
              3
            </div>
            <Dialog.Root>
              <div className="flex mt-4 justify-center">
                <Dialog.Trigger
                  asChild
                  onClick={() => {
                    setStep(0);
                    setSelectIndex(-1);
                    setSelectedCard(new Set());
                  }}
                ></Dialog.Trigger>
              </div>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl text-gray bg-black/90 rounded-lg z-[100] text-white">
                  <div className="h-full overflow-auto">
                    {step === 0 && (
                      <div className="p-8">
                        <div className="text-center mt-8">
                          <h3 className="text-lg">Select a Use Case</h3>
                          <p className="mt-2 opacity-50">What will this Scorer be used for?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          {listOfScoreUseCaseData?.map((e, i) => (
                            <div
                              className={cn(
                                'p-4 border rounded border-gray-300 cursor-pointer hover:border-aqua-green',
                                {
                                  'border-aqua-green': selectIndex === i,
                                },
                              )}
                              onClick={() => {
                                setSelectIndex(i);
                                setSelectedCard(new Set(listOfScoreUseCaseData[i].providerIds));
                              }}
                            >
                              <h2 className="text-base font-semibold">{e.name}</h2>
                              <p className="text-sm opacity-60 mt-2">{e.description}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8">
                          <Button
                            onClick={() => setStep(step + 1)}
                            className="w-full"
                            disabled={selectIndex === -1}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="px-4 pb-4">
                        <Dialog.Title className="text-center px-4 pb-4 pt-1 flex items-center text-lg">
                          <ChevronLeft
                            className="-ml-2 cursor-pointer"
                            onClick={() => {
                              setStep(step - 1);
                            }}
                          />
                          <span className="flex-1 text-center">Use Case Details</span>
                        </Dialog.Title>
                        <h2 className="text-lg text-blue-500">{option.name}</h2>
                        <p className="mt-1 text-sm">{option.description}</p>
                        <hr className="my-4 opacity-30 border-0 border-t" />
                        <Form.Root
                          className="flex flex-col gap-3"
                          onSubmit={async (ev) => {
                            ev.preventDefault();

                            createScorerMutation.mutateAsync({
                              name: values.name,
                              metadata: values.description,
                              providerIds: Array.from(selectedCard),
                              threshold,
                            });
                          }}
                        >
                          <Form.Field name="name" className="flex gap-2 flex-col">
                            <Form.Label className="text-sm">Name</Form.Label>
                            <Form.Control asChild>
                              <input
                                required
                                className="border rounded p-2 font-light bg-white/10 border-none focus:bg-white/20"
                                placeholder="App / Use Case Name"
                                onChange={onChange}
                              />
                            </Form.Control>
                            <Form.Message
                              className="text-red-500 font-extralight"
                              match="valueMissing"
                            >
                              Please enter name
                            </Form.Message>
                          </Form.Field>
                          <Form.Field name="description" className="flex gap-2 flex-col">
                            <Form.Label className="text-sm">Description</Form.Label>
                            <Form.Control asChild>
                              <input
                                required
                                className="border rounded p-2 font-light bg-white/10 border-none focus:bg-white/20"
                                placeholder="Enter Use Case Description"
                                onChange={onChange}
                              />
                            </Form.Control>
                            <Form.Message
                              className="text-red-500 font-extralight text-sm italic"
                              match="valueMissing"
                            >
                              Please enter description
                            </Form.Message>
                          </Form.Field>
                          <div>
                            <label className="text-sm mb-4 block">Creds</label>
                            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 mb-4">
                              {listOfCredsData
                                ?.filter(
                                  (item) =>
                                    option.providerIds.length === 0 ||
                                    option.providerIds.includes(item.id),
                                )
                                .map((credData) => (
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
                            <Slider.Root
                              className="relative flex items-center select-none w-full"
                              defaultValue={[maxPoint]}
                              max={maxPoint}
                              step={1}
                              onValueChange={(value) => {
                                setThreshold(value[0]);
                              }}
                            >
                              <Slider.Track className="bg-gray-300 relative flex-1 rounded-full h-1">
                                <Slider.Range className="absolute bg-aqua-green rounded-full h-full" />
                              </Slider.Track>
                              <Slider.Thumb
                                className="block size-5 bg-aqua-green rounded-full shadow-md"
                                aria-label="Volume"
                              />
                            </Slider.Root>
                            <div className="flex justify-between w-full mt-2 text-sm">
                              {arrayPoint.map((e) => (
                                <div key={e}>{e}</div>
                              ))}
                            </div>
                            <div className="pt-4 text-2xl text-center ">{threshold}</div>
                          </div>
                          <Form.Submit className="mt-8">
                            <Button className="w-full" isLoading={createScorerMutation.isPending}>
                              Continue
                            </Button>
                          </Form.Submit>
                        </Form.Root>
                      </div>
                    )}
                  </div>

                  <Dialog.Close className="absolute top-2 right-2">
                    <XIcon />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* <Form.Submit className="mt-8">
                    <Button className="w-full" isLoading={createScorerMutation.isPending}>
                      Continue
                    </Button>
                  </Form.Submit> */}
          </Form.Root>
        </div>
      </main>
    </Container>
  );
}

export const Route = createLazyFileRoute('/enterprise')({
  component: Enterprise,
});
