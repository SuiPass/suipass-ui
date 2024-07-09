import FaceDetection from '@/components/face-detection';
import { createLazyFileRoute } from '@tanstack/react-router';

function LivenessKYC() {
  return <div className='min-h-screen w-full flex items-center justify-center text-white flex-col'>
    <FaceDetection />
  </div>;
}

export const Route = createLazyFileRoute('/liveness-kyc')({
  component: LivenessKYC,
});
