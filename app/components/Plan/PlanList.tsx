import { plans } from '@wix/pricing-plans';
import { formatCurrencyToParts } from '@app/utils/price-formtter';
import PlanSelect from '@app/components/Plan/PlanSelect';
import { getCheckoutUrl } from '@model/paid-plans/paid-plans-checkout';

const durationPeriodFormatter = (
  period: plans.PeriodUnit = plans.PeriodUnit.UNDEFINED
): { plural: string; singular: string } => {
  switch (period) {
    case plans.PeriodUnit.DAY:
      return { plural: 'Days', singular: 'Day' };
    case plans.PeriodUnit.WEEK:
      return { plural: 'Weeks', singular: 'Week' };
    case plans.PeriodUnit.MONTH:
      return { plural: 'Months', singular: 'Month' };
    case plans.PeriodUnit.YEAR:
      return { plural: 'Years', singular: 'Year' };
    case plans.PeriodUnit.UNDEFINED:
    default:
      return { plural: '', singular: '' };
  }
};

const formatOneTimePlanDuration = (duration: plans.Duration) => {
  const periodFormat = durationPeriodFormatter(duration.unit);
  return `${duration.count ?? 0} ${
    duration.count === 1 ? periodFormat.singular : periodFormat.plural
  }`;
};

const formatRecurringPlanDuration = (recurrence: plans.Recurrence) => {
  const periodFormat = durationPeriodFormatter(recurrence?.cycleDuration?.unit);
  return recurrence?.cycleDuration?.count === 1
    ? periodFormat.singular
    : `${recurrence?.cycleDuration?.count ?? 0} ${periodFormat.plural}`;
};

function formatPlanDuration(plan: plans.Plan) {
  return plan.pricing?.singlePaymentUnlimited
    ? 'Unlimited'
    : plan.pricing?.singlePaymentForDuration
    ? `Valid for ${formatOneTimePlanDuration(
        plan.pricing?.singlePaymentForDuration!
      )}`
    : plan?.pricing?.subscription
    ? `Recurring every ${formatRecurringPlanDuration(
        plan!.pricing!.subscription!
      )}`
    : '';
}

export default function PlansList({
  checkoutData,
  plans,
}: {
  checkoutData?: string;
  plans?: plans.PublicPlan[];
}) {
  return (
    <div className="max-w-full-content mx-auto pb-8">
      <div className="px-3">
        <h1 className="mb-2 mt-16 text-center">Plans & Pricing</h1>
        {plans?.length ? (
          <div className="p-3 pt-8 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {plans?.map((plan) => {
              const priceParts = formatCurrencyToParts(
                plan.pricing?.price?.value,
                plan.pricing?.price?.currency
              );
              return (
                <li
                  key={plan._id}
                  className="text-black w-full list-none rounded-none bg-red-300 overflow-hidden mx-auto border-0 m-0 p-0 flex flex-col"
                >
                  <div className="text-center px-9 py-7 flex flex-grow flex-col justify-start items-center w-full border-0">
                    <h2 className="pb-3 text-2xl">{plan.name}</h2>
                    <div className="relative pb-3">
                      <span className="text-sm align-top">
                        {priceParts.currencySign}
                      </span>
                      <span className="text-7xl">{priceParts.price}</span>
                    </div>
                    <div className="text-xs pb-4 flex-grow font-open-sans-condensed">
                      {plan.description}
                    </div>
                    <div className="text-xs font-open-sans-condensed">
                      {formatPlanDuration(plan)}
                    </div>
                    <PlanSelect
                      checkoutUrl={getCheckoutUrl({
                        plan,
                        checkoutData,
                      })}
                    >
                      <div className="btn-secondary w-full cursor-pointer mt-5">
                        Select
                      </div>
                    </PlanSelect>
                  </div>
                  <div className="bg-white px-9 py-5 flex flex-col justify-start items-center w-full h-56 overflow-y-auto">
                    <ul>
                      {plan.perks?.values?.map((perk, index) => (
                        <li key={index} className="py-1 text-center">
                          <span className="text-sm pl-2 font-open-sans-condensed">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            No Pricing Plans are offered at the moment
          </div>
        )}
      </div>
    </div>
  );
}
