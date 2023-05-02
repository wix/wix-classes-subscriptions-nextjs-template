'use client';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import {
  AUTH_CALLBACK_PATHNAME,
  AUTH_LOGIN_CALLBACK_PARAM,
  AUTH_LOGIN_PATHNAME,
  WIX_REFRESH_TOKEN,
} from '@app/model/auth/auth.const';
import LoginAvatar from '@app/components/Layout/NavBar/LoginAvatar';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';

const URLS_WITH_NO_AVATAR = [AUTH_CALLBACK_PATHNAME, AUTH_LOGIN_PATHNAME];

type LoginProps = {
  onActionClick: (isLoggedIn: boolean) => void;
};
const LoginComp = ({ onActionClick }: LoginProps) => {
  const { wixClient } = useClientAuthSession();
  const isLoggedIn = wixClient?.auth.loggedIn();
  const onLoginClick = async () => {
    onActionClick(!!isLoggedIn);
    if (isLoggedIn) {
      // after logout return to home page
      const { logoutUrl } = await wixClient!.auth.logout(
        window.location.origin
      );
      Cookies.remove(WIX_REFRESH_TOKEN);
      window.location.href = logoutUrl;
    } else {
      const loginUrl = new URL(AUTH_LOGIN_PATHNAME, window.location.origin);
      loginUrl.searchParams.set(
        AUTH_LOGIN_CALLBACK_PARAM,
        window.location.href
      );
      window.location.href = loginUrl.toString();
    }
  };
  return URLS_WITH_NO_AVATAR.includes(window.location.pathname) ? null : (
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
