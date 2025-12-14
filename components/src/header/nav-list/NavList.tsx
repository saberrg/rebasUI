import './NavList.css'
import NavItem from '../nav-item/NavItem'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface NavListProps {
  navItems: NavItem[]
  activeDropdown: number | null
  toggleDropdown: (index: number) => void
  isActive: (href: string) => boolean
  handleKeyDown: (e: React.KeyboardEvent, action: () => void) => void
  LinkComponent?: React.ComponentType<any>
  onNavigate?: (href: string) => void
}

export default function NavList({
  navItems,
  activeDropdown,
  toggleDropdown,
  isActive,
  handleKeyDown,
  LinkComponent,
  onNavigate
}: NavListProps) {
  return (
    <nav className="header__nav" aria-label="Main navigation">
      <ul className="header__nav-list">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            index={index}
            variant="desktop"
            isActive={isActive}
            activeDropdown={activeDropdown}
            toggleDropdown={toggleDropdown}
            handleKeyDown={handleKeyDown}
            LinkComponent={LinkComponent}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  )
}
