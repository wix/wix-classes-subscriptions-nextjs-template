import MyAccountSection from '@app/components/MyAccount/MyAccountSection';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getMyPlanOrders } from '@app/model/paid-plans/paid-plans-api';

export default async function MyPlansPage() {
  const wixSession = useServerAuthSession();
  const planOrders = await getMyPlanOrders(wixSession);
  return (
    <MyAccountSection>
      {planOrders.orders?.map((order, index) => (
        <div key={order._id}>{order.planName}</div>
      ))}
    </MyAccountSection>
  );
}
