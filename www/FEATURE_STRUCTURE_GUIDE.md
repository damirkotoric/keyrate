# Feature-Based Structure Guide

This codebase has been reorganized into a feature-based architecture to optimize for Cursor AI usage and reduce credit costs.

## New Structure Overview

```
www/
├── features/                    # Feature-based organization
│   ├── marketing/              # Marketing website features
│   │   ├── components/
│   │   │   ├── home/          # Home page components
│   │   │   ├── sections/      # Reusable sections (Instagram, Globe, GetInTouch)
│   │   │   └── layout/        # Layout components (Header, Footer, Breadcrumbs)
│   │   └── lib/               # Marketing utilities
│   │
│   ├── blog/                   # Blog feature
│   │   ├── components/        # Blog-specific components
│   │   └── lib/               # Blog queries and utilities
│   │
│   ├── guides/                 # Guides & Downloads feature
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── solutions/              # Solutions feature
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── faq/                    # FAQ feature
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── mortgage-glossary/      # Mortgage Glossary feature
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── testimonials/           # Testimonials feature
│   │   ├── components/
│   │   └── lib/
│   │
│   ├── forms/                  # Shared forms
│   │   └── components/
│   │
│   └── portal/                 # Broker Portal feature
│       ├── components/
│       │   ├── layout/        # Portal layout
│       │   ├── sheets/        # Data entry sheets
│       │   └── dashboard/     # Dashboard components
│       └── lib/               # Portal utilities
│
├── components/                 # Truly shared components only
│   ├── ui/                    # shadcn/ui components
│   └── icons.ts               # Shared icon exports
│
└── lib/                       # Core utilities only
    ├── supabase/
    ├── sanity.ts
    ├── locale.ts
    ├── analytics.ts
    └── utils.ts
```

## Path Aliases

The following TypeScript path aliases are configured:

- `@/*` - Root www directory (existing)
- `@features/*` - Features directory (new)
- `@components/*` - Components directory (new)
- `@lib/*` - Lib directory (new)

## Usage Examples with Cursor

### Working on Portal Features

When working on the broker portal, scope your Cursor context:

```
@features/portal
```

This will limit context to only portal-related code, reducing credit usage.

### Working on Blog Features

```
@features/blog
```

Only blog components and queries will be in context.

### Working on Marketing Pages

```
@features/marketing
```

Only marketing components (home, sections, layout) will be included.

### Working on UI Components

```
@components/ui
```

Only shadcn/ui components will be in scope.

### Multi-Feature Work

If you need to work across features, you can specify multiple scopes:

```
@features/marketing/components/layout
@features/blog
```

## Import Patterns

### Feature Imports

```typescript
// Blog feature
import { getAllBlogPosts } from '@features/blog/lib/queries'
import { BlogPostCard } from '@features/blog/components/blog-post-card'

// Portal feature
import { PortalLayout } from '@features/portal/components/layout/portal-layout'
import { ClientSheet } from '@features/portal/components/sheets/client-sheet'

// Marketing feature
import Header from '@features/marketing/components/layout/header'
import Footer from '@features/marketing/components/layout/footer'
```

### Shared Imports (still use @/)

```typescript
// UI components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Core utilities
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
```

## .cursorignore

A `.cursorignore` file has been created to exclude:
- node_modules/
- .next/
- dist/
- build/
- public/ (static assets)
- Lock files
- Build artifacts

This further reduces context size and credit usage.

## Benefits

1. **Targeted Scoping**: Use `@features/portal` for portal work, `@features/blog` for blog work
2. **Reduced Context**: Each feature is self-contained with components + queries
3. **Better Imports**: Clear path aliases show exactly what you're importing
4. **Cursor Optimization**: .cursorignore excludes build artifacts and dependencies
5. **Maintainability**: Co-located code makes features easier to understand and modify
6. **Lower Costs**: Smaller context windows = fewer tokens = lower Cursor credits

## Migration Notes

All imports have been updated to use the new structure. Key changes:

- Marketing components moved to `features/marketing/`
- Blog components + queries moved to `features/blog/`
- Portal components reorganized in `features/portal/`
- Feature-specific queries co-located with features
- Shared utilities remain in `lib/`

## Quick Reference

| Feature | Scope Command | Use When |
|---------|--------------|----------|
| Portal | `@features/portal` | Working on broker dashboard, applications, clients |
| Blog | `@features/blog` | Blog posts, blog page |
| Guides | `@features/guides` | Guide downloads, guide pages |
| Marketing | `@features/marketing` | Homepage, header, footer, sections |
| Forms | `@features/forms` | Pre-approval forms, contact forms |
| FAQ | `@features/faq` | FAQ pages and accordions |
| Solutions | `@features/solutions` | Solutions pages and cards |
| UI | `@components/ui` | shadcn/ui component customization |

