export interface Category {
  id: string;
  slug: string;
  nameUz: string;
  nameRu?: string;
  nameEn?: string;
  descriptionUz: string;
  descriptionRu?: string;
  descriptionEn?: string;
  icon: string; // Lucide icon identifier
  sortOrder: number;
  calculatorCount?: number;
}
