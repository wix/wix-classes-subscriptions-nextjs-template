import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { useCallback, useEffect, useState } from 'react';
import { createRedirectCallbacks } from '@app/model/redirects/redirect.utils';
import { availabilityCalendar } from '@wix/bookings';
import { useUserTimezone } from '@app/hooks/useFormattedTimezone';

export const useRedirectToCheckout = () => {
  const timezone = useUserTimezone();
  const session = useClientAuthSession();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const checkoutSlot = useCallback(
    (slotAvailability: availabilityCalendar.SlotAvailability) => {
      setRedirecting(true);
      session!
        .wixClient!.redirects.createRedirectSession({
          bookingsCheckout: {
            slotAvailability: slotAvailability!,
            timezone,
          },
          callbacks: createRedirectCallbacks({
            baseUrl: window.location.origin,
          }),
        })
        .then(({ redirectSession }) => {
          window.location.assign(redirectSession!.fullUrl!);
          setTimeout(() => {
            setRedirecting(false);
          }, 2000);
        })
        .catch((e) => {
          console.error(e);
          setRedirecting(false);
        });
    },
    [session, timezone]
  );
  return { checkoutSlot, redirecting };
};
