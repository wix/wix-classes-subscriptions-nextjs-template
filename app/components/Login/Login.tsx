'use client';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import {
  AUTH_CALLBACK_PATHNAME,
  OAUTH_COOKIE_STATE,
  WIX_MEMBER_TOKEN,
} from '@app/model/auth/auth.const';
import LoginAvatar from '@app/components/Layout/NavBar/LoginAvatar';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';

type LoginProps = {
  onActionClick: (isLoggedIn: boolean) => void;
};
const LoginComp = ({ onActionClick }: LoginProps) => {
  const { wixClient } = useClientAuthSession();
  const memberSession = Cookies.get(WIX_MEMBER_TOKEN);
  const isLoggedIn = JSON.parse(memberSession || '{}').value;
  const onLoginClick = async () => {
    onActionClick(isLoggedIn);
    if (isLoggedIn) {
      Cookies.remove(WIX_MEMBER_TOKEN);
      const { url } = await wixClient!.auth.logout(window.location.href);
      window.location.href = url;
    } else {
      const oauthState = wixClient!.auth.generateOauthRedirectState(
        `${window.location.origin}/callback`,
        window.location.href
      );
      Cookies.set(OAUTH_COOKIE_STATE, JSON.stringify(oauthState), {
        expires: 0.01,
      });
      const { url } = await wixClient!.auth.authorizationUrl(oauthState);
      window.location.href = url;
    }
  };
  return window.location.pathname === AUTH_CALLBACK_PATHNAME ? null : (
    <button
      onClick={onLoginClick}
      className="flex flex-nowrap text-highlight gap-2 justify-center items-center font-open-sans-condensed"
    >
      <div>
        <LoginAvatar width={22} height={22} className="fill-highlight" />
      </div>
      <div className="flex relative whitespace-nowrap">
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </div>
    </button>
  );
};

const LoginNoSsr = dynamic(() => Promise.resolve(LoginComp), {
  ssr: false,
});

export default function Login(props: LoginProps) {
  return (
    <WixBookingsClientProvider>
      <LoginNoSsr {...props} />
    </WixBookingsClientProvider>
  );
}
