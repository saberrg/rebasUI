import './UserMenu.css'

export interface UserMenuProps {
  children: React.ReactNode
}

export default function UserMenu({
  children
}: UserMenuProps) {
  return (
    <div className="header__user-menu">
      {children}
    </div>
  )
}
