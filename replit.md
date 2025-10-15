# SEO Meta Tags Analyzer

## Overview

This is a web application that analyzes and displays SEO meta tags from any website URL. Users can input a URL and receive instant feedback on their meta tags with visual previews of how the page will appear on Google, Facebook, and Twitter. The application provides detailed SEO scoring, issue detection, and recommendations for optimization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript using Vite as the build tool and development server
- Client-side routing implemented with Wouter (lightweight React router)
- No server-side rendering - pure client-side SPA architecture

**UI Component System**
- Shadcn UI component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for styling with custom CSS variables for theming
- Material Design principles adapted for a modern utility dashboard aesthetic
- Comprehensive design system with dark mode as the primary theme

**State Management**
- TanStack Query (React Query) for server state management and API data fetching
- Local React state for UI interactions
- Custom theme provider for dark/light mode switching with localStorage persistence

**Key UI Features**
- Visual preview components for Google, Facebook, and Twitter card rendering
- Real-time SEO analysis feedback with severity-based issue categorization
- Copy-to-clipboard functionality for meta tag values
- Responsive design with mobile-first approach
- Skeleton loading states for all preview components

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Node.js with ESM module system (type: "module")
- TypeScript throughout the entire stack

**API Design**
- RESTful API with a single primary endpoint: `POST /api/analyze`
- Request validation using Zod schemas for runtime type safety
- Stateless request/response pattern - no session management required

**Web Scraping Pipeline**
- Axios HTTP client for fetching external website HTML
- Cheerio for HTML parsing and meta tag extraction
- Custom user agent to identify the analyzer bot
- Timeout and redirect handling for robust fetching

**Data Extraction Logic**
- Comprehensive meta tag extraction including:
  - Standard meta tags (title, description, keywords, canonical)
  - Open Graph protocol tags for social sharing
  - Twitter Card meta tags
  - Technical tags (robots, viewport, charset, favicon)
- SEO analysis algorithm that scores pages and identifies issues by severity (critical/warning/info)

**Development Environment**
- Vite middleware integration for HMR in development
- Separate development and production build processes
- Custom error overlay and development banners for Replit environment

### External Dependencies

**Core Libraries**
- **React 18**: UI framework
- **Express**: Web server framework
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across the stack

**Web Scraping**
- **Axios**: HTTP client for fetching websites
- **Cheerio**: Fast HTML parsing and DOM manipulation

**UI Component Libraries**
- **Radix UI**: Headless accessible component primitives (accordion, dialog, dropdown, popover, tabs, toast, tooltip, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **Lucide React**: Icon library

**State & Data Management**
- **TanStack Query**: Server state management
- **Wouter**: Client-side routing
- **Zod**: Schema validation for API requests/responses

**Database & ORM**
- **Drizzle ORM**: Configured for PostgreSQL but not actively used
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- Database schema defined but storage is currently stateless (analysis performed on-demand without persistence)

**Development Tools**
- **esbuild**: Production server bundling
- **tsx**: TypeScript execution for development
- **PostCSS & Autoprefixer**: CSS processing

**Third-Party Services**
- None - the application operates independently without external API dependencies
- Web scraping is performed directly without proxy services