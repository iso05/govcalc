import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { registry } from '../src/index.js';
import { D } from '../src/engine/decimal.js';
const context = { calculationDate: new Date('2026-10-05'), bhm: '440000.00', minimumWage: '0.00', currency: 'UZS' as const };
describe('Calculator regression and input boundaries', () => {
  it('adds decimal money without floating-point loss', () => assert.equal(D('0.1').add('0.2').toString(), '0.3'));
  it('separates duty and emblem for online first certificate (my.gov.uz 913 snapshot)', async () => {
    const result = await registry.calculate('GOV-001', { caseType: 'FIRST_CERTIFICATE', channel: 'ONLINE_YIDXP' }, context);
    assert.equal(result.stateDuty?.amount, '0.00');
    assert.equal(result.emblemFee?.amount, '59400.00');
    assert.equal(result.total.amount, '59400.00');
    assert.equal(result.verificationStatus, 'NEEDS_REVIEW');
  });
  it('includes duty and emblem for duplicate (my.gov.uz 865 snapshot)', async () => {
    const result = await registry.calculate('GOV-001', { serviceType: 'duplicate_copy' }, context);
    assert.equal(result.stateDuty?.amount, '59400.00');
    assert.equal(result.emblemFee?.amount, '59400.00');
    assert.equal(result.total.amount, '118800.00');
  });
  it('does not invent a postal tariff', async () => {
    const result = await registry.calculate('GOV-001', { caseType: 'DUPLICATE_CERTIFICATE', deliveryOption: 'postal' }, context);
    assert.equal(result.total.amount, '118800.00');
    assert.equal(result.deliveryFee?.formattedAmount, 'Alohida hisoblanadi');
  });
  it('keeps unresolved combined discount visible', async () => {
    const result = await registry.calculate('GOV-001', { caseType: 'DUPLICATE_CERTIFICATE', socialDiscount: true }, context);
    assert.equal(result.verificationStatus, 'NEEDS_HUMAN_REVIEW');
    assert(result.notesUz?.some(note => note.includes('NEEDS_HUMAN_REVIEW')));
  });
  it('rejects unknown inputs instead of selecting default case', async () => {
    await assert.rejects(registry.calculate('GOV-001', { serviceType: 'typo' }, context));
    await assert.rejects(registry.calculate('GOV-001', { caseType: 'UNKNOWN' }, context));
    await assert.rejects(registry.calculate('GOV-001', { socialDiscount: 'true' }, context));
  });
  it('rejects unavailable versions and invalid dates', async () => {
    await assert.rejects(registry.calculate('GOV-001', {}, context, 'nonexistent'));
    await assert.rejects(registry.calculate('GOV-001', {}, { ...context, calculationDate: new Date('invalid') }));
    await assert.rejects(registry.calculate('GOV-001', {}, { ...context, calculationDate: new Date('2010-01-01') }));
  });
});
