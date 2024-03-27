export type Lazy<T, K = any> = {
  isLoading: boolean;
  data?: T;
  error?: K;
};

export const LazyField = {
  ...{
    isLoading: true,
  },
};
