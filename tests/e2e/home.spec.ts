import { test, expect } from '@playwright/test';
import testIds from '@app/utils/test-ids';

test.describe('Home Page', () => {
  const PATH = '/';

  test('look and feel - header', async ({ page }) => {
    await page.goto(PATH);

    await expect(
      await page.getByTestId(testIds.HOME_PAGE.HEADER)
    ).toHaveScreenshot('home-header.png', {
      mask: [page.getByTestId(testIds.LAYOUT.HEADER)],
    });
  });

  test('navigation - "Book Now" navigates to "Classes Schedule" page', async ({
    page,
  }) => {
    await page.goto(PATH);

    await page.getByTestId(testIds.HOME_PAGE.BOOK_CLASS_CTA).click();

    await expect(
      await page.getByTestId(testIds.CLASSES_SCHEDULE_PAGE.HEADER)
    ).toBeVisible();
  });

  test('navigation - "Membership" navigates to "Plans" page', async ({
    page,
  }) => {
    await page.goto(PATH);

    await page.getByTestId(testIds.HOME_PAGE.BOOK_PLAN_CTA).click();

    await expect(
      await page.getByTestId(testIds.PLANS_PAGE.HEADER)
    ).toBeVisible();
  });
});
