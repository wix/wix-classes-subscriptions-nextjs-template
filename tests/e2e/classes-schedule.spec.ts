import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';
import { waitForWixSite } from '@tests/e2e/utils/wix-checkout';

test.describe('Calendar Page', () => {
  const PATH = '/classes-schedule';

  test('navigation - "Calendar" navigates to "checkout" page', async ({
    page,
  }) => {
    await page.goto(PATH);

    await page.getByTestId(testIds.CLASSES_SCHEDULE.NEXT_WEEK_CTA).click();

    let availableSessionSelector = `[data-testid="${testIds.CLASSES_SCHEDULE.CLASS_SLOT_CTA}"]:not([disabled])`;
    await page.waitForSelector(availableSessionSelector);

    await page.locator(availableSessionSelector).last().click();

    await waitForWixSite(page);

    await expect(await page.getByText('Booking Details')).toBeVisible();
  });
});
