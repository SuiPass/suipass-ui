// import { Stamp } from '@/components';
// import { useEffect } from 'react';
// import { Spotlight } from '@/lib/animation';
// import { SUIPASS_CONFIGS } from '@/configs';

// const listOfStamps = [
//   {
//     code: 'github',
//     label: 'GitHub',
//     icon: 'https://cruip-tutorials.vercel.app/spotlight-effect/card-01.png',
//     description: 'Quickly apply filters to refine your issues lists and create custom views.',
//     onClick: () => {
//       const rootURl = 'https://github.com/login/oauth/authorize';
//       const options = {
//         client_id: '5f5991f94e3f8e1224df',
//         redirect_uri: `${SUIPASS_CONFIGS.URL}/dashboard?suipassProvider=github`,
//         scope: 'user:email',
//         state: location.pathname,
//       };

//       const qs = new URLSearchParams(options);
//       const url = `${rootURl}?${qs.toString()}`;
//       window.location.href = url;
//     },
//   },
//   {
//     code: 'google',
//     label: 'Google',
//     icon: 'https://cruip-tutorials.vercel.app/spotlight-effect/card-01.png',
//     description: 'Goooooooooooooooooooooooooooogle',
//     onClick: () => {
//       const rootURl = 'https://accounts.google.com/o/oauth2/v2/auth';
//       const options = {
//         client_id: '711294972943-nonheh2v74203ksus9l2ekfiqhbe202s.apps.googleusercontent.com',
//         redirect_uri: `${SUIPASS_CONFIGS.URL}/dashboard?suipassProvider=google`,
//         state: location.pathname,
//         response_type: 'code',
//         scope:
//           'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
//       };

//       const qs = new URLSearchParams(options);
//       const url = `${rootURl}?${qs.toString()}`;
//       window.location.href = url;
//     },
//   },
// ];

// export function ListStamps() {
//   // const { data: stampsData, isLoading: stampsIsLoading } = useQuery({
//   //   queryKey: ['stamps'],
//   //   queryFn: async () => {
//   //     return userRepository.getStamps();
//   //   },
//   // });

//   useEffect(() => {
//     const spotlights = document.querySelectorAll('[data-spotlight]');
//     spotlights.forEach((spotlight) => {
//       new Spotlight(spotlight);
//     });
//   }, []);

//   // if (stampsIsLoading) return <div>Loading...</div>;

//   return (
//     <div
//       className="relative z-0 max-w-sm mx-auto grid gap-6 lg:grid-cols-4 items-start lg:max-w-none group"
//       data-spotlight
//     >
//       {listOfStamps.map((stamp) => (
//         <Stamp key={stamp.code} data={stamp} />
//       ))}
//     </div>
//   );
// }
