import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrlInputFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function UrlInputForm({ onAnalyze, isLoading }: UrlInputFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 min-h-14 text-base"
            disabled={isLoading}
            data-testid="input-url"
            required
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !url.trim()}
          className="min-h-14 px-8"
          data-testid="button-analyze"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            "Analyze SEO"
          )}
        </Button>
      </div>
    </form>
  );
}
