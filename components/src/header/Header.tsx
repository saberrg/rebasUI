import { useState, useEffect, useRef } from 'react'
import './Header.css'
import Brand from './brand/Brand'
import NavList from './nav-list/NavList'
import type { NavItem } from './nav-list/NavList'
import MobileMenu from './mobile-menu/MobileMenu'
import CTAButton from './cta-button/CTAButton'
import UserMenu from './user-menu/UserMenu'

export type { NavItem }

export interface HeaderProps {
  // Brand identity
  logo?: string | React.ReactNode
  siteName?: string
  logoHref?: string

  // Navigation
  navItems?: NavItem[]
  
  // User actions
  ctaButton?: {
    label: string
    onClick?: () => void
    href?: string
  }
  userMenu?: React.ReactNode

  // Behavior
  sticky?: boolean
  fixed?: boolean
  currentPath?: string
  
  // Customization
  className?: string
  theme?: 'light' | 'dark'
  
  // Framework compatibility
  LinkComponent?: React.ComponentType<any>
  onNavigate?: (href: string) => void
}

export default function Header({
  logo,
  siteName = 'Your Site',
  logoHref = '/',
  navItems = [],
  ctaButton,
  userMenu,
  sticky = true,
  fixed = false,
  currentPath,
  className = '',
  theme = 'light',
  LinkComponent,
  onNavigate
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdowns and mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Toggle dropdown
  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  // Check if nav item is active
  const isActive = (href: string) => {
    if (!currentPath) return false
    if (href === '/') return currentPath === '/'
    return currentPath === href || currentPath.startsWith(href + '/')
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  const headerClasses = [
    'header',
    className,
    sticky && 'header--sticky',
    fixed && 'header--fixed',
    theme === 'dark' && 'header--dark',
    isMobileMenuOpen && 'header--mobile-open'
  ].filter(Boolean).join(' ')

  return (
    <header 
      ref={headerRef}
      className={headerClasses}
      role="banner"
    >
      <div className="header__container">
        {/* Brand/Logo */}
        <Brand 
          logo={logo}
          siteName={siteName}
          logoHref={logoHref}
          LinkComponent={LinkComponent}
          onNavigate={onNavigate}
        />

        {/* Desktop Navigation */}
        <NavList
          navItems={navItems}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
          isActive={isActive}
          handleKeyDown={handleKeyDown}
          LinkComponent={LinkComponent}
          onNavigate={onNavigate}
        />

        {/* Right side actions */}
        <div className="header__actions">
          
          {/* User Menu */}
          {userMenu && (
            <UserMenu>
              {userMenu}
            </UserMenu>
          )}

          {/* CTA Button */}
          {ctaButton && (
            <CTAButton
              label={ctaButton.label}
              onClick={ctaButton.onClick}
              href={ctaButton.href}
              LinkComponent={LinkComponent}
              onNavigate={onNavigate}
            />
          )}

          {/* Mobile Menu (Toggle + Navigation Panel) */}
          <MobileMenu
            navItems={navItems}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            isActive={isActive}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            ctaButton={ctaButton}
            LinkComponent={LinkComponent}
            onNavigate={onNavigate}
          />
        </div>
      </div>

    </header>
  )
}
