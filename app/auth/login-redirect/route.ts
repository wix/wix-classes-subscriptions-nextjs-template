import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_CALLBACK_PATHNAME,
  AUTH_LOGIN_CALLBACK_PARAM,
  OAUTH_COOKIE_STATE,
} from '@app/model/auth/auth.const';
import { getServerWixClient } from '@app/model/auth/create-wix-client.server';

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const wixClient = getServerWixClient({
    cookieStore: request.cookies,
  });
  const { searchParams } = new URL(request.url);
  const originalUrl = searchParams.get(AUTH_LOGIN_CALLBACK_PARAM);
  if (!originalUrl) {
    throw new Error(
      `${AUTH_LOGIN_CALLBACK_PARAM} is required for login redirect`
    );
  }
  const redirectUrl = new URL(AUTH_CALLBACK_PATHNAME, request.url).toString();
  const oAuthState = wixClient!.auth.generateOauthRedirectState(
    redirectUrl,
    originalUrl
  );
  const { url } = await wixClient!.auth.authorizationUrl(oAuthState);
  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: OAUTH_COOKIE_STATE,
    value: JSON.stringify(oAuthState),
    maxAge: 1800, // 30 minutes
  });
  return response;
}
