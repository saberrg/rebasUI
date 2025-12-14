import './CTAButton.css'

export interface CTAButtonProps {
  label: string
  onClick?: () => void
  href?: string
  LinkComponent?: React.ComponentType<any>
  onNavigate?: (href: string) => void
}

export default function CTAButton({
  label,
  onClick,
  href,
  LinkComponent,
  onNavigate
}: CTAButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (href && onNavigate && !LinkComponent) {
      e.preventDefault()
      onNavigate(href)
    }
    onClick?.()
  }

  if (href && LinkComponent) {
    return (
      <LinkComponent
        href={href}
        className="header__cta"
        onClick={onClick}
      >
        {label}
      </LinkComponent>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="header__cta"
      >
        {label}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="header__cta"
    >
      {label}
    </button>
  )
}
