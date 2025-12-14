import reactLogo from './assets/react.svg'
import Header from './header'
import type { NavItem } from './header'
import './App.css'

function App() {
  // Example navigation items
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { 
      label: 'Products', 
      href: '/products',
      children: [
        { label: 'All Products', href: '/products' },
        { label: 'Category 1', href: '/products/category1' },
        { label: 'Category 2', href: '/products/category2' }
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <>
      <Header
        logo={reactLogo}
        siteName="My Website"
        navItems={navItems}
        ctaButton={{
          label: 'Get Started',
          href: '/signup'
        }}
        sticky={true}
        currentPath="/"
      />
      <main style={{ padding: '2rem', minHeight: '100vh' }}>
        <h1>Hello World</h1>
        <p>This is your main content area. The header is sticky and will stay at the top when scrolling.</p>
      </main>
    </>
  )
}

export default App
