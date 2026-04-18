// GuestLayout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'

export default function GuestLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Features', path: '/features' },
    { name: 'Reviews', path: '/reviews' },
  ]

  const authRoutes = [
    '/login',
    '/register',
    '/register/driver',
    '/register/owner',
    '/register/platform',
    '/reset-password',
    '/set-new-password',
  ]

  const isAuthRoute = authRoutes.includes(location.pathname)

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: isAuthRoute ? 'var(--color-bg-main)' : (theme === 'dark' ? 'var(--color-bg-main)' : 'linear-gradient(135deg, #F9FAFB 0%, white 50%, #F0F5FF 100%)'),
      }}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md shadow-lg' : ''
        }`}
        style={{
          backgroundColor: scrolled ? `var(--color-bg-card)` : 'transparent',
          borderColor: scrolled ? `var(--color-bg-border)` : 'transparent',
          borderBottomWidth: scrolled ? '1px' : '0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative w-9 h-9 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  <span>Drive</span>
                  <span className="bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">Trust</span>
                </span>
                <span className="text-[10px] tracking-wide -mt-1" style={{ color: 'var(--color-text-secondary)' }}>Reputation Intelligence</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    color: location.pathname === link.path ? 'var(--color-primary-main)' : 'var(--color-text-secondary)',
                    backgroundColor: location.pathname === link.path ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)') : 'transparent',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="font-medium transition px-4 py-2 rounded-full"
                style={{
                  color: 'var(--color-text-secondary)',
                }}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className={`text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  isAuthRoute
                    ? 'hover:opacity-90'
                    : 'bg-gradient-to-r from-[#4F46E5] to-[#3730A3] hover:shadow-lg hover:shadow-blue-500/25'
                }`}
                style={isAuthRoute ? { backgroundColor: 'var(--color-primary-main)' } : {}}
              >
                Sign Up Free
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition"
                style={{
                  color: 'var(--color-text-secondary)',
                  backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                }}
                aria-label="Toggle dark mode"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.64 15.95c-.18-.81-.46-1.58-.84-2.29.62-.68 1.06-1.56 1.06-2.54a3.5 3.5 0 10-3.5 3.5c.98 0 1.86-.44 2.54-1.06.71.38 1.48.66 2.29.84.52-.73.82-1.59.82-2.51A4.5 4.5 0 0012 2a4.5 4.5 0 100 9c.92 0 1.78.3 2.51.82M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden py-4 animate-fadeIn"
              style={{
                borderTopWidth: '1px',
                borderColor: 'var(--color-bg-border)',
              }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition"
                    style={{
                      color: location.pathname === link.path ? 'var(--color-primary-main)' : 'var(--color-text-secondary)',
                      backgroundColor: location.pathname === link.path ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)') : 'transparent',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                <div
                  className="h-px my-2"
                  style={{ backgroundColor: 'var(--color-bg-border)' }}
                ></div>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mx-4 my-2 text-white text-center py-3 rounded-xl font-semibold ${
                    isAuthRoute ? '' : 'bg-gradient-to-r from-[#4F46E5] to-[#3730A3]'
                  }`}
                  style={isAuthRoute ? { backgroundColor: 'var(--color-primary-main)' } : {}}
                >
                  Sign Up Free
                </Link>
                <button
                  onClick={() => {
                    toggleTheme()
                    setMobileMenuOpen(false)
                  }}
                  className="mx-4 my-2 px-4 py-3 rounded-xl font-medium transition flex items-center justify-between"
                  style={{
                    color: 'var(--color-text-secondary)',
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                  }}
                >
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  {theme === 'light' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.64 15.95c-.18-.81-.46-1.58-.84-2.29.62-.68 1.06-1.56 1.06-2.54a3.5 3.5 0 10-3.5 3.5c.98 0 1.86-.44 2.54-1.06.71.38 1.48.66 2.29.84.52-.73.82-1.59.82-2.51A4.5 4.5 0 0012 2a4.5 4.5 0 100 9c.92 0 1.78.3 2.51.82M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content - add padding-top for fixed nav */}
      <main className="flex-grow pt-16 lg:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: theme === 'dark' ? 'var(--color-bg-main)' : '#0F172A',
          color: theme === 'dark' ? 'var(--color-text-secondary)' : '#94A3B8',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>DriveTrust</span>
              </div>
              <p className="text-sm max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
                Neutral reputation intelligence for mobility ecosystems. 
                Cross-platform verified ratings for drivers, car owners, and passengers.
              </p>
              <div className="flex gap-4 mt-6">
                {['twitter', 'linkedin', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#1E293B',
                      color: 'var(--color-primary-main)',
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Home</Link></li>
                <li><Link to="/how-it-works" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">How It Works</Link></li>
                <li><Link to="/features" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Features</Link></li>
                <li><Link to="/reviews" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Reviews</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/faq" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">FAQ</Link></li>
                <li><Link to="/support" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Support Center</Link></li>
                <li><Link to="/blog" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Blog</Link></li>
                <li><Link to="/privacy" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Privacy Policy</Link></li>
                <li><Link to="/terms" style={{ color: 'var(--color-text-secondary)' }} className="transition hover:opacity-80">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary-main)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span style={{ color: 'var(--color-text-secondary)' }}>support@drivetrust.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary-main)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span style={{ color: 'var(--color-text-secondary)' }}>+254 123 456 789</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-primary-main)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-10 pt-8 text-center text-sm"
            style={{
              borderTopWidth: '1px',
              borderColor: theme === 'dark' ? 'var(--color-bg-border)' : '#1E293B',
            }}
          >
            <p style={{ color: 'var(--color-text-primary)' }}>© 2024 DriveTrust. All rights reserved.</p>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              DriveTrust is an independent platform and is NOT affiliated with Uber Technologies Inc., Bolt Technology OÜ, or any subsidiaries.
              All data is user-submitted with explicit consent.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}