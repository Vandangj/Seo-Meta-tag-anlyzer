import { SeoMetaTags } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MetaTagsDisplayProps {
  tags: SeoMetaTags;
}

interface TagRowProps {
  label: string;
  value: string | undefined;
  maxLength?: number;
}

function TagRow({ label, value, maxLength }: TagRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCharacterStatus = (length: number, max: number) => {
    if (length > max) return "error";
    if (length > max * 0.9) return "warning";
    return "success";
  };

  const characterCount = value?.length || 0;
  const status = maxLength ? getCharacterStatus(characterCount, maxLength) : null;

  return (
    <div
      className="group py-3 px-4 hover-elevate rounded-md flex items-start justify-between gap-4"
      data-testid={`tag-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          {maxLength && value && (
            <span
              className={`text-xs font-mono ${
                status === "error"
                  ? "text-error"
                  : status === "warning"
                  ? "text-warning"
                  : "text-success"
              }`}
            >
              {characterCount}/{maxLength}
            </span>
          )}
        </div>
        {value ? (
          <>
            <p className="text-base font-mono break-words" data-testid={`value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
            {maxLength && (
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    status === "error"
                      ? "bg-error"
                      : status === "warning"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                  style={{ width: `${Math.min((characterCount / maxLength) * 100, 100)}%` }}
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground italic">Not set</p>
        )}
      </div>
      {value && (
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover-elevate active-elevate-2 rounded-md"
          data-testid={`copy-${label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}

export function MetaTagsDisplay({ tags }: MetaTagsDisplayProps) {
  const generalTags = [
    { label: "Title", value: tags.title, maxLength: 60 },
    { label: "Description", value: tags.description, maxLength: 160 },
    { label: "Keywords", value: tags.keywords },
    { label: "Canonical URL", value: tags.canonical },
    { label: "Robots", value: tags.robots },
  ];

  const ogTags = [
    { label: "OG Title", value: tags.ogTitle, maxLength: 60 },
    { label: "OG Description", value: tags.ogDescription, maxLength: 160 },
    { label: "OG Image", value: tags.ogImage },
    { label: "OG URL", value: tags.ogUrl },
    { label: "OG Type", value: tags.ogType },
    { label: "OG Site Name", value: tags.ogSiteName },
    { label: "OG Locale", value: tags.ogLocale },
  ];

  const twitterTags = [
    { label: "Twitter Card", value: tags.twitterCard },
    { label: "Twitter Title", value: tags.twitterTitle, maxLength: 60 },
    { label: "Twitter Description", value: tags.twitterDescription, maxLength: 160 },
    { label: "Twitter Image", value: tags.twitterImage },
    { label: "Twitter Site", value: tags.twitterSite },
    { label: "Twitter Creator", value: tags.twitterCreator },
  ];

  const technicalTags = [
    { label: "Charset", value: tags.charset },
    { label: "Viewport", value: tags.viewport },
    { label: "Language", value: tags.language },
    { label: "Theme Color", value: tags.themeColor },
    { label: "Favicon", value: tags.favicon },
  ];

  return (
    <Accordion type="multiple" defaultValue={["general", "og"]} className="w-full" data-testid="meta-tags-accordion">
      <AccordionItem value="general">
        <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-general">
          General Meta Tags
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-1">
            {generalTags.map((tag) => (
              <TagRow key={tag.label} {...tag} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="og">
        <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-opengraph">
          Open Graph Tags
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-1">
            {ogTags.map((tag) => (
              <TagRow key={tag.label} {...tag} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="twitter">
        <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-twitter">
          Twitter Card Tags
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-1">
            {twitterTags.map((tag) => (
              <TagRow key={tag.label} {...tag} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="technical">
        <AccordionTrigger className="text-lg font-semibold" data-testid="accordion-technical">
          Technical Tags
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-1">
            {technicalTags.map((tag) => (
              <TagRow key={tag.label} {...tag} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
