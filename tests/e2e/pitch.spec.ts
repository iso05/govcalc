import { test, expect } from '@playwright/test';

test('pitch requirements and mobile navigation remain accessible', async ({ page }) => {
  await page.goto('/pitch');
  for (const id of ['problem', 'team', 'why-us', 'roadmap', 'implementation']) {
    await expect(page.locator('#' + id)).toBeVisible();
  }
  await expect(page.getByRole('link', { name: 'GitHub ↗', exact: true })).toHaveAttribute('href', 'https://github.com/iso05');
  await expect(page.getByText('Muhammadiso Jo‘rayev', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  if ((page.viewportSize()?.width || 1280) < 768) {
    await page.getByRole('button', { name: 'Mobil menyu' }).click();
    await page.getByRole('navigation', { name: 'Mobil navigatsiya' }).getByRole('link', { name: 'Demo', exact: true }).click();
  } else {
    await page.getByRole('navigation', { name: 'Asosiy navigatsiya' }).getByRole('link', { name: 'Demo', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.getByRole('heading', { name: 'Demo-video hali joylanmagan' })).toBeVisible();
  await page.getByRole('link', { name: 'Kalkulyatorni ochish' }).click();
  await page.locator('#calculate-submit-btn').click();
  await expect(page.getByText('Hisoblash formulasi', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('status').getByText('Prototip — huquqiy tekshiruv talab qilinadi.')).toBeVisible();
});

test('API calculates, rejects bad data, and never substitutes unrelated services', async ({ request }) => {
  const endpoint = '/api/v1/calculators/fhdyo-tugilganlik-guvohnomasi/calculate';
  const response = await request.post(endpoint, { data: { inputs: { caseType: 'DUPLICATE_CERTIFICATE', channel: 'ONLINE_YIDXP' } } });
  expect(response.status()).toBe(200);
  const { data } = await response.json();
  expect(data.total.amount).toBe('118800.00');
  expect(data.verificationStatus).toBe('NEEDS_REVIEW');
  expect((await request.post(endpoint, { data: { inputs: { caseType: 'NOT_REAL' } } })).status()).toBe(400);
  expect((await request.post(endpoint, { data: { inputs: {}, targetDate: 'not-a-date' } })).status()).toBe(400);
  expect((await request.post(endpoint, { data: { inputs: {}, targetDate: '2010-01-01' } })).status()).toBe(400);
  expect((await request.post(endpoint, { data: { inputs: {}, versionCode: 'unknown' } })).status()).toBe(400);
  expect((await request.post(endpoint, { data: 'x'.repeat(17000) })).status()).toBe(413);
  expect((await request.get('/calculators/sud-boji-hisoblash')).status()).toBe(404);
});
