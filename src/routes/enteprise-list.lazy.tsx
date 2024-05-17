import { Container } from '@/components';
import { createLazyFileRoute } from '@tanstack/react-router';

function Enterprise() {




  return (
    <Container>
      <main className="flex flex-col self-center mt-40 w-full max-w-[1120px] max-md:max-w-full">
        <div className="text-base  text-white w-full max-w-[768px] mx-auto">
          <h1 className="text-3xl">List Scorer</h1>
          {/* <p className="mt-4">
            Select unique scoring mechanisms that align with your application's goals.
          </p> */}
          <div className="flex flex-col gap-2 mt-8">
            <div className="border-t border-b border-gray-500 py-4 px-2 flex items-center">
              <div className="flex-1">
                <h2 className="text-base font-semibold">Application Name</h2>
                <p className="text-xs opacity-60">Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="ml-auto">
                <i className='cursor-pointer'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export const Route = createLazyFileRoute('/enteprise-list')({
  component: Enterprise,
});
