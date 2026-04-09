import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

const roleLabels = {
  driver: 'Driver',
  owner: 'Owner',
  platform: 'Platform',
  super_admin: 'Super Admin',
}

const roleNavigation = {
  driver: [
    { label: 'Home', to: '/home' },
    { label: 'Trip Activity', to: '/home?section=trips' },
    { label: 'Documents', to: '/home?section=documents' },
  ],
  owner: [
    { label: 'Home', to: '/home' },
    { label: 'Fleet', to: '/home?section=fleet' },
    { label: 'Payouts', to: '/home?section=payouts' },
  ],
  platform: [
    { label: 'Home', to: '/home' },
    { label: 'Partners', to: '/home?section=partners' },
    { label: 'Moderation', to: '/home?section=moderation' },
  ],
  super_admin: [
    { label: 'Home', to: '/home' },
    { label: 'User Governance', to: '/home?section=governance' },
    { label: 'System Audit', to: '/home?section=audit' },
    { label: 'Platform Settings', to: '/home?section=settings' },
  ],
}

function readAuthUser() {
  try {
    const raw = localStorage.getItem('trustdrive-auth-user')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function iconPathFor(label) {
  if (/home/i.test(label)) return 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10'
  if (/trip|activity|audit/i.test(label)) return 'M9 17v-6m3 6V7m3 10v-3m5 8H4a1 1 0 01-1-1V4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1z'
  if (/fleet|partner|governance|settings/i.test(label)) return 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.065 2.573c.94 1.543-.827 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31-.827-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.572c-.94-1.544.826-3.31 2.37-2.37.996.607 2.296.07 2.572-1.066zM12 15a3 3 0 100-6 3 3 0 000 6z'
  if (/document|payout|moderation/i.test(label)) return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  return 'M12 6v6l4 2'
}

function parseTo(to) {
  const [pathname, query = ''] = to.split('?')
  return {
    pathname,
    search: query ? `?${query}` : '',
  }
}

function isLinkActive(to, location) {
  const target = parseTo(to)
  if (location.pathname !== target.pathname) return false

  if (!target.search) {
    return location.search === ''
  }

  return location.search === target.search
}

export default function AppLayout() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [role, setRole] = useState(localStorage.getItem('trustdrive-user-role') || '')
  const [authUser, setAuthUser] = useState(readAuthUser())

  useEffect(() => {
    const syncSession = () => {
      setRole(localStorage.getItem('trustdrive-user-role') || '')
      setAuthUser(readAuthUser())
    }

    window.addEventListener('storage', syncSession)
    syncSession()

    return () => window.removeEventListener('storage', syncSession)
  }, [])

  const navItems = useMemo(() => {
    if (Array.isArray(authUser?.links) && authUser.links.length > 0) {
      return authUser.links
    }
    return roleNavigation[role] || [{ label: 'Home', to: '/home' }]
  }, [authUser, role])

  const activeItemLabel = useMemo(() => {
    const current = navItems.find((item) => isLinkActive(item.to, location))
    return current?.label || 'Workspace'
  }, [location, navItems])

  const today = useMemo(
    () => new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(new Date()),
    []
  )

  if (!role || !roleLabels[role]) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen lg:flex" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 transform border-r transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          borderColor: 'var(--color-bg-border)',
          backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.96)' : 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <Link to="/home" className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{ backgroundColor: 'var(--color-primary-main)' }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>DriveTrust</p>
                <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-secondary)' }}>
                  {roleLabels[role]} workspace
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl border p-2.5 lg:hidden"
              style={{ borderColor: 'var(--color-bg-border)', color: 'var(--color-text-primary)' }}
              aria-label="Close sidebar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            className="mt-6 rounded-2xl border p-4"
            style={{
              borderColor: 'var(--color-bg-border)',
              background: theme === 'dark'
                ? 'linear-gradient(160deg, rgba(59, 130, 246, 0.18), rgba(17, 24, 39, 0.96))'
                : 'linear-gradient(160deg, rgba(37, 99, 235, 0.12), rgba(255, 255, 255, 0.96))',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: 'var(--color-primary-main)' }}
              >
                {(authUser?.name || roleLabels[role]).slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {authUser?.name || roleLabels[role]}
                </p>
                <p className="truncate text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {authUser?.email || 'Role-based session'}
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-secondary)' }}>
              Restricted Scope
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Access is locked to your assigned role links only.
             </p>
           </div>

          <div className="mt-8 flex-1">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-secondary)' }}>
              Navigation
            </p>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = isLinkActive(item.to, location)

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition"
                    style={{
                      borderColor: active ? 'var(--color-primary-main)' : 'var(--color-bg-border)',
                      color: active ? 'var(--color-primary-main)' : 'var(--color-text-secondary)',
                      backgroundColor: active ? 'rgba(37, 99, 235, 0.12)' : 'var(--color-bg-card)',
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: active ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.12)',
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPathFor(item.label)} />
                      </svg>
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {active && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-primary-main)' }} />}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border px-3 py-2 text-xs font-semibold"
              style={{
                borderColor: 'var(--color-bg-border)',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg-card)',
              }}
            >
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('trustdrive-user-role')
                localStorage.removeItem('trustdrive-auth-user')
                window.location.href = '/login'
              }}
              className="rounded-xl border px-3 py-2 text-xs font-semibold"
              style={{
                borderColor: 'var(--color-bg-border)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-card)',
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header
          className="sticky top-0 z-30 border-b"
          style={{
            borderColor: 'var(--color-bg-border)',
            backgroundColor: theme === 'dark' ? 'rgba(11, 18, 32, 0.82)' : 'rgba(249, 250, 251, 0.9)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl border p-2.5 lg:hidden"
                style={{ borderColor: 'var(--color-bg-border)', color: 'var(--color-text-primary)' }}
                aria-label="Open sidebar"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{activeItemLabel}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {roleLabels[role]} workspace • {today}
                </p>
              </div>
            </div>

            <div className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: 'var(--color-bg-border)', color: 'var(--color-text-secondary)' }}>
              Secure session
            </div>
          </div>
        </header>

        <main key={`${role}-${location.pathname}${location.search}`}>
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  )
}
