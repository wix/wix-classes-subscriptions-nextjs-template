import { WixSession } from '../auth/auth';
import type { plans } from '@wix/pricing-plans';
import { safeCall } from '@model/utils';

export const safeGetPaidPlans = (
  wixSession: WixSession,
  options?: { limit?: number; planIds?: string[] }
) => {
  return safeCall(
    () => getPaidPlans(wixSession, options).then((res) => res.items),
    [],
    'Get Public Plans'
  );
};

export const getPaidPlans = (
  wixSession: WixSession,
  { limit = 100, planIds = undefined as string[] | undefined } = {}
): Promise<plans.PlansQueryResult> =>
  wixSession!.wixClient!.plans.queryPublicPlans().find();
