import PlansList from '@app/components/Plan/PlanList';
import ServiceListPreviewView from '@app/components/ServiceList/ServiceListPreview';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetServices } from '@model/service/service-api';
import { safeGetPaidPlans } from '@model/paid-plans/paid-plans-api';

export default async function TrainingPage() {
  const wixSession = useServerAuthSession();
  const {
    data: { services },
  } = await safeGetServices(wixSession, { limit: 3 });
  const { data: plans } = await safeGetPaidPlans(wixSession, { limit: 3 });
  return (
    <>
      <div className="px-3 py-12">
        <h1 className="text-center">Training</h1>
      </div>
      <ServiceListPreviewView services={services} />
      <div className="text-center mt-16">
        <a className="btn-main text-lg pt-1 pb-2 px-8" href="/classes-schedule">
          Book Now
        </a>
      </div>
      <PlansList plans={plans} />
    </>
  );
}
