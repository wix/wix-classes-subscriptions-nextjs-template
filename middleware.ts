import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_LOGIN_CALLBACK_PARAM,
  AUTH_LOGIN_PATHNAME,
  REDIRECT_FROM_WIX_LOGIN_STATUS,
  WIX_MEMBER_TOKEN,
  WIX_REFRESH_TOKEN,
} from '@app/model/auth/auth.const';
import { wixClient } from '@app/model/auth/create-client';

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const res = NextResponse.next();
  const memberToken = cookies.get(WIX_MEMBER_TOKEN);
  if (!cookies.get(WIX_REFRESH_TOKEN) && !memberToken) {
    const tokens = await wixClient!.auth.generateVisitorTokens();
    res.cookies.set(WIX_REFRESH_TOKEN, JSON.stringify(tokens.refreshToken), {
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  const wixMemberLoggedIn = request.nextUrl.searchParams.get(
    REDIRECT_FROM_WIX_LOGIN_STATUS
  );
  if (wixMemberLoggedIn === 'false') {
    cookies.delete(WIX_MEMBER_TOKEN);
  }
  if (
    wixMemberLoggedIn === 'true' ||
    (!memberToken && request.nextUrl.pathname.startsWith('/account'))
  ) {
    const redirectUrl = new URL(AUTH_LOGIN_PATHNAME, request.url);
    const loginCallbackUrl = new URL(request.url);
    redirectUrl.searchParams.delete(REDIRECT_FROM_WIX_LOGIN_STATUS);
    loginCallbackUrl.searchParams.delete(REDIRECT_FROM_WIX_LOGIN_STATUS);
    redirectUrl.searchParams.set(
      AUTH_LOGIN_CALLBACK_PARAM,
      loginCallbackUrl.toString()
    );
    return NextResponse.redirect(redirectUrl);
  }
  return res;
}

export const config = {
  unstable_allowDynamic: [
    '**/node_modules/lodash/**',
    '**/node_modules/@wix/**',
  ],
};
