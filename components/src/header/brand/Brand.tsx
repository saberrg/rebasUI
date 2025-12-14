import './Brand.css'

export interface BrandProps {
  logo?: string | React.ReactNode
  siteName?: string
  logoHref?: string
  LinkComponent?: React.ComponentType<any>
  onNavigate?: (href: string) => void
}

export default function Brand({
  logo,
  siteName = 'Your Site',
  logoHref = '/',
  LinkComponent,
  onNavigate
}: BrandProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate && !LinkComponent) {
      e.preventDefault()
      onNavigate(logoHref)
    }
  }

  const linkProps = {
    href: logoHref,
    className: "header__logo-link",
    'aria-label': `${siteName} - Home`,
    onClick: handleClick
  }

  const content = (
    <>
      {typeof logo === 'string' ? (
        <img 
          src={logo} 
          alt={siteName} 
          className="header__logo"
        />
      ) : (
        <div className="header__logo-custom">{logo}</div>
      )}
      {siteName && (
        <span className="header__site-name">{siteName}</span>
      )}
    </>
  )

  return (
    <div className="header__brand">
      {LinkComponent ? (
        <LinkComponent {...linkProps}>
          {content}
        </LinkComponent>
      ) : (
        <a {...linkProps}>
          {content}
        </a>
      )}
    </div>
  )
}
