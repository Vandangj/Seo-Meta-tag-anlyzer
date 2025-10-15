import { SeoMetaTags } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

interface FacebookPreviewProps {
  tags: SeoMetaTags;
  url: string;
}

export function FacebookPreview({ tags, url }: FacebookPreviewProps) {
  const title = tags?.ogTitle || tags?.title || "No title";
  const description = tags?.ogDescription || tags?.description || "No description";
  const image = tags?.ogImage;
  const siteName = tags?.ogSiteName || new URL(url).hostname;

  return (
    <Card className="overflow-hidden bg-background dark:bg-white" data-testid="preview-facebook">
      {image ? (
        <div className="relative w-full aspect-[1.91/1] bg-gray-200 dark:bg-gray-300">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            data-testid="facebook-image"
          />
        </div>
      ) : (
        <div className="relative w-full aspect-[1.91/1] bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      <div className="p-3 border-t border-gray-200 dark:border-gray-300">
        <p className="text-xs text-gray-500 dark:text-gray-600 uppercase mb-1" data-testid="facebook-site">
          {siteName}
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-900 line-clamp-2 mb-1" data-testid="facebook-title">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-700 line-clamp-2" data-testid="facebook-description">
          {description}
        </p>
      </div>
    </Card>
  );
}
