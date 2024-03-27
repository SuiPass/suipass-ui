import { Lazy } from '@/base';

export enum CredStatus {
  NOT_CONNECTED = 'not_connected',
  WAITING = 'waiting',
  CONNECTED = 'connected',
}
export type CredDto = {
  id: string;
  name: string;
  desc: string;
  logo: string;
  maxPoints: number;
  points: Lazy<number>;
  status: Lazy<CredStatus>;
};
