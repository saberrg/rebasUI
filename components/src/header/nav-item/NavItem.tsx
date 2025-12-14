import './NavItem.css'
import type { NavItem as NavItemType } from '../nav-list/NavList'

export interface NavItemProps {
  item: NavItemType
  index: number
  variant: 'desktop' | 'mobile'
  isActive: (href: string) => boolean
  activeDropdown: number | null
  toggleDropdown: (index: number) => void
  handleKeyDown?: (e: React.KeyboardEvent, action: () => void) => void
  onLinkClick?: () => void
  LinkComponent?: React.ComponentType<any>
  onNavigate?: (href: string) => void
}

export default function NavItem({
  item,
  index,
  variant,
  isActive,
  activeDropdown,
  toggleDropdown,
  handleKeyDown,
  onLinkClick,
  LinkComponent,
  onNavigate
}: NavItemProps) {
  const isMobile = variant === 'mobile'
  const prefix = isMobile ? 'header__mobile' : 'header'
  
  const itemClass = isMobile 
    ? 'header__mobile-nav-item' 
    : `header__nav-item ${item.children ? 'header__nav-item--has-dropdown' : ''} ${isActive(item.href) ? 'header__nav-item--active' : ''}`
  
  const linkClass = isMobile
    ? `header__mobile-nav-link ${isActive(item.href) ? 'header__mobile-nav-link--active' : ''}`
    : `header__nav-link ${isActive(item.href) ? 'header__nav-link--active' : ''}`
  
  const dropdownClass = isMobile
    ? `header__mobile-dropdown ${activeDropdown === index ? 'header__mobile-dropdown--open' : ''}`
    : `header__dropdown ${activeDropdown === index ? 'header__dropdown--open' : ''}`
  
  const dropdownLinkClass = isMobile
    ? `header__mobile-dropdown-link`
    : `header__dropdown-link`
  
  const dropdownArrowClass = isMobile
    ? 'header__mobile-dropdown-arrow'
    : 'header__dropdown-arrow'

  if (item.children) {
    const isDropdownOpen = activeDropdown === index
    const buttonClass = `${linkClass} ${isDropdownOpen ? 'header__nav-link--dropdown-open' : ''}`
    
    return (
      <li className={itemClass}>
        <button
          className={buttonClass}
          onClick={() => toggleDropdown(index)}
          onKeyDown={handleKeyDown ? (e) => handleKeyDown(e, () => toggleDropdown(index)) : undefined}
          aria-expanded={!isMobile ? isDropdownOpen : undefined}
          aria-haspopup={!isMobile ? "true" : undefined}
        >
          {item.label}
          <span className={dropdownArrowClass} aria-hidden="true">▼</span>
        </button>
        <ul 
          className={dropdownClass}
          role={!isMobile ? "menu" : undefined}
        >
          {item.children.map((child, childIndex) => {
            const handleChildClick = (e: React.MouseEvent) => {
              if (onNavigate && !LinkComponent) {
                e.preventDefault()
                onNavigate(child.href)
              }
              onLinkClick?.()
            }

            const childLinkProps = {
              href: child.href,
              className: `${dropdownLinkClass} ${isActive(child.href) ? `${dropdownLinkClass}--active` : ''}`,
              role: !isMobile ? "menuitem" : undefined,
              onClick: handleChildClick
            }

            return (
              <li key={childIndex} role={!isMobile ? "none" : undefined}>
                {LinkComponent ? (
                  <LinkComponent {...childLinkProps}>
                    {child.label}
                  </LinkComponent>
                ) : (
                  <a {...childLinkProps}>
                    {child.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </li>
    )
  }

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate && !LinkComponent) {
      e.preventDefault()
      onNavigate(item.href)
    }
    onLinkClick?.()
  }

  const linkProps = {
    href: item.href,
    className: linkClass,
    onClick: handleClick
  }

  return (
    <li className={itemClass}>
      {LinkComponent ? (
        <LinkComponent {...linkProps}>
          {item.label}
        </LinkComponent>
      ) : (
        <a {...linkProps}>
          {item.label}
        </a>
      )}
    </li>
  )
}
