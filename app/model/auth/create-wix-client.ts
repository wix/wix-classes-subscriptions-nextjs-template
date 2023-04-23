import { createClient, OAuthStrategy } from '@wix/api-client';
import { availabilityCalendar, services } from '@wix/bookings';
import { plans } from '@wix/pricing-plans';
import { redirects } from '@wix/redirects';
import {
  WIX_MEMBER_TOKEN,
  WIX_REFRESH_TOKEN,
} from '@app/model/auth/auth.const';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

export type CookieStore = {
  get(name: string): string | undefined;
};
const getRefreshToken = (cookieStore: CookieStore) =>
  process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD
    ? JSON.parse(
        cookieStore.get(WIX_MEMBER_TOKEN) ||
          cookieStore.get(WIX_REFRESH_TOKEN) ||
          '{}'
      )
    : {};

/**
 * This might not be 100% efficient in the client (in case some of the Wix business modules are only used in the server),
 * For simplicity creating one implementation
 **/
export const getWixClient = ({ cookieStore }: { cookieStore: CookieStore }) =>
  process.env.NEXT_PUBLIC_WIX_CLIENT_ID
    ? createClient({
        modules: { availabilityCalendar, redirects, services, plans },
        auth: OAuthStrategy({
          clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
          tokens: {
            refreshToken: getRefreshToken(cookieStore),
            accessToken: { value: '', expiresAt: 0 },
          },
        }),
      })
    : null;

export type WixClientType = ReturnType<typeof getWixClient>;
