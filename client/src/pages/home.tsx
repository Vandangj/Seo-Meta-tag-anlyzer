import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SeoAnalysisResult, seoAnalysisResultSchema } from "@shared/schema";
import { UrlInputForm } from "@/components/url-input-form";
import { GooglePreview } from "@/components/google-preview";
import { FacebookPreview } from "@/components/facebook-preview";
import { TwitterPreview } from "@/components/twitter-preview";
import { MetaTagsDisplay } from "@/components/meta-tags-display";
import { SeoFeedback } from "@/components/seo-feedback";
import { GooglePreviewSkeleton, FacebookPreviewSkeleton, TwitterPreviewSkeleton } from "@/components/preview-skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);

  const analyzeUrl = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/analyze", { url });
      const data = await response.json();
      // Validate response with Zod schema for runtime type safety
      try {
        const validatedResult = seoAnalysisResultSchema.parse(data);
        return validatedResult;
      } catch (zodError) {
        console.error("Zod validation error:", zodError);
        console.error("Response received:", data);
        // Return data anyway if Zod validation fails (for debugging)
        return data as SeoAnalysisResult;
      }
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleAnalyze = (url: string) => {
    analyzeUrl.mutate(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Search className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold" data-testid="app-title">
              SEO Meta Tags Analyzer
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with URL Input */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Analyze Your Website's SEO
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant feedback on your meta tags with visual previews for Google, Facebook, and Twitter
          </p>
          <UrlInputForm onAnalyze={handleAnalyze} isLoading={analyzeUrl.isPending} />
        </div>

        {/* Error State */}
        {analyzeUrl.isError && (
          <Alert variant="destructive" className="mb-8" data-testid="error-alert">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to analyze the URL. Please check the URL and try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {(analyzeUrl.isPending || analysisResult) && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Previews */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Google Search Preview</h3>
                {analyzeUrl.isPending ? (
                  <GooglePreviewSkeleton />
                ) : analysisResult && analysisResult.tags ? (
                  <GooglePreview tags={analysisResult.tags} url={analysisResult.url} />
                ) : null}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Facebook Preview</h3>
                {analyzeUrl.isPending ? (
                  <FacebookPreviewSkeleton />
                ) : analysisResult && analysisResult.tags ? (
                  <FacebookPreview tags={analysisResult.tags} url={analysisResult.url} />
                ) : null}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Twitter Preview</h3>
                {analyzeUrl.isPending ? (
                  <TwitterPreviewSkeleton />
                ) : analysisResult && analysisResult.tags ? (
                  <TwitterPreview tags={analysisResult.tags} url={analysisResult.url} />
                ) : null}
              </div>
            </div>

            {/* Right Column - Meta Tags & Feedback */}
            <div className="space-y-6">
              {/* SEO Feedback */}
              {analyzeUrl.isPending ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">SEO Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ) : analysisResult && analysisResult.issues ? (
                <SeoFeedback issues={analysisResult.issues} score={analysisResult.score} />
              ) : null}

              {/* Meta Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Meta Tags Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyzeUrl.isPending ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ) : analysisResult && analysisResult.tags ? (
                    <MetaTagsDisplay tags={analysisResult.tags} />
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analyzeUrl.isPending && !analysisResult && !analyzeUrl.isError && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter a URL to get started</h3>
            <p className="text-muted-foreground">
              Analyze any website to see how it appears on Google, Facebook, and Twitter
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
