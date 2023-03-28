import { availabilityCalendar } from '@wix/bookings';
import { format, startOfDay } from 'date-fns';

export type SlotViewModel = {
  slotDate: Date;
  formattedTime: string;
  slotAvailability: availabilityCalendar.SlotAvailability;
  serviceName: string;
};

const TIME_FORMAT = 'hh:mm a';

const formatSlot = (slotAvailability: availabilityCalendar.SlotAvailability) =>
  format(new Date(slotAvailability.slot!.startDate!), TIME_FORMAT);

export const slotsToSortedSlotsViewModel = (
  services: { id: string; name: string }[],
  slots?: availabilityCalendar.SlotAvailability[]
): SlotViewModel[] | undefined => {
  const serviceNameMap = services.reduce((map, curr) => {
    map.set(curr.id, curr.name);
    return map;
  }, new Map<string, string>());
  return slots
    ?.sort(
      (dayDataA, dayDataB) =>
        new Date(dayDataA.slot?.startDate ?? 0).getTime() -
        new Date(dayDataB.slot?.startDate ?? 0).getTime()
    )
    .map((slotData) => ({
      slotDate: startOfDay(new Date(slotData?.slot?.startDate ?? 0)),
      formattedTime: formatSlot(slotData),
      slotAvailability: slotData,
      serviceName: serviceNameMap.get(slotData!.slot!.serviceId!)!,
    }));
};
