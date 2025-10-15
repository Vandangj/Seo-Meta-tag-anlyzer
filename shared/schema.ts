import { z } from "zod";

// SEO Analysis Request Schema
export const analyzeUrlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export type AnalyzeUrlRequest = z.infer<typeof analyzeUrlSchema>;

// SEO Meta Tags Schema
export interface SeoMetaTags {
  // General Meta Tags
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  canonical?: string;
  viewport?: string;
  charset?: string;
  
  // Open Graph Tags
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogSiteName?: string;
  ogLocale?: string;
  
  // Twitter Card Tags
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  
  // Additional Tags
  favicon?: string;
  themeColor?: string;
  language?: string;
}

// SEO Issue Types
export type IssueSeverity = 'critical' | 'warning' | 'info';

export interface SeoIssue {
  severity: IssueSeverity;
  category: string;
  title: string;
  description: string;
  recommendation: string;
}

// SEO Analysis Result Schema
export interface SeoAnalysisResult {
  url: string;
  fetchedAt: string;
  tags: SeoMetaTags;
  issues: SeoIssue[];
  score: number; // 0-100
  pageTitle: string;
}

export const seoAnalysisResultSchema = z.object({
  url: z.string(),
  fetchedAt: z.string(),
  tags: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    author: z.string().optional(),
    robots: z.string().optional(),
    canonical: z.string().optional(),
    viewport: z.string().optional(),
    charset: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().optional(),
    ogUrl: z.string().optional(),
    ogType: z.string().optional(),
    ogSiteName: z.string().optional(),
    ogLocale: z.string().optional(),
    twitterCard: z.string().optional(),
    twitterTitle: z.string().optional(),
    twitterDescription: z.string().optional(),
    twitterImage: z.string().optional(),
    twitterSite: z.string().optional(),
    twitterCreator: z.string().optional(),
    favicon: z.string().optional(),
    themeColor: z.string().optional(),
    language: z.string().optional(),
  }),
  issues: z.array(z.object({
    severity: z.enum(['critical', 'warning', 'info']),
    category: z.string(),
    title: z.string(),
    description: z.string(),
    recommendation: z.string(),
  })),
  score: z.number(),
  pageTitle: z.string(),
});
