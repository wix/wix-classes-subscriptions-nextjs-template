import { useClientAuthSession } from '@app/hooks/useClientAuthSession';
import { useCallback, useState } from 'react';
import { createRedirectCallbacks } from '@model/redirects/redirect.utils';
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
            serviceId: slotAvailability?.slot?.serviceId,
          },
          callbacks: createRedirectCallbacks({
            baseUrl: window.location.origin,
          }),
        })
        .then(({ redirectSession }) => {
          window.location.href = redirectSession!.fullUrl!;
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
