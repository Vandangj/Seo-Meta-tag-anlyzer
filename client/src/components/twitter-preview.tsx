import { SeoMetaTags } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

interface TwitterPreviewProps {
  tags: SeoMetaTags;
  url: string;
}

export function TwitterPreview({ tags, url }: TwitterPreviewProps) {
  const cardType = tags?.twitterCard || "summary";
  const title = tags?.twitterTitle || tags?.ogTitle || tags?.title || "No title";
  const description = tags?.twitterDescription || tags?.ogDescription || tags?.description || "No description";
  const image = tags?.twitterImage || tags?.ogImage;
  const domain = new URL(url).hostname.replace("www.", "");

  const isSummaryLargeImage = cardType === "summary_large_image";

  return (
    <Card className="overflow-hidden border-2 bg-background dark:bg-white dark:border-gray-300" data-testid="preview-twitter">
      {isSummaryLargeImage ? (
        <>
          {image ? (
            <div className="relative w-full aspect-[2/1] bg-gray-200 dark:bg-gray-300">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                data-testid="twitter-image"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[2/1] bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div className="p-3">
            <p className="text-sm text-gray-600 dark:text-gray-700 mb-1" data-testid="twitter-domain">
              {domain}
            </p>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-900 line-clamp-1 mb-1" data-testid="twitter-title">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-700 line-clamp-1" data-testid="twitter-description">
              {description}
            </p>
          </div>
        </>
      ) : (
        <div className="flex p-3 gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 dark:text-gray-700 mb-1" data-testid="twitter-domain">
              {domain}
            </p>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-900 line-clamp-1 mb-1" data-testid="twitter-title">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-700 line-clamp-1" data-testid="twitter-description">
              {description}
            </p>
          </div>
          {image ? (
            <div className="w-32 h-32 flex-shrink-0 bg-gray-200 dark:bg-gray-300 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                data-testid="twitter-image"
              />
            </div>
          ) : (
            <div className="w-32 h-32 flex-shrink-0 bg-gray-200 dark:bg-gray-300 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
