import { wixClient } from '@app/model/auth/create-client';
import { createRedirectCallbacks } from '@app/model/redirects/redirect.utils';

import { NextResponse } from 'next/server';

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: Request) {
  let baseUrl = `https://${request.headers.get('host')}`;
  let referer = request.headers.get('referer');
  if (referer) {
    // get referrer with no search and query params
    baseUrl = new URL('/', referer).toString();
  }
  const { searchParams } = new URL(request.url);
  const checkoutData = searchParams.get('checkoutData');
  const planId = searchParams.get('planId')!;
  const { redirectSession } =
    (await wixClient?.redirects
      .createRedirectSession({
        paidPlansCheckout: {
          planId,
          checkoutData,
        },
        callbacks: createRedirectCallbacks({ baseUrl }),
      })
      .catch((e) => {
        console.error('*** failed redirect session', e);
        throw e;
      })) ?? {};
  return NextResponse.redirect(
    redirectSession?.fullUrl ? redirectSession!.fullUrl! : referer || baseUrl
  );
}
