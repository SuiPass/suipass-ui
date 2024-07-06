import { SUIPASS_CONFIGS } from './suipass.config';

export const OAUTH2_CONFIG = {
  GITHUB: {
    ROOT_URL: 'https://github.com/login/oauth/authorize',
    OPTIONS: {
      client_id: 'Ov23li6vwWBqTMGaeaU1',
      redirect_uri: `${SUIPASS_CONFIGS.URL}/?suipassProvider=github`,
      scope: 'user:email',
      state: location.pathname,
    },
  },
  GOOGLE: {
    ROOT_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    OPTIONS: {
      client_id: '711294972943-nonheh2v74203ksus9l2ekfiqhbe202s.apps.googleusercontent.com',
      redirect_uri: `${SUIPASS_CONFIGS.URL}?suipassProvider=google`,
      state: location.pathname,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
    },
  },
  TWITTER: {
    ROOL_URL: 'https://twitter.com/i/oauth2/authorize',
    OPTIONS: {
      redirect_uri: `${SUIPASS_CONFIGS.URL}?suipassProvider=twitter`,
      client_id: 'ZXNlNmVLQWthRVRyWjgtRmVvNFU6MTpjaQ',
      state: 'state',
      response_type: 'code',
      code_challenge: 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8',
      code_challenge_method: 'S256',
      scope: ['users.read'].join(' '),
    },
  },
  VERISOUL: {
    ROOT_URL: 'https://app.sandbox.verisoul.ai',
    OPTIONS: {
      redirect_url: `${SUIPASS_CONFIGS.URL}?suipassProvider=verisoul`,
    },
  },
};
