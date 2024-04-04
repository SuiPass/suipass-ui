export enum CredStatus {
  NotVerified = 'not_verified',
  Waiting = 'waiting',
  Verified = 'verified',
}
export type CredDto = {
  id: string;
  name: string;
  desc: string;
  logo: string;
  maxPoints: number;
  points: number;
  status: CredStatus;
};
