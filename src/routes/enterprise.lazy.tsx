import { Button, Container } from '@/components';
import { CredCardMini } from '@/components/cred-card-mini';
import { CredStatus } from '@/dtos';
import { useCreateScorer, useListOfCreds } from '@/hooks';
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';
import * as Slider from '@radix-ui/react-slider';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ChevronLeft, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter, useNavigate } from '@tanstack/react-router';

const METHODS = [
  {
    title: 'Airdrop Protection',
    description: 'I want to ensure my airdrop goes to real humans and not farmers.',
  },
  {
    title: 'Sybil Prevention',
    description: 'I need to ensure my community or app is not attacked.',
  },
  {
    title: 'Bot prevention',
    description: 'I want my community or app to be safe from bots.',
  },
  {
    title: 'Other',
    description: "It's something else, or I'm not sure yet.",
  },
];

function Enterprise() {
  const { createScorerMutation } = useCreateScorer();
  const [selectIndex, setSelectIndex] = useState(-1);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<any>({});
  const [selectedCard, setSelectedCard] = useState<Set<string>>(new Set());

  const { listOfCredsData } = useListOfCreds({
    status: [CredStatus.Verified, CredStatus.NotVerified],
  });

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

  const arrayPoint = useMemo(() => {
    const start = 0;
    const end = maxPoint;

    const middle = Math.round(maxPoint / 2);
    if (maxPoint === 0) {
      return [0, 0];
    }
    return [start, middle, end];
  }, [maxPoint]);

  const option = METHODS[selectIndex];

  return (
    <Container>
      <main className="flex flex-col self-center mt-40 w-full max-w-[1120px] max-md:max-w-full">
        <div className="text-base  text-white text-center max-w-[768px] mx-auto">
          <h1 className="text-3xl">Create a Scorer</h1>
          <p className="mt-4">
            Select unique scoring mechanisms that align with your application's goals.
          </p>
          <Dialog.Root>
            <div className="flex mt-4 justify-center">
              <Dialog.Trigger
                asChild
                onClick={() => {
                  setStep(0);
                  setSelectIndex(-1);
                  setSelectedCard(new Set());
                }}
              >
                <Button>+ Scorer</Button>
              </Dialog.Trigger>
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
                        {METHODS.map((e, i) => (
                          <div
                            className={cn(
                              'p-4 border rounded border-gray-300 cursor-pointer hover:border-aqua-green',
                              {
                                'border-aqua-green': selectIndex === i,
                              },
                            )}
                            onClick={() => setSelectIndex(i)}
                          >
                            <h2 className="text-base font-semibold">{e.title}</h2>
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
                        />{' '}
                        <span className="flex-1 text-center">Use Case Details</span>
                      </Dialog.Title>
                      <h2 className="text-lg text-blue-500">{option.title}</h2>
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
                            threshold: maxPoint,
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
                            {listOfCredsData?.map((credData) => (
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
                            defaultValue={[0]}
                            max={maxPoint}
                            step={1}
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
                        </div>
                        <Form.Submit className="mt-8">
                          <Button className="w-full">Continue</Button>
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
        </div>
      </main>
    </Container>
  );
}

export const Route = createLazyFileRoute('/enterprise')({
  component: Enterprise,
});
