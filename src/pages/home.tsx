import { Container, CredentialCard, Header } from '@/components';
import GithubCardIconImg from '@/assets/github-card-icon.png';
import SuiCardIconImg from '@/assets/sui-card-icon.svg';
import XCardIconImg from '@/assets/github-card-icon.png';
import LinkedInCardIconImg from '@/assets/linkedin-card-icon.png';
import VerisoulCardIconImg from '@/assets/verisoul-card-icon.png';

const credentialData = [
  {
    imageSrc: GithubCardIconImg,
    points: 7.38,
    title: 'Github',
    description: 'Connect to Github to verify your code contributions.',
  },
  {
    imageSrc: SuiCardIconImg,
    points: 12.31,
    title: 'SUI',
    description: 'Verify SUI activity.',
  },
  {
    imageSrc: XCardIconImg,
    points: 4.12,
    title: 'X',
    description: 'Connect to X to verify your social media presence.',
  },
  {
    imageSrc: LinkedInCardIconImg,
    points: 3.15,
    title: 'LinkedIn',
    description: 'Connect your existing Linkedin account to verify.',
  },
  {
    imageSrc: VerisoulCardIconImg,
    points: 2.39,
    title: 'Verisoul',
    description: 'Connect to Verisoul to verify your human identity.',
  },
];

export function Home() {
  return (
    <Container>
      <main className="flex flex-col self-center mt-40 w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start text-base font-semibold">
          <div className="justify-center px-5 text-white">Add Creds</div>
          <div className="justify-center px-5 text-gray-500">Collected Creds (0/5)</div>
        </div>
        <div className="mt-6 max-md:max-w-full flex max-md:flex-col-reverse">
          <div className="w-[68%] max-md:ml-0 max-md:w-full">
            <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
              {credentialData.map((credential, index) => (
                <CredentialCard key={index} {...credential} />
              ))}
            </div>
          </div>
          <aside className="ml-5 w-[32%] max-md:ml-0 max-md:w-full max-md:mb-8">
            <div className="sticky top-40">
              <div className="flex flex-col max-md:mt-8">
                <section className="flex flex-col p-6 bg-slate-800 bg-opacity-40 rounded-[40px] max-md:px-5">
                  <h2 className="text-xl font-semibold text-white">Statistics</h2>
                  <div className="flex flex-col mt-6">
                    <div className="text-base font-medium text-gray-500">Humanity Points</div>
                    <div className="flex gap-2 self-start mt-4 whitespace-nowrap">
                      <div className="text-2xl font-semibold text-white">0</div>
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
                          <div className="font-bold text-center text-teal-400">20</div>
                        </div>
                        <div className="text-right text-white">100</div>
                      </div>
                      <div className="flex flex-col justify-center items-start py-1 mt-2 bg-slate-800 rounded-[30px] max-md:pr-5">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d6197d28fe9cca1d887789338442d4060365565047ba1d21f947575e3b25943?apiKey=05796128f6dd44148e772baecec9d384&"
                          alt="Progress bar"
                          className="w-3 aspect-[0.75] fill-teal-400"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className="flex flex-col p-6 mt-6 w-full whitespace-nowrap bg-neutral-900 rounded-[32px] max-md:px-5">
                  <h3 className="text-base font-medium text-gray-500">Creds</h3>
                  <div className="flex gap-5 mt-6">
                    <div className="flex flex-1 gap-3">
                      <div className="text-2xl font-medium text-amber-400">0</div>
                      <div className="my-auto text-sm text-white">Valid</div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-2xl font-medium text-gray-500">0</div>
                      <div className="my-auto text-sm text-white">Expired</div>
                    </div>
                  </div>
                </section>
              </div>
              <section className="flex flex-col p-6 mt-8 text-white bg-slate-800 bg-opacity-40 rounded-[32px] max-md:px-5">
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
