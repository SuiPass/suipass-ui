import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '.';
import { useSubmitRequestDialog } from '@/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { requestRepository } from '@/repositories';

export function Stamp({
  data,
}: {
  data: { code: string; label: string; icon: string; description: string; onClick: () => void };
}) {
  const { open, mutation, setOpen, submitButtonOnClick } = useSubmitRequestDialog();
  const { data: requestListData, isLoading: requestListIsLoading } = useQuery({
    queryKey: ['request/list'],
    queryFn: async () => {
      return requestRepository.list({ provider: data.code });
    },
  });

  if (requestListIsLoading) return <div>Loading...</div>;

  console.log(requestListData);

  return (
    <>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        {/* <!-- Card 1 --> */}
        <div className="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacity-10 after:z-30 after:blur-[100px] overflow-hidden">
          <div className="relative h-full bg-slate-900 p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
            {/* <!-- Radial gradient --> */}
            <div
              className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none w-1/2 aspect-square"
              aria-hidden="true"
            >
              <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
            </div>
            <div className="flex flex-col h-full items-center text-center">
              {/* <!-- Image --> */}
              <div className="relative inline-flex">
                <div
                  className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl rounded-full bg-indigo-600"
                  aria-hidden="true"
                ></div>
                <img
                  className="inline-flex"
                  src={data.icon}
                  width="200"
                  height="200"
                  alt="Card 01"
                />
              </div>
              {/* <!-- Text --> */}
              <div className="grow mb-5">
                {/* <div className="text-primary text-4xl font-light mb-4">6.92</div> */}
                <h2 className="text-2xl text-slate-200 font-bold mb-1">{data.label}</h2>
                <p className="text-sm text-slate-500">{data.description}</p>
              </div>
              <DrawerTrigger asChild>
                <a
                  className="inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-slate-800 hover:bg-slate-900 border border-slate-700 px-3 py-1.5 text-md font-medium text-slate-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                  href="#0"
                >
                  <svg
                    className="fill-slate-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                  >
                    <path d="M12.82 8.116A.5.5 0 0 0 12 8.5V10h-.185a3 3 0 0 1-2.258-1.025l-.4-.457-1.328 1.519.223.255A5 5 0 0 0 11.815 12H12v1.5a.5.5 0 0 0 .82.384l3-2.5a.5.5 0 0 0 0-.768l-3-2.5ZM12.82.116A.5.5 0 0 0 12 .5V2h-.185a5 5 0 0 0-3.763 1.708L3.443 8.975A3 3 0 0 1 1.185 10H1a1 1 0 1 0 0 2h.185a5 5 0 0 0 3.763-1.708l4.609-5.267A3 3 0 0 1 11.815 4H12v1.5a.5.5 0 0 0 .82.384l3-2.5a.5.5 0 0 0 0-.768l-3-2.5ZM1 4h.185a3 3 0 0 1 2.258 1.025l.4.457 1.328-1.52-.223-.254A5 5 0 0 0 1.185 2H1a1 1 0 0 0 0 2Z" />
                  </svg>
                  Conenct
                </a>
              </DrawerTrigger>
            </div>
          </div>
        </div>
        <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
          <div>
            <DrawerHeader>
              <DrawerTitle>Github</DrawerTitle>
              {/* <DrawerDescription>6.9</DrawerDescription> */}
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={data.onClick}>Connect</Button>
              <Button onClick={submitButtonOnClick} isLoading={mutation.isPending}>
                Submit
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
