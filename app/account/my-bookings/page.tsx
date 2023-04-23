import MyAccountSection from '@app/components/MyAccount/MyAccountSection';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getMyBookings } from '@app/model/bookings/bookings-api';

export default async function MyBookingsPage() {
  const wixSession = useServerAuthSession();
  const bookings = await getMyBookings(wixSession);
  return (
    <MyAccountSection>
      {bookings.extendedBookings?.map(({ booking }, index) => (
        <div key={booking!._id}>{booking?.bookedEntity?.title}</div>
      ))}
    </MyAccountSection>
  );
}
