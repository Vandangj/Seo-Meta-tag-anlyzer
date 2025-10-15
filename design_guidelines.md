# SEO Meta Tags Analyzer - Design Guidelines

## Design Approach: Modern Utility Dashboard
**Selected System:** Material Design principles with custom preview components  
**Justification:** Information-dense application requiring clear data visualization, organized content sections, and standard UI patterns for form inputs and status indicators.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 222 15% 8% (deep charcoal)
- Surface: 222 15% 12% (elevated panels)
- Border: 222 10% 20% (subtle separators)
- Primary: 217 91% 60% (professional blue for actions)
- Success: 142 71% 45% (SEO optimization passed)
- Warning: 38 92% 50% (needs improvement)
- Error: 0 84% 60% (critical issues)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 217 91% 50%
- Borders and status colors adjust for light background

### B. Typography

**Font Stack:**
- Primary: 'Inter' from Google Fonts (UI, body text)
- Monospace: 'JetBrains Mono' (meta tag values, code)

**Scale:**
- Page Title: 2.5rem, font-bold (xl:3rem)
- Section Headers: 1.5rem, font-semibold
- Preview Titles: 1.125rem, font-medium
- Body Text: 1rem, font-normal
- Meta Tag Labels: 0.875rem, font-medium, uppercase tracking-wide
- Tag Values: 0.9375rem, font-mono

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 3, 4, 6, 8, 12, and 16
- Standard padding: p-6 for cards, p-8 for main sections
- Consistent gaps: gap-6 for grid layouts, gap-4 for form elements
- Section spacing: mb-8 between major sections

**Container Structure:**
- Max width: max-w-7xl mx-auto
- Page padding: px-4 sm:px-6 lg:px-8
- Grid: 12-column responsive system

### D. Component Library

**Input Section:**
- Full-width search bar with icon (search/link icon left, submit button right)
- Rounded corners (rounded-lg)
- Focus states with ring-2 ring-primary/50
- Large touch target (min-h-14)

**Preview Cards (Google/Facebook/Twitter):**
- White/light surface in dark mode with subtle shadow
- Each preview in its own bordered container (rounded-xl, border-2)
- Authentic recreation of platform appearance
- Google: White background, blue clickable title, green URL, gray description
- Facebook: Image top (16:9), white card, title in dark, description gray
- Twitter: Border, small image right OR large image top based on card type

**Meta Tags Display:**
- Organized accordion sections (General, Open Graph, Twitter, Technical)
- Each tag: label (muted text) + value (prominent, monospace)
- Color-coded status dots (green/yellow/red) next to each tag category
- Character count indicators for title/description with visual progress bars

**Feedback Panel:**
- Sticky sidebar or bottom panel showing real-time analysis
- Status badges with icons (checkmark, warning triangle, X)
- Expandable recommendation cards with "Why it matters" context
- Priority indicators (High/Medium/Low severity)

**Status Indicators:**
- Circle badges with icons for quick scanning
- Green checkmark: Optimized correctly
- Yellow warning: Needs attention (length issues, missing optional tags)
- Red X: Critical missing tags (title, description)

### E. Layout Composition

**Page Structure:**
1. **Header Section:** Logo/title left, theme toggle right, minimal height
2. **URL Input:** Full-width centered, prominent with example placeholder
3. **Main Analysis Area (2-column on desktop):**
   - Left: Live previews stacked (Google → Facebook → Twitter)
   - Right: Meta tags accordion + SEO feedback panel
4. **Mobile:** Single column, previews first, then tags/feedback

**Visual Hierarchy:**
- URL input: Most prominent, centered, bright primary color
- Preview cards: Authentic platform styling, slightly elevated
- Meta tags: Organized, scannable, monospace values
- Feedback: Color-coded, actionable, grouped by severity

## Images
No hero image. This is a utility-focused application where immediate access to the URL input is paramount.

## Interaction Patterns
- Instant visual feedback as URL is entered
- Smooth transitions between empty/loading/results states
- Expandable/collapsible tag sections to reduce cognitive load
- Hover states on meta tag rows to show "copy to clipboard" action
- Loading skeleton screens for preview cards during fetch

## Information Architecture
**Progressive Disclosure:** Start with critical SEO tags visible, advanced/technical tags in expandable sections. Previews show immediately while detailed analysis loads below.