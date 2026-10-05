import { test, expect } from '@playwright/test';

test.describe('GOV-001 Result Actions UI/UX', () => {
  test.beforeEach(async ({ page }) => {
    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/calculators/fhdyo-tugilganlik-guvohnomasi');
  });

  test('should render all modernized action buttons in tidy layout', async ({ page }) => {
    // Calculate initial result (Default: FIRST_CERTIFICATE via ONLINE_YIDXP)
    await page.click('#calculate-submit-btn');
    await expect(page.locator('text=59 400 so‘m').first()).toBeVisible();

    // Verify all 5 action buttons exist
    const recalculateBtn = page.locator('#action-recalculate-btn');
    const copyBtn = page.locator('#action-copy-btn');
    const saveBtn = page.locator('#action-save-btn');
    const shareBtn = page.locator('#action-share-btn');
    const printBtn = page.locator('#action-print-btn');
    const savedListBtn = page.locator('#action-view-saved-btn');

    await expect(recalculateBtn).toBeVisible();
    await expect(recalculateBtn).toContainText('Qayta hisoblash');

    await expect(copyBtn).toBeVisible();
    await expect(copyBtn).toContainText('Nusxa olish');

    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).toContainText('Natijani saqlash');

    await expect(shareBtn).toBeVisible();
    await expect(shareBtn).toContainText('Ulashish');

    await expect(printBtn).toBeVisible();
    await expect(printBtn).toContainText('Chop etish / PDF');

    await expect(savedListBtn).toBeVisible();
    await expect(savedListBtn).toContainText('Saqlangan natijalar');
  });

  test('should copy formatted plain text to clipboard and show toast', async ({ page }) => {
    await page.click('#calculate-submit-btn');
    await expect(page.locator('text=59 400 so‘m').first()).toBeVisible();

    // Click "Nusxa olish"
    await page.click('#action-copy-btn');

    // Toast "Nusxalandi!" should appear
    await expect(page.locator('text=Nusxalandi!')).toBeVisible();

    // Verify clipboard content
    const clipboardText = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });

    expect(clipboardText).toContain('Hisobchi');
    expect(clipboardText).toContain('Tug‘ilganlik guvohnomasi');
    expect(clipboardText).toContain('Holat: Guvohnomani birinchi marta olish');
    expect(clipboardText).toContain('BHM: 440 000 so‘m');
    expect(clipboardText).toContain('---');
    expect(clipboardText).toContain('Davlat boji: 0 so‘m');
    expect(clipboardText).toContain('Gerb yig‘imi: 59 400 so‘m');
    expect(clipboardText).toContain('Pullik xizmat: 0 so‘m');
    expect(clipboardText).toContain('Jami: 59 400 so‘m');
    expect(clipboardText).toContain('Huquqiy asos: O‘RQ-600, VMQ 550');
  });

  test('should save result to localStorage, show toast, and allow reopening via Saqlangan natijalar', async ({ page }) => {
    await page.click('#calculate-submit-btn');
    await expect(page.locator('text=59 400 so‘m').first()).toBeVisible();

    // Click "Natijani saqlash"
    await page.click('#action-save-btn');

    // Toast "Natija saqlandi" should appear
    await expect(page.locator('text=Natija saqlandi')).toBeVisible();

    // Check localStorage has saved item
    const savedItems = await page.evaluate(() => {
      const raw = localStorage.getItem('hisobchi_saved_results');
      return raw ? JSON.parse(raw) : [];
    });
    expect(savedItems.length).toBeGreaterThan(0);
    expect(savedItems[0].totalFormatted).toBe('59 400 so‘m');

    // Click "Qayta hisoblash" to go back to empty form
    await page.click('#action-recalculate-btn');
    await expect(page.locator('#calculate-submit-btn')).toBeVisible();

    // Open "Saqlangan natijalar" from the form header
    await page.click('#form-view-saved-btn');

    // Modal should be open showing the saved item
    await expect(page.locator('text=Saqlangan natijalar').first()).toBeVisible();
    await expect(page.locator('text=Guvohnomani birinchi marta olish').first()).toBeVisible();

    // Click "Ochish" to reload the saved calculation
    await page.click('button:has-text("Ochish")');

    // Calculation result should be instantly restored onto the screen
    await expect(page.locator('text=59 400 so‘m').first()).toBeVisible();
    await expect(page.locator('#action-copy-btn')).toBeVisible();
  });

  test('should trigger print layout on Chop etish / PDF click', async ({ page }) => {
    await page.click('#calculate-submit-btn');
    await expect(page.locator('text=59 400 so‘m').first()).toBeVisible();

    // Stub window.print to verify it gets called
    let printCalled = false;
    await page.exposeFunction('mockPrint', () => {
      printCalled = true;
    });
    await page.evaluate(() => {
      window.print = (window as any).mockPrint;
    });

    // Click "Chop etish / PDF"
    await page.click('#action-print-btn');

    await expect.poll(() => printCalled).toBe(true);
  });
});
