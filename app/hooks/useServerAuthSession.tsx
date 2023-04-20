import { createWixVisitorSession, WixSession } from '@app/model/auth/auth';

export const useServerAuthSession = (): WixSession => {
  return createWixVisitorSession();
};
