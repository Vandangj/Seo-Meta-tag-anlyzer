import { SeoMetaTags } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface GooglePreviewProps {
  tags: SeoMetaTags;
  url: string;
}

export function GooglePreview({ tags, url }: GooglePreviewProps) {
  const title = tags?.title || tags?.ogTitle || "No title";
  const description = tags?.description || tags?.ogDescription || "No description available";
  
  // Extract domain from URL
  const getDomain = (urlString: string) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return urlString;
    }
  };

  const domain = getDomain(url);

  return (
    <Card className="p-6 bg-background dark:bg-white" data-testid="preview-google">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          {tags?.favicon ? (
            <img src={tags.favicon} alt="" className="w-6 h-6 rounded" />
          ) : (
            <Globe className="w-5 h-5 text-gray-600" />
          )}
          <span className="text-sm text-gray-600 dark:text-gray-700">{domain}</span>
        </div>
        <h3 className="text-xl font-normal text-blue-600 dark:text-[#1a0dab] hover:underline cursor-pointer line-clamp-2" data-testid="google-title">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-700 line-clamp-2 leading-relaxed" data-testid="google-description">
          {description}
        </p>
      </div>
    </Card>
  );
}
