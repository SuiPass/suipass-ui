import { OAUTH2_CONFIG, SUIPASS_CONFIGS } from '@/configs';
import { createLazyFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

const VerisoulPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    let session_id = search.get('session_id');
    let success = search.get('success');
    navigate({ to: '/', search: { suipassProvider: 'verisoul', session_id, success: success === 'true' } });
  }, []);
  return null;
};

export const Route = createLazyFileRoute('/verisoul')({
  component: VerisoulPage,
});
