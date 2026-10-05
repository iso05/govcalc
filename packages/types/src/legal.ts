export type LegalSourceStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'NEEDS_HUMAN_REVIEW' | 'CONFLICT' | 'EXPIRED';
export type LegalVerificationStatus = LegalSourceStatus;

export type LegalDocumentType =
  | 'Qonun'
  | 'Prezident Farmoni'
  | 'Prezident Qarori'
  | 'Vazirlar Mahkamasi Qarori'
  | 'Idoraviy Qoida'
  | 'Boshqa';

export interface LegalSource {
  id: string;
  code?: string;
  title: string;
  titleUz?: string;
  titleRu?: string;
  titleEn?: string;
  documentType: LegalDocumentType | string;
  documentNumber: string;
  publicationDate: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  officialUrl: string;
  article: string;
  paragraph?: string;
  lastVerifiedAt: string;
  status: LegalSourceStatus;

  // Compatibility aliases
  effectiveDate?: string;
  articleParagraph?: string;
  verificationStatus?: LegalSourceStatus;
  conflictNotes?: string;
}

export type LegalSourceReference = Omit<LegalSource, 'id'> & { id?: string };
