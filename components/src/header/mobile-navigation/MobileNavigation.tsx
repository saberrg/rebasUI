import './MobileNavigation.css'
import NavItem from '../nav-item/NavItem'
import CTAButton from '../cta-button/CTAButton'
import type { NavItem as NavItemType } from '../nav-list/NavList'

export interface MobileNavigationProps {
  navItems: NavItemType[]
  activeDropdown: number | null
  toggleDropdown: (index: number) => void
  isActive: (href: string) => boolean
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  ctaButton?: {
    label: string
    onClick?: () => void
    href?: string
  }
  LinkComponent?: React.ComponentType<any>
  onNavigate?: (href: string) => void
}

export default function MobileNavigation({
  navItems,
  activeDropdown,
  toggleDropdown,
  isActive,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  ctaButton,
  LinkComponent,
  onNavigate
}: MobileNavigationProps) {
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleCTAClick = () => {
    ctaButton?.onClick?.()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav 
      className={`header__mobile-nav ${isMobileMenuOpen ? 'header__mobile-nav--open' : ''}`}
      aria-label="Mobile navigation"
    >
      <ul className="header__mobile-nav-list">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            index={index}
            variant="mobile"
            isActive={isActive}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            onLinkClick={handleLinkClick}
            LinkComponent={LinkComponent}
            onNavigate={onNavigate}
          />
        ))}
        {ctaButton && (
          <li className="header__mobile-nav-item header__mobile-nav-item--cta">
            <CTAButton
              label={ctaButton.label}
              href={ctaButton.href}
              onClick={handleCTAClick}
              LinkComponent={LinkComponent}
              onNavigate={onNavigate}
            />
          </li>
        )}
      </ul>
    </nav>
  )
}
