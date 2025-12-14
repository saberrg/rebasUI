# Rebas UI

A collection of beautiful, accessible React components built with Tailwind CSS. Install components directly into your project with a simple CLI command.

## Installation

Use the CLI to add components to your project:

```bash
npx @rebas/ui add header
```

## Getting Started

### 1. Initialize Configuration (Optional)

Create a `rebas.json` config file to customize component installation:

```bash
npx @rebas/ui init
```

This will prompt you for:
- Components directory (default: `src/components/ui`)
- Tailwind config path (default: `tailwind.config.js`)
- Tailwind CSS file path (default: `src/index.css`)

### 2. Add Components

Add components to your project:

```bash
# Add a single component
npx @rebas/ui add header

# Add multiple components
npx @rebas/ui add header button card
```

### 3. List Available Components

See all available components:

```bash
npx @rebas/ui list
```

## Requirements

- React 18+
- Tailwind CSS 3+
- Node.js 18+

## Components

### Header

A fully responsive navigation header with:
- Mobile menu with hamburger toggle
- Dropdown navigation support
- Dark mode support
- Customizable branding
- CTA button support
- User menu slot
- Framework-agnostic (works with Next.js, Remix, etc.)

**Usage:**

```tsx
import Header from '@/components/ui/header'
import type { NavItem } from '@/components/ui/header'

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Products', 
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Category 1', href: '/products/category1' }
    ]
  },
  { label: 'About', href: '/about' }
]

function App() {
  return (
    <Header
      logo="/logo.svg"
      siteName="My Site"
      navItems={navItems}
      ctaButton={{
        label: 'Get Started',
        href: '/signup'
      }}
      sticky={true}
      currentPath="/"
    />
  )
}
```

## Project Structure

```
rebasUI/
├── src/
│   └── components/        # Component source files
├── registry/
│   └── components.json    # Component manifest
└── packages/
    └── cli/               # CLI tool
```

## Development

### Building the CLI

```bash
npm run build:cli
```

### Publishing

1. Build the CLI:
   ```bash
   cd packages/cli
   npm run build
   ```

2. Publish to npm:
   ```bash
   npm login --scope=@rebas
   npm publish --access public
   ```

## License

MIT
