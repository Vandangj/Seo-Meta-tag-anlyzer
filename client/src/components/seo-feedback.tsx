import { SeoIssue } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SeoFeedbackProps {
  issues: SeoIssue[];
  score: number;
}

function IssueIcon({ severity }: { severity: SeoIssue["severity"] }) {
  switch (severity) {
    case "critical":
      return <AlertCircle className="h-5 w-5 text-error" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "info":
      return <Info className="h-5 w-5 text-primary" />;
  }
}

function SeverityBadge({ severity }: { severity: SeoIssue["severity"] }) {
  const variants = {
    critical: "bg-error text-error-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-primary text-primary-foreground",
  };

  const labels = {
    critical: "High Priority",
    warning: "Medium Priority",
    info: "Low Priority",
  };

  return (
    <Badge className={variants[severity]} data-testid={`badge-${severity}`}>
      {labels[severity]}
    </Badge>
  );
}

function ScoreDisplay({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-error";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };

  return (
    <div className="flex items-center justify-between p-6 bg-muted rounded-lg" data-testid="seo-score">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">SEO Score</h3>
        <p className="text-2xl font-bold">{getScoreLabel(score)}</p>
      </div>
      <div className={`text-5xl font-bold ${getScoreColor(score)}`} data-testid="score-value">
        {score}
      </div>
    </div>
  );
}

export function SeoFeedback({ issues, score }: SeoFeedbackProps) {
  const criticalIssues = issues.filter((i) => i.severity === "critical");
  const warningIssues = issues.filter((i) => i.severity === "warning");
  const infoIssues = issues.filter((i) => i.severity === "info");

  const allIssues = [...criticalIssues, ...warningIssues, ...infoIssues];

  return (
    <Card data-testid="seo-feedback-panel">
      <CardHeader>
        <CardTitle className="text-2xl">SEO Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ScoreDisplay score={score} />

        <div>
          <h3 className="text-lg font-semibold mb-4">
            {allIssues.length === 0 ? (
              <span className="flex items-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                All checks passed!
              </span>
            ) : (
              `${allIssues.length} Issue${allIssues.length !== 1 ? "s" : ""} Found`
            )}
          </h3>

          {allIssues.length > 0 && (
            <Accordion type="multiple" className="w-full" defaultValue={criticalIssues.map((_, i) => `issue-${i}`)}>
              {allIssues.map((issue, index) => (
                <AccordionItem key={index} value={`issue-${index}`} data-testid={`issue-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-start gap-3 text-left flex-1">
                      <IssueIcon severity={issue.severity} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium">{issue.title}</span>
                          <SeverityBadge severity={issue.severity} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {issue.category}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-8 space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Issue</h4>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Recommendation</h4>
                        <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
