import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetServices } from '@app/model/service/service-api';
import { services } from '@wix/bookings';
import WeeklyClassesCalendar from '@app/components/Calendar/WeeklyClassesCalendar/WeeklyClassesCalendar';

export default async function ClassesPage({}) {
  const wixSession = useServerAuthSession();
  const {
    data: { services: classes },
  } = await safeGetServices(wixSession, {
    types: [services.ServiceType.CLASS],
  });
  return (
    <div className="max-w-full-content mx-auto mt-14 px-4">
      <h1 className="text-center">Book Online</h1>
      <div className="w-full border-b border-gray-600 mt-7 mb-3"></div>

      {classes?.length ? (
        <WeeklyClassesCalendar
          classes={classes.map(({ id, info: { name } }) => ({ id, name }))}
        />
      ) : (
        <h2>We currently offer no classes or group sessions</h2>
      )}
    </div>
  );
}
