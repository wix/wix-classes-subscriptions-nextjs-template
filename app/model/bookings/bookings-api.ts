import { WixSession } from '@app/model/auth/auth';

export const getMyBookings = (wixSession: WixSession) =>
  wixSession!.wixClient!.bookings.queryExtendedBookings({});
