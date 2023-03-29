import PlansList from '@app/components/Plan/PlanList';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetPaidPlans } from '@model/paid-plans/paid-plans-api';

// Manually opt out static rendering because of https://github.com/vercel/next.js/issues/43077
export const dynamic = 'force-dynamic';

export default async function PlansPage({
  searchParams,
}: {
  searchParams?: { [_: string]: string };
}) {
  const { planIds, checkoutData } = searchParams ?? {};
  const wixSession = useServerAuthSession();
  const { data: plans } = await safeGetPaidPlans(wixSession, {
    planIds: planIds ? planIds?.split(',') : undefined,
  });
  return <PlansList plans={plans} checkoutData={checkoutData} />;
}
