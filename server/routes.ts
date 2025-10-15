import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import * as cheerio from "cheerio";
import { SeoAnalysisResult, SeoIssue, SeoMetaTags, analyzeUrlSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate request body
      const validation = analyzeUrlSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid URL provided",
          details: validation.error.issues 
        });
      }

      const { url } = validation.data;

      // Demo mode for testing with sample HTML
      const isDemoMode = url.toLowerCase().includes('demo.example.com') || url.toLowerCase().includes('test-seo-analyzer');
      
      // Fetch website HTML
      let html: string;
      
      if (isDemoMode) {
        // Provide sample HTML for demo/testing
        html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Demo Website - SEO Best Practices Example</title>
            <meta name="description" content="This is a demo website showcasing SEO best practices with properly configured meta tags for search engines and social media platforms.">
            <meta name="keywords" content="SEO, demo, example, meta tags">
            <meta name="author" content="SEO Analyzer Team">
            <link rel="canonical" href="${url}">
            <meta property="og:title" content="Demo Website - SEO Best Practices">
            <meta property="og:description" content="Explore our comprehensive guide to SEO optimization with real-world examples and best practices.">
            <meta property="og:image" content="https://placehold.co/1200x630/2563eb/ffffff?text=SEO+Demo">
            <meta property="og:url" content="${url}">
            <meta property="og:type" content="website">
            <meta property="og:site_name" content="SEO Demo Site">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="Demo Website - SEO Best Practices">
            <meta name="twitter:description" content="Learn SEO optimization with our interactive examples.">
            <meta name="twitter:image" content="https://placehold.co/1200x630/2563eb/ffffff?text=SEO+Demo">
            <link rel="icon" href="https://placehold.co/32x32/2563eb/ffffff?text=D">
          </head>
          <body>
            <h1>Welcome to SEO Demo</h1>
          </body>
          </html>
        `;
      } else {
        try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          timeout: 15000,
          maxRedirects: 5,
          validateStatus: (status) => status >= 200 && status < 500,
        });
        
        if (response.status >= 400) {
          console.error(`HTTP ${response.status} for ${url}`);
          return res.status(400).json({ 
            error: `Website returned HTTP ${response.status}. The website may be blocking automated requests.` 
          });
        }
        
        html = response.data;
      } catch (error: any) {
        const errorMessage = error.code === 'ECONNREFUSED' 
          ? "Could not connect to the website. Please check the URL."
          : error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED'
          ? "Request timed out. The website may be slow or blocking requests."
          : error.code === 'ENOTFOUND'
          ? "Website not found. Please check the URL."
          : "Failed to fetch the website. The site may be blocking automated requests or temporarily unavailable.";
        
        console.error(`Error fetching ${url}:`, error.code, error.message);
        return res.status(400).json({ error: errorMessage });
        }
      }

      // Parse HTML with cheerio
      const $ = cheerio.load(html);

      // Extract meta tags
      const tags: SeoMetaTags = {
        // General tags
        title: $('title').first().text().trim() || undefined,
        description: $('meta[name="description"]').attr('content')?.trim() || undefined,
        keywords: $('meta[name="keywords"]').attr('content')?.trim() || undefined,
        author: $('meta[name="author"]').attr('content')?.trim() || undefined,
        robots: $('meta[name="robots"]').attr('content')?.trim() || undefined,
        canonical: $('link[rel="canonical"]').attr('href')?.trim() || undefined,
        viewport: $('meta[name="viewport"]').attr('content')?.trim() || undefined,
        charset: $('meta[charset]').attr('charset')?.trim() || $('meta[http-equiv="Content-Type"]').attr('content')?.match(/charset=([^;]+)/)?.[1]?.trim() || undefined,
        
        // Open Graph tags
        ogTitle: $('meta[property="og:title"]').attr('content')?.trim() || undefined,
        ogDescription: $('meta[property="og:description"]').attr('content')?.trim() || undefined,
        ogImage: $('meta[property="og:image"]').attr('content')?.trim() || undefined,
        ogUrl: $('meta[property="og:url"]').attr('content')?.trim() || undefined,
        ogType: $('meta[property="og:type"]').attr('content')?.trim() || undefined,
        ogSiteName: $('meta[property="og:site_name"]').attr('content')?.trim() || undefined,
        ogLocale: $('meta[property="og:locale"]').attr('content')?.trim() || undefined,
        
        // Twitter Card tags
        twitterCard: $('meta[name="twitter:card"]').attr('content')?.trim() || undefined,
        twitterTitle: $('meta[name="twitter:title"]').attr('content')?.trim() || undefined,
        twitterDescription: $('meta[name="twitter:description"]').attr('content')?.trim() || undefined,
        twitterImage: $('meta[name="twitter:image"]').attr('content')?.trim() || undefined,
        twitterSite: $('meta[name="twitter:site"]').attr('content')?.trim() || undefined,
        twitterCreator: $('meta[name="twitter:creator"]').attr('content')?.trim() || undefined,
        
        // Additional tags
        favicon: $('link[rel="icon"], link[rel="shortcut icon"]').first().attr('href')?.trim() || undefined,
        themeColor: $('meta[name="theme-color"]').attr('content')?.trim() || undefined,
        language: $('html').attr('lang')?.trim() || undefined,
      };

      // Analyze tags and generate issues
      const issues: SeoIssue[] = [];
      let score = 100;

      // Critical: Title
      if (!tags.title) {
        issues.push({
          severity: "critical",
          category: "General",
          title: "Missing Title Tag",
          description: "The page does not have a title tag, which is essential for SEO.",
          recommendation: "Add a descriptive title tag (50-60 characters) that accurately describes your page content."
        });
        score -= 20;
      } else if (tags.title.length > 60) {
        issues.push({
          severity: "warning",
          category: "General",
          title: "Title Too Long",
          description: `Title is ${tags.title.length} characters. Google typically displays 50-60 characters.`,
          recommendation: "Shorten your title to 50-60 characters to ensure it displays fully in search results."
        });
        score -= 5;
      } else if (tags.title.length < 30) {
        issues.push({
          severity: "warning",
          category: "General",
          title: "Title Too Short",
          description: `Title is only ${tags.title.length} characters. It may not be descriptive enough.`,
          recommendation: "Expand your title to better describe your page content (aim for 50-60 characters)."
        });
        score -= 5;
      }

      // Critical: Description
      if (!tags.description) {
        issues.push({
          severity: "critical",
          category: "General",
          title: "Missing Meta Description",
          description: "The page does not have a meta description tag.",
          recommendation: "Add a compelling meta description (150-160 characters) that summarizes your page content."
        });
        score -= 20;
      } else if (tags.description.length > 160) {
        issues.push({
          severity: "warning",
          category: "General",
          title: "Description Too Long",
          description: `Description is ${tags.description.length} characters. Google typically displays 150-160 characters.`,
          recommendation: "Shorten your description to 150-160 characters to avoid truncation in search results."
        });
        score -= 5;
      } else if (tags.description.length < 120) {
        issues.push({
          severity: "warning",
          category: "General",
          title: "Description Too Short",
          description: `Description is only ${tags.description.length} characters. You have room for more detail.`,
          recommendation: "Expand your description to better entice users (aim for 150-160 characters)."
        });
        score -= 3;
      }

      // Open Graph
      if (!tags.ogTitle && !tags.ogDescription && !tags.ogImage) {
        issues.push({
          severity: "warning",
          category: "Open Graph",
          title: "Missing Open Graph Tags",
          description: "No Open Graph tags found. Your page won't display well when shared on social media.",
          recommendation: "Add og:title, og:description, and og:image tags for better social media sharing."
        });
        score -= 10;
      } else {
        if (!tags.ogTitle) {
          issues.push({
            severity: "info",
            category: "Open Graph",
            title: "Missing og:title",
            description: "Open Graph title is missing. Falls back to page title when shared.",
            recommendation: "Add og:title for consistent branding across social platforms."
          });
          score -= 3;
        }
        if (!tags.ogDescription) {
          issues.push({
            severity: "info",
            category: "Open Graph",
            title: "Missing og:description",
            description: "Open Graph description is missing.",
            recommendation: "Add og:description to control how your page is described on social media."
          });
          score -= 3;
        }
        if (!tags.ogImage) {
          issues.push({
            severity: "warning",
            category: "Open Graph",
            title: "Missing og:image",
            description: "Open Graph image is missing. Social shares will appear without an image.",
            recommendation: "Add og:image (recommended: 1200x630px) for eye-catching social shares."
          });
          score -= 5;
        }
      }

      // Twitter Card
      if (!tags.twitterCard) {
        issues.push({
          severity: "info",
          category: "Twitter",
          title: "Missing Twitter Card Type",
          description: "No twitter:card meta tag found.",
          recommendation: "Add twitter:card tag (use 'summary_large_image' for best results)."
        });
        score -= 3;
      }

      if (!tags.twitterImage && !tags.ogImage) {
        issues.push({
          severity: "info",
          category: "Twitter",
          title: "Missing Twitter Image",
          description: "No twitter:image or og:image found.",
          recommendation: "Add twitter:image or og:image for visual Twitter cards."
        });
        score -= 2;
      }

      // Canonical URL
      if (!tags.canonical) {
        issues.push({
          severity: "info",
          category: "Technical",
          title: "Missing Canonical URL",
          description: "No canonical URL specified. This can cause duplicate content issues.",
          recommendation: "Add a canonical link tag to indicate the preferred version of this page."
        });
        score -= 3;
      }

      // Viewport
      if (!tags.viewport) {
        issues.push({
          severity: "warning",
          category: "Technical",
          title: "Missing Viewport Meta Tag",
          description: "No viewport meta tag found. This affects mobile responsiveness.",
          recommendation: "Add <meta name='viewport' content='width=device-width, initial-scale=1'> for proper mobile display."
        });
        score -= 5;
      }

      // Ensure score doesn't go below 0
      score = Math.max(0, score);

      const result: SeoAnalysisResult = {
        url,
        fetchedAt: new Date().toISOString(),
        tags,
        issues,
        score,
        pageTitle: tags.title || "Untitled Page"
      };

      res.json(result);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      res.status(500).json({ 
        error: "An error occurred while analyzing the URL" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
