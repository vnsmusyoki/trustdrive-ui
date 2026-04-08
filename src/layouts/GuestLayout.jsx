// GuestLayout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function GuestLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F9FAFB] via-white to-[#F0F5FF]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#E5E7EB]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition"></div>
                <div className="relative w-9 h-9 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-[#111827]">Drive</span>
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">Trust</span>
                </span>
                <span className="text-[10px] text-[#6B7280] tracking-wide -mt-1">Reputation Intelligence</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-[#2563EB] bg-[#EFF6FF]'
                      : 'text-[#6B7280] hover:text-[#2563EB] hover:bg-[#F3F4F6]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-[#6B7280] hover:text-[#2563EB] font-medium transition px-4 py-2 rounded-full hover:bg-[#F3F4F6]">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign Up Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition"
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
            <div className="md:hidden py-4 border-t border-[#E5E7EB] animate-fadeIn">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                      location.pathname === link.path
                        ? 'text-[#2563EB] bg-[#EFF6FF]'
                        : 'text-[#6B7280] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-[#E5E7EB] my-2"></div>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[#6B7280] hover:bg-[#F3F4F6]">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 my-2 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white text-center py-3 rounded-xl font-semibold"
                >
                  Sign Up Free
                </Link>
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
      <footer className="bg-[#0F172A] text-[#94A3B8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-[#2563EB] to-[#7C3AED] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-white text-xl font-bold tracking-tight">DriveTrust</span>
              </div>
              <p className="text-sm text-[#94A3B8] max-w-md">
                Neutral reputation intelligence for mobility ecosystems. 
                Cross-platform verified ratings for drivers, car owners, and passengers.
              </p>
              <div className="flex gap-4 mt-6">
                {['twitter', 'linkedin', 'facebook'].map((social) => (
                  <a key={social} href="#" className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-[#3B82F6] transition">Home</Link></li>
                <li><Link to="/how-it-works" className="hover:text-[#3B82F6] transition">How It Works</Link></li>
                <li><Link to="/features" className="hover:text-[#3B82F6] transition">Features</Link></li>
                <li><Link to="/reviews" className="hover:text-[#3B82F6] transition">Reviews</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/faq" className="hover:text-[#3B82F6] transition">FAQ</Link></li>
                <li><Link to="/support" className="hover:text-[#3B82F6] transition">Support Center</Link></li>
                <li><Link to="/blog" className="hover:text-[#3B82F6] transition">Blog</Link></li>
                <li><Link to="/privacy" className="hover:text-[#3B82F6] transition">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#3B82F6] transition">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@drivetrust.com
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +254 123 456 789
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Nairobi, Kenya
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1E293B] mt-10 pt-8 text-center text-sm">
            <p>© 2024 DriveTrust. All rights reserved.</p>
            <p className="text-[#64748B] text-xs mt-2">
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