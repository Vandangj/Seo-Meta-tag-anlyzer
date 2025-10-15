import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GooglePreviewSkeleton() {
  return (
    <Card className="p-6 bg-background dark:bg-white">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
}

export function FacebookPreviewSkeleton() {
  return (
    <Card className="overflow-hidden bg-background dark:bg-white">
      <Skeleton className="w-full aspect-[1.91/1]" />
      <div className="p-3 border-t border-gray-200 dark:border-gray-300 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
}

export function TwitterPreviewSkeleton() {
  return (
    <Card className="overflow-hidden border-2 bg-background dark:bg-white dark:border-gray-300">
      <Skeleton className="w-full aspect-[2/1]" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
}
