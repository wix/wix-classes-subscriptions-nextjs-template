'use client';
import { PropsWithChildren } from 'react';
import { Tooltip } from 'flowbite-react';
import type { availabilityCalendar } from '@wix/bookings';
import { SlotViewModel } from '@app/components/Calendar/calendar.view-model';

const SlotTooltip = ({
  bookable,
  bookingPolicyViolations,
  children,
}: PropsWithChildren<
  Pick<
    availabilityCalendar.SlotAvailability,
    'bookable' | 'bookingPolicyViolations'
  >
>) =>
  bookable ? (
    <div className="w-fit">{children}</div>
  ) : (
    <Tooltip
      style="light"
      content={
        bookingPolicyViolations?.tooLateToBook
          ? 'This slot cannot be booked anymore'
          : bookingPolicyViolations?.tooLateToBook
          ? 'It is too early to book this slot'
          : 'This slot cannot be booked'
      }
    >
      {children}
    </Tooltip>
  );

const CalendarSlots = ({
  slots,
  onTimeSelected,
  selectedTime,
}: {
  slots: SlotViewModel[];
  selectedTime: string;
  onTimeSelected: (selectedTime: string) => void;
}) => (
  <>
    {slots.map(
      (
        {
          formattedTime,
          slotAvailability: { bookable, bookingPolicyViolations },
        },
        index
      ) => (
        <button
          key={index}
          className={`px-3 py-1.5 w-full border flex justify-center ${
            bookable
              ? formattedTime === selectedTime
                ? 'border-highlight bg-highlight bg-opacity-10'
                : 'hover:border-white border-stone-400'
              : 'text-stone-600 border-stone-500'
          }`}
          disabled={!bookable}
          aria-label={'Select ' + formattedTime}
          onClick={() => onTimeSelected(formattedTime)}
        >
          <SlotTooltip
            bookable={bookable}
            bookingPolicyViolations={bookingPolicyViolations}
          >
            <span>{formattedTime}</span>
          </SlotTooltip>
        </button>
      )
    )}
  </>
);

export default CalendarSlots;
