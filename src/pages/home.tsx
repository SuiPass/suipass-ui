import { Container, CredCard, Empty, Loader, CredVerifying } from '@/components';
import { Progress } from '@/components/ui/progress';
import { CredStatus } from '@/dtos';
import { useListOfCreds, useStatisticsOfUser } from '@/hooks';
import { Link } from '@tanstack/react-router';

export function Home({ status }: { status: CredStatus[] }) {
  const { listOfCredsData, listOfCredsIsLoading } = useListOfCreds({
    status,
  });

  const { userStatsData } = useStatisticsOfUser();

  return (
    <Container>
      {/* <CredVerifying /> */}
      <main className="flex flex-col self-center mt-40 w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start text-base font-semibold">
          <Link to="/">
            <div
              className={`justify-center px-5 cursor-pointer hover:text-white ${status.includes(CredStatus.Verified) ? 'text-gray-500' : 'text-white'}`}
            >
              Add Creds
            </div>
          </Link>
          <Link to="/collected-creds">
            <div
              className={`justify-center px-5 text-gray-500 cursor-pointer hover:text-white ${!status.includes(CredStatus.Verified) ? 'text-gray-500' : 'text-white'}`}
            >
              Collected Creds
              {userStatsData
                ? `(${userStatsData.verifiedCredsCount}/${userStatsData.allCredsCount})`
                : ''}
            </div>
          </Link>
        </div>
        <div className="mt-6 max-md:max-w-full flex max-md:flex-col-reverse">
          <div className="w-[68%] max-md:ml-0 max-md:w-full">
            {listOfCredsIsLoading ? (
              <Loader />
            ) : listOfCredsData?.length ? (
              <div className="grid grid-cols-2 gap-8 max-xl:grid-cols-1">
                {listOfCredsData?.map((credData) => <CredCard key={credData.id} data={credData} />)}
              </div>
            ) : (
              <Empty />
            )}
          </div>
          <aside className="ml-5 w-[32%] min-w-[280px] max-md:ml-0 max-md:w-full max-md:mb-8">
            <div className="sticky top-40">
              <div className="flex flex-col max-md:mt-8">
                <section className="flex flex-col p-6 bg-[#302E4066] bg-opacity-40 rounded-[2.5rem] max-md:px-5">
                  <h2 className="text-xl font-semibold text-white">Statistics</h2>
                  <div className="flex flex-col mt-6">
                    <div className="text-base font-medium text-gray-500">Humanity Points</div>
                    <div className="flex gap-2 self-start mt-4 whitespace-nowrap">
                      <div className="text-2xl font-semibold text-white">
                        {userStatsData?.humanityPoints ?? 0}
                      </div>
                      <div className="text-sm font-light text-gray-500">pts</div>
                    </div>
                  </div>
                  <hr className="shrink-0 mt-6 h-px bg-gray-500 border border-gray-500 border-dashed" />
                  <div className="flex flex-col mt-6">
                    <div className="text-base font-medium text-gray-500">Points/Threshold</div>
                    <div className="flex flex-col mt-4">
                      <div className="flex gap-5 justify-between px-2 py-1 w-full text-sm whitespace-nowrap">
                        <div className="flex gap-5 justify-between">
                          <div className="text-white">0</div>
                        </div>
                        <div className="font-bold text-teal-400 ml-[-90px] relative">
                          <span>400</span>
                          <div className="divide-x divide-dashed absolute z-10 top-0 left-3">
                            <div className="h-6" />
                            <div className="h-6" />
                          </div>
                        </div>
                        <div className="text-right text-white">{userStatsData?.maxPoints}</div>
                      </div>
                      <Progress
                        className="mt-2"
                        value={
                          ((userStatsData?.humanityPoints ?? 0) * 100) /
                          (userStatsData?.maxPoints ?? 1)
                        }
                      />
                    </div>
                  </div>
                  <section className="flex flex-col p-6 mt-6 w-full whitespace-nowrap bg-black rounded-[2rem] max-md:px-5">
                    <h3 className="text-base font-medium text-gray-500">Creds</h3>
                    <div className="flex gap-5 mt-6 divide-x divide-dashed">
                      <div className="flex-1">
                        <div className="flex gap-3 items-center">
                          <div className="text-2xl font-medium text-amber-400">
                            {userStatsData?.verifiedCredsCount ?? 0}
                          </div>
                          <div className="text-sm text-white">Valid</div>
                        </div>
                        <div className="flex gap-2 pt-2 flex-wrap">
                          {userStatsData?.verifiedCreds.map((cred) => (
                            <img key={cred.id} src={cred.logoUrl} alt="Logo" className="h-5 w-5" />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 pl-6">
                        <div className="flex gap-3 items-center">
                          <div className="text-2xl font-medium text-gray-500">0</div>
                          <div className="text-sm text-white">Expired</div>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
              </div>
              <section className="flex flex-col p-6 mt-8 text-white bg-[#302E4066] rounded-[2.5rem] max-md:px-5">
                <h2 className="text-xl font-semibold">How it works?</h2>
                <p className="mt-6 text-sm font-light">
                  SuiPass empowers you to build your digital identity by collecting Credentials
                  (Creds). Once reaching the threshold, the choice is yours! You can decide to mint
                  a unique Passport NFT, which will grant you access to these features within
                  ecosystem.
                </p>
              </section>
            </div>
          </aside>
        </div>
      </main>
    </Container>
  );
}
