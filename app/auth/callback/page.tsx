'use client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { OauthRedirectState } from '@wix/api-client';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import {
  OAUTH_COOKIE_STATE,
  WIX_MEMBER_TOKEN,
} from '@app/model/auth/auth.const';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import { Spinner } from 'flowbite-react';

const CallbackHandle = () => {
  const { wixClient } = useClientAuthSession();

  useEffect(() => {
    const oAuthStateCookie = Cookies.get(OAUTH_COOKIE_STATE);
    const oAuthState: OauthRedirectState = JSON.parse(oAuthStateCookie ?? '{}');
    const originalUrl =
      // use home by default
      oAuthState.originalUrl || new URL('/', window.location.href).toString();

    if (window.location.search.includes('error=')) {
      window.location.href = originalUrl;
      return;
    }

    const { state, code } = wixClient!.auth.parseFromUrl();

    wixClient!.auth.getMemberTokens(code, state, oAuthState).then((tokens) => {
      Cookies.remove(OAUTH_COOKIE_STATE);
      Cookies.set(WIX_MEMBER_TOKEN, JSON.stringify(tokens.refreshToken), {
        expires: 2,
      });
      window.location.href = originalUrl;
    });
  }, []);
  return (
    <div className="w-full h-48 flex justify-center items-center">
      <Spinner size="xl" color="gray" />
    </div>
  );
};

export default function Callback() {
  return (
    <WixBookingsClientProvider>
      <CallbackHandle />
    </WixBookingsClientProvider>
  );
}
