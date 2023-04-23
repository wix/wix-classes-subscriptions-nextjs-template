import { CookieStore, getWixClient } from '@app/model/auth/create-wix-client';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export type RequestCookiesGetter = Pick<RequestCookies, 'get'>;
const getCookieAdapter = (cookieStore: RequestCookiesGetter): CookieStore => {
  return {
    get: (name) => cookieStore.get(name)?.value,
  };
};

export const getServerWixClient = ({
  cookieStore,
}: {
  cookieStore: RequestCookiesGetter;
}) => getWixClient({ cookieStore: getCookieAdapter(cookieStore) });
