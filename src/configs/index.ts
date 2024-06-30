export const SUI_CONFIGS = {
  ORIGINAL_PACKAGE_ADDR: import.meta.env.VITE_ORIGINAL_PACKAGE_ADDR,
  PACKAGE_ADDR: import.meta.env.VITE_PACKAGE_ADDR,
  SUIPASS_ADDR: import.meta.env.VITE_SUIPASS_ADDR,
} as const;

export const SUIPASS_CONFIGS = {
  URL: import.meta.env.VITE_SUIPASS_URL ?? 'https://suipass.xyz',
  API_URL: import.meta.env.VITE_SUIPASS_API_URL ?? 'https://api.suipass.xyz/api',
};
