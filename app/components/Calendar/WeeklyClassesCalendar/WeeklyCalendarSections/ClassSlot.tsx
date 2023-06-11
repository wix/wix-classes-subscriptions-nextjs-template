'use client';
import { SlotViewModel } from '@app/components/Calendar/calendar.view-model';
import { formatDistanceStrict } from 'date-fns';
import testIds from '@app/utils/test-ids';

export default function ClassSlot({
  slot,
  onSelect,
}: {
  slot: SlotViewModel;
  onSelect: (slot: SlotViewModel) => void;
}) {
  return (
    <div className="p-5 sm:p-3 text-left sm:text-sm flex flex-row sm:flex-col gap-6 sm:gap-0">
      <div>{slot.formattedTime}</div>
      <section className="flex-1">
        <div className="h-12 max-h-full">{slot.serviceName}</div>
        <div className="text-ellipsis overflow-hidden">
          {slot?.slotAvailability?.slot?.resource?.name}
        </div>
        <div>
          {slot?.slotAvailability?.slot?.startDate &&
          slot?.slotAvailability?.slot?.endDate
            ? formatDistanceStrict(
                new Date(slot!.slotAvailability!.slot!.startDate),
                new Date(slot!.slotAvailability!.slot!.endDate)
              )
            : null}
        </div>
        <div className="my-3 sm:text-xs">
          {slot.slotAvailability.bookable
            ? `${slot.slotAvailability.openSpots} spots left`
            : 'Registration closed'}
        </div>
        <div>
          <button
            data-testid={testIds.CLASSES_SCHEDULE.CLASS_SLOT_CTA}
            className="btn-main w-full px-0.5"
            type="button"
            onClick={() => onSelect(slot)}
            disabled={!slot.slotAvailability.bookable}
          >
            Book
          </button>
        </div>
      </section>
    </div>
  );
}
