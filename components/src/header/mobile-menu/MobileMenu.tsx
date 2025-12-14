import './MobileMenu.css'
import MobileNavigation from '../mobile-navigation/MobileNavigation'
import type { NavItem } from '../nav-list/NavList'

export interface MobileMenuProps {
  navItems: NavItem[]
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

export default function MobileMenu({
  navItems,
  activeDropdown,
  toggleDropdown,
  isActive,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  ctaButton,
  LinkComponent,
  onNavigate
}: MobileMenuProps) {
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className="header__mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
      >
        <span className="header__mobile-toggle-icon"></span>
        <span className="header__mobile-toggle-icon"></span>
        <span className="header__mobile-toggle-icon"></span>
      </button>

      {/* Mobile Navigation Panel */}
      <MobileNavigation
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
    </>
  )
}
