import { MetadataRoute } from 'next';
import { MOCK_CALCULATORS_INDEX, OFFICIAL_CATEGORIES } from '@govcalc/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = OFFICIAL_CATEGORIES.map((cat) => ({
    url: `${siteUrl}/calculators?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const calculatorRoutes: MetadataRoute.Sitemap = MOCK_CALCULATORS_INDEX.filter(calc => calc.id === 'GOV-001').map((calc) => ({
    url: `${siteUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  staticRoutes.push(...['/pitch', '/demo', '/api-access'].map(route => ({ url: `${siteUrl}${route}`, lastModified: new Date() })));
  return [...staticRoutes, ...categoryRoutes, ...calculatorRoutes];
}
