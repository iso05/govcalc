import { Injectable } from '@nestjs/common';
import { LegalSource } from '@govcalc/types';

@Injectable()
export class LegalSourcesService {
  private readonly sources: LegalSource[] = [
    {
      id: 'src-1',
      code: 'LEX-4622285',
      title: 'O‘zbekiston Respublikasining "Davlat boji to‘g‘risida"gi Qonuni',
      titleUz: 'O‘zbekiston Respublikasining "Davlat boji to‘g‘risida"gi Qonuni',
      titleRu: 'Закон Республики Узбекистан "О государственной пошлине"',
      titleEn: 'Law of the Republic of Uzbekistan "On State Duty"',
      documentType: 'Qonun',
      documentNumber: 'O‘RQ-600',
      publicationDate: '2020-01-06T00:00:00.000Z',
      effectiveFrom: '2020-01-06T00:00:00.000Z',
      effectiveDate: '2020-01-06T00:00:00.000Z',
      officialUrl: 'https://lex.uz/docs/4622285',
      article: 'Davlat boji stavkalari ilovasi, 6-band "a" va "b" kichik bandlari',
      articleParagraph: 'Davlat boji stavkalari ilovasi, 6-band "a" va "b" kichik bandlari',
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      lastVerifiedAt: '2026-09-01T00:00:00.000Z',
    },
    {
      id: 'src-2',
      code: 'LEX-5093786',
      title: 'Vazirlar Mahkamasining "FHDYo sohasida davlat xizmatlari ko‘rsatish qoidalarini tasdiqlash haqida"gi Qarori',
      titleUz:
        'Vazirlar Mahkamasining "FHDYo sohasida davlat xizmatlari ko‘rsatish qoidalarini tasdiqlash haqida"gi Qarori',
      titleRu:
        'Постановление Кабинета Министров "Об утверждении правил оказания государственных услуг в сфере ЗАГС"',
      titleEn: 'Resolution of the Cabinet of Ministers on Civil Registry State Services',
      documentType: 'Vazirlar Mahkamasi Qarori',
      documentNumber: '700-son',
      publicationDate: '2020-11-10T00:00:00.000Z',
      effectiveFrom: '2020-11-10T00:00:00.000Z',
      effectiveDate: '2020-11-10T00:00:00.000Z',
      officialUrl: 'https://lex.uz/docs/5093786',
      article: '3-bob, 42-band (Gerb yig‘imini undirish tartibi)',
      articleParagraph: '3-bob, 42-band (Gerb yig‘imini undirish tartibi)',
      status: 'VERIFIED',
      verificationStatus: 'VERIFIED',
      lastVerifiedAt: '2026-09-01T00:00:00.000Z',
    },
  ];

  findAll(): LegalSource[] {
    return this.sources;
  }

  findByCode(code: string): LegalSource | undefined {
    return this.sources.find((s) => (s.code || '').toUpperCase() === code.toUpperCase());
  }
}
