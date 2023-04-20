import { createClient, OAuthStrategy } from '@wix/api-client';
import { availabilityCalendar, services } from '@wix/bookings';
import { plans } from '@wix/pricing-plans';
import { redirects } from '@wix/redirects';
import {
  WIX_MEMBER_TOKEN,
  WIX_REFRESH_TOKEN,
} from '@app/model/auth/auth.const';
import Cookies from 'js-cookie';

const refreshToken = JSON.parse(
  Cookies.get(WIX_MEMBER_TOKEN) || Cookies.get(WIX_REFRESH_TOKEN) || '{}'
);

export const wixClient = process.env.NEXT_PUBLIC_WIX_CLIENT_ID
  ? createClient({
      modules: { availabilityCalendar, redirects, services, plans },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: { refreshToken, accessToken: { value: '', expiresAt: 0 } },
      }),
    })
  : null;

export type WixClientType = typeof wixClient;
