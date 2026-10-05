import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@govcalc/calculators';
import { getBhmForDate, OFFICIAL_CATEGORIES } from '@govcalc/config';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ path: string[] }> };
const fail = (message: string, status = 400) => NextResponse.json({ success: false, message }, { status });
const ok = (data: unknown) => NextResponse.json({ success: true, data });
const bodySchema = z.object({
  inputs: z.record(z.unknown()),
  targetDate: z.string().date().optional(),
  versionCode: z.string().max(60).optional(),
}).strict();

export async function GET(request: NextRequest, context: Context) {
  const { path } = await context.params;
  const route = path.join('/');
  if (route === 'calculators') {
    const query = request.nextUrl.searchParams;
    const search = (query.get('search') || '').toLocaleLowerCase();
    return ok(registry.listAll().filter(calc =>
      (!query.has('category') || calc.categorySlug === query.get('category')) &&
      (!query.has('isPremium') || calc.isPremium === (query.get('isPremium') === 'true')) &&
      `${calc.nameUz} ${calc.descriptionUz} ${calc.code}`.toLocaleLowerCase().includes(search)
    ));
  }
  if (route === 'categories') return ok(OFFICIAL_CATEGORIES.map((category, sortOrder) => ({ ...category, calculatorCount: category.slug === 'hujjatlar' ? 1 : 0, sortOrder })));
  if (route === 'system-settings/rates') {
    const rate = getBhmForDate();
    return ok({ bhm: rate.value, currency: rate.currency, effectiveDate: rate.effectiveFrom, status: rate.status, source: rate.source, sourceUrl: rate.sourceUrl });
  }
  if (path[0] === 'calculators' && path.length === 2) {
    const calculator = registry.getBySlug(path[1]) || registry.getByCode(path[1]);
    if (!calculator) return fail('Kalkulyator topilmadi', 404);
    const version = calculator.versions.find(item => item.status === 'PUBLISHED');
    return ok({ code: calculator.code, slug: calculator.slug, nameUz: calculator.nameUz, descriptionUz: calculator.descriptionUz, activeVersion: version && { versionCode: version.versionCode, inputFields: version.inputFields, legalSources: version.legalSources } });
  }
  return fail('API manzili topilmadi', 404);
}

export async function POST(request: NextRequest, context: Context) {
  const { path } = await context.params;
  if (path.length !== 3 || path[0] !== 'calculators' || path[2] !== 'calculate') return fail('API manzili topilmadi', 404);
  if (!registry.getBySlug(path[1]) && !registry.getByCode(path[1])) return fail('Kalkulyator topilmadi', 404);
  // Reject overlong bodies before JSON parsing. A calculator request is normally < 1 KB.
  if (Number(request.headers.get('content-length') || 0) > 16384) return fail('So‘rov hajmi juda katta', 413);
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail('So‘rov tanasi bo‘sh');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.length;
      if (size > 16384) { await reader.cancel(); return fail('So‘rov hajmi juda katta', 413); }
      chunks.push(chunk.value);
    }
    const dto = bodySchema.parse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
    const date = dto.targetDate ? new Date(`${dto.targetDate}T12:00:00Z`) : new Date();
    if (date.getTime() > Date.now() + 86400000) return fail('Kelajakdagi stavka ma’lum emas');
    const rate = getBhmForDate(date);
    const result = await registry.calculate(path[1], dto.inputs, {
      calculationDate: date, bhm: rate.value, currency: 'UZS',
    }, dto.versionCode);
    return ok(result);
  } catch (error) {
    if (error instanceof z.ZodError) return fail('Kiritilgan ma’lumotlar noto‘g‘ri: ' + error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; '));
    if (error instanceof SyntaxError) return fail('Yaroqli JSON yuboring');
    return fail(error instanceof Error ? error.message : 'Hisoblash amalga oshmadi');
  }
}
