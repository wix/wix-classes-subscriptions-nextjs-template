'use client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import {
  AUTH_CALLBACK_PATHNAME,
  AUTH_LOGIN_CALLBACK_PARAM,
  OAUTH_COOKIE_STATE,
} from '@app/model/auth/auth.const';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import { Spinner } from 'flowbite-react';
import dynamic from 'next/dynamic';

const LoginRedirectHandle = () => {
  const searchParams = useSearchParams();
  let originalUrl =
    searchParams?.get(AUTH_LOGIN_CALLBACK_PARAM) || window.location.origin;
  if (!originalUrl.startsWith(window.location.origin)) {
    // don't allow returning to a different domain
    originalUrl = window.location.origin;
  }
  const { wixClient } = useClientAuthSession();

  useEffect(() => {
    const oAuthState = wixClient!.auth.generateOauthRedirectState(
      `${window.location.origin}${AUTH_CALLBACK_PATHNAME}`,
      originalUrl
    );
    Cookies.set(OAUTH_COOKIE_STATE, JSON.stringify(oAuthState), {
      expires: 0.01,
    });

    wixClient!.auth
      .authorizationUrl(oAuthState)
      .then(({ url }) => {
        window.location.href = url;
      })
      .catch((e) => {
        console.error(e);
        window.location.href = window.location.origin;
      });
  }, []);
  return null;
};

const LoginRedirectNoSsr = dynamic(() => Promise.resolve(LoginRedirectHandle), {
  ssr: false,
});

export default function LoginRedirect() {
  return (
    <>
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="xl" color="gray" />
      </div>
      <WixBookingsClientProvider>
        <LoginRedirectNoSsr />
      </WixBookingsClientProvider>
    </>
  );
}
