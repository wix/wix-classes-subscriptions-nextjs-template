import { wixClient, WixClientType } from './create-client';

export type WixSession = {
  wixClient: WixClientType;
};

export const createWixVisitorSession = (): WixSession => {
  return {
    wixClient,
  };
};
