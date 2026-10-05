export type LegalVerificationStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'CONFLICT_DETECTED';
export type LegalDocumentType = 'Qonun' | 'Prezident Farmoni' | 'Prezident Qarori' | 'Vazirlar Mahkamasi Qarori' | 'Idoraviy Qoida';
export interface LegalSource {
    id: string;
    code: string;
    titleUz: string;
    titleRu?: string;
    titleEn?: string;
    documentType: LegalDocumentType;
    documentNumber: string;
    publicationDate: string;
    effectiveDate: string;
    officialUrl: string;
    articleParagraph: string;
    verificationStatus: LegalVerificationStatus;
    lastVerifiedAt: string;
    conflictNotes?: string;
}
export type LegalSourceReference = Omit<LegalSource, 'id'>;
//# sourceMappingURL=legal.d.ts.map