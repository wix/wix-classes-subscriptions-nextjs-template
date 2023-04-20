'use client';
import { ServiceInfoViewModel } from '@app/model/service/service.mapper';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import { useEffect, useMemo, useState } from 'react';
import { useAvailability } from '@app/hooks/useAvailability';
import {
  addMonths,
  endOfDay,
  startOfDay,
  startOfMonth,
  isSameDay,
  format,
  formatISO,
} from 'date-fns';
import { Suspense } from 'react';
// react-day-picker/dist/index.js incorrectly uses "require"
// @ts-ignore
import { DayPicker } from 'react-day-picker/dist/index.esm';
import {
  useFormattedTimezone,
  useUserTimezone,
} from '@app/hooks/useFormattedTimezone';
import { Spinner } from 'flowbite-react';
import CalendarSlots from '@app/components/Calendar/DayCalendar/DayCalendarSections/CalendarSlots';
import CalendarSidebar from '@app/components/Calendar/DayCalendar/DayCalendarSections/CalendarSidebar';
import { availabilityCalendar } from '@wix/bookings';
import {
  slotsToSortedSlotsViewModel,
  SlotViewModel,
} from '@app/components/Calendar/calendar.view-model';

type CalendarDateRange = { from: string; to: string };

const getCalendarMonthRangeForDate = (date: Date): CalendarDateRange => {
  return {
    from: formatISO(startOfMonth(date)),
    to: formatISO(startOfMonth(addMonths(date, 3))),
  };
};

export function CalendarView({ service }: { service: ServiceInfoViewModel }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [dateRange, setDateRange] = useState<CalendarDateRange>(
    getCalendarMonthRangeForDate(selectedDate!)
  );
  const { data: rangeData, isLoading: isRangeDataLoading } = useAvailability({
    serviceId: service.id!,
    ...dateRange,
    slotsPerDay: 1,
    limit: 42, // 6 weeks
  });
  const { data: dayData, isLoading: isDayDataLoading } = useAvailability({
    serviceId: service.id!,
    from: formatISO(startOfDay(selectedDate)),
    to: formatISO(endOfDay(selectedDate)),
  });
  const timezone = useUserTimezone();
  const timezoneStr = useFormattedTimezone(timezone);
  useEffect(() => {
    // re-fetching existing range is cached
    setDateRange(getCalendarMonthRangeForDate(selectedDate!));
    setSelectedTime('');
  }, [selectedDate]);

  const slotsMap: { [key: string]: SlotViewModel[] } = useMemo(() => {
    return (
      slotsToSortedSlotsViewModel(
        [{ id: service?.id, name: service?.info.name }],
        dayData?.availabilityEntries
      )?.reduce<{
        [key: string]: SlotViewModel[];
      }>((acc, curr) => {
        const slotsArr = acc[curr.formattedTime] ?? [];
        // prefer bookable slots
        slotsArr[curr.slotAvailability.bookable ? 'unshift' : 'push'](curr);
        acc[curr.formattedTime] = slotsArr;
        return acc;
      }, {}) ?? {}
    );
  }, [dayData]);
  const showLoader = useMemo(
    () =>
      isDayDataLoading ||
      (!dayData?.availabilityEntries?.length && isRangeDataLoading),
    [isDayDataLoading, isRangeDataLoading, dayData]
  );
  const nextAvailableDate = useMemo(
    () =>
      rangeData?.availabilityEntries
        ?.filter(({ bookable }) => bookable)
        .map(({ slot }) => new Date(slot!.startDate!))
        .find((dateWithSlots) => dateWithSlots > selectedDate),
    [selectedDate, rangeData]
  );

  return (
    <div className="flex flex-wrap">
      <div className="m-6 max-w-full flex-grow">
        <div className="border-b pb-2 flex flex-wrap gap-4 items-baseline justify-between">
          <h2 className="text-2xl text-white">Select a Date and Time</h2>
          <span className="text-stone-300 text-lg font-open-sans-condensed">
            Timezone: {timezoneStr}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-6 min-w-fit ">
          <section className="mt-2">
            <DayPicker
              modifiers={{
                daysWithSlots: (date: Date | number) =>
                  !!rangeData?.availabilityEntries?.some(({ slot }) =>
                    isSameDay(date, new Date(slot!.startDate!))
                  ),
              }}
              modifiersClassNames={{
                daysWithSlots:
                  'relative before:absolute before:-skew-y-3 before:bg-highlight before:dot-md-center',
              }}
              mode="single"
              selected={selectedDate}
              onSelect={(date?: Date) => date && setSelectedDate(date)}
              onMonthChange={setSelectedDate}
              showOutsideDays
              fixedWeeks
              month={startOfMonth(selectedDate)}
            />
          </section>
          <section className="flex-1 w-60 max-w-full font-open-sans-condensed text-lg">
            <div className="mt-4">{format(selectedDate, 'EEEE, d MMMM')}</div>
            {showLoader ? (
              <div className="w-full h-36 flex items-center justify-center">
                <Spinner color="gray" />
              </div>
            ) : dayData?.availabilityEntries?.length ? (
              <div className="grid grid-cols-auto-sm gap-2 pt-4">
                <CalendarSlots
                  slots={Object.keys(slotsMap)
                    // use the first slot since non-bookable ones are at the end
                    .map((slotTime) => slotsMap[slotTime][0])}
                  selectedTime={selectedTime}
                  onTimeSelected={setSelectedTime}
                />
              </div>
            ) : !!nextAvailableDate ? (
              <div className="pt-4">
                <button
                  className="btn-main w-full"
                  onClick={() => setSelectedDate(nextAvailableDate)}
                >
                  Check Next Availability
                </button>
              </div>
            ) : (
              <div className="pt-4">No availability</div>
            )}
          </section>
        </div>
      </div>
      <section className="m-6 w-52 flex-grow">
        <CalendarSidebar
          service={service}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          timezone={timezone}
          slotsForTime={slotsMap[selectedTime] ?? []}
        />
      </section>
    </div>
  );
}

export default function DayCalendar({
  service,
}: {
  service: ServiceInfoViewModel;
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-36 flex items-center justify-center">
          <Spinner color="gray" />
        </div>
      }
    >
      <WixBookingsClientProvider>
        <CalendarView service={service} />
      </WixBookingsClientProvider>
    </Suspense>
  );
}
