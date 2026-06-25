import { Link, useLocation } from 'react-router'

export function Navigation() {
  const pathname = useLocation().pathname

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        to="/"
        className={`px-3 py-2 rounded-lg transition-colors font-medium ${pathname === '/'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
      >
        Dashboard
      </Link>
      <Link
        to="/search-files"
        className={`px-3 py-2 rounded-lg transition-colors font-medium ${isActive('/search-files')
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
      >
        Files
      </Link>
    </nav>
  )
}
