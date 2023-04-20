import './page.css';
import { getServiceBySlug } from '@app/model/service/service-api';
import DayCalendar from '@app/components/Calendar/DayCalendar/DayCalendar';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';

export default async function CalendarPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const { data: service } = await getServiceBySlug(wixSession, params.slug);

  return (
    <div className="max-w-full-content mx-auto bg-gray-c2 pb-10">
      {service ? (
        <>
          <section className="align-middle box-border p-7 pt-16 text-left">
            <h1 className="mb-4">{service?.info?.name}</h1>
            <p className="text-stone-300 font-open-sans-condensed text-lg">
              Check out our availability and book the date and time that works
              for you
            </p>
          </section>

          <div
            key={service.id}
            className="full-w rounded overflow-hidden max-w-7xl mx-auto text-stone-300"
          >
            <DayCalendar service={service} />
          </div>
        </>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </div>
  );
}
