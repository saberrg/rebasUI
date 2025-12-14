export interface UserMenuProps {
  children: React.ReactNode
}

export default function UserMenu({
  children
}: UserMenuProps) {
  return (
    <div className="flex items-center">
      {children}
    </div>
  )
}
