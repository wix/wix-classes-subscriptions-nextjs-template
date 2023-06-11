import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetServices } from '@app/model/service/service-api';
import { services } from '@wix/bookings';
import WeeklyClassesCalendar from '@app/components/Calendar/WeeklyClassesCalendar/WeeklyClassesCalendar';
import testIds from '@app/utils/test-ids';

export default async function ClassesPage({}) {
  const wixSession = useServerAuthSession();
  const {
    data: { services: classes },
  } = await safeGetServices(wixSession, {
    types: [services.ServiceType.CLASS],
  });
  return (
    <div className="max-w-full-content mx-auto mt-14 px-4">
      <h1
        className="text-center"
        data-testid={testIds.CLASSES_SCHEDULE_PAGE.HEADER}
      >
        Book Online
      </h1>
      <div className="w-full border-b border-gray-600 mt-7 mb-3"></div>

      {classes?.length ? (
        <WeeklyClassesCalendar
          classes={classes.map(({ id, info: { name } }) => ({ id, name }))}
        />
      ) : (
        <h2>
          No classes or group sessions are offered at the moment. Click{' '}
          <a
            href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fbookings%2Fservices%2Ftemplates-catalog%3Forigin%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-highlight"
          >
            here
          </a>{' '}
          to go to the business dashboard to add classes or sessions. Once
          added, they will appear here.
        </h2>
      )}
    </div>
  );
}
