import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/services/authService'
import { validateLogin } from '@/services/validationService'

const palette = {
  bg: 'var(--color-bg-main)',
  card: 'var(--color-bg-card)',
  border: 'var(--color-bg-border)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary-main)',
  primaryDark: 'var(--color-primary-dark)',
  success: 'var(--color-status-success)',
  danger: 'var(--color-status-danger)',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: true, role: 'driver' })
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const errors = useMemo(() => validateLogin(form), [form])

  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setAuthError('')

    if (!isFormValid) return

    setLoading(true)
    try {
      var response = await loginUser({ email: form.email, password: form.password })
      var info = await response.json();
      if (response.ok) {
        navigate('/home')
      } else {
        setAuthError(info.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      setAuthError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8" style={{ backgroundColor: palette.bg }}>
      <div
        className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border shadow-xl lg:grid-cols-2"
        style={{
          backgroundColor: palette.card,
          borderColor: palette.border,
          boxShadow: '0 20px 40px rgba(2, 6, 23, 0.08)',
        }}
      >
        <aside className="hidden border-r p-10 lg:flex lg:flex-col lg:justify-between" style={{ borderColor: palette.border }}>
          <div>
            <p
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ borderColor: palette.border, color: palette.primary }}
            >
              Trusted Mobility Identity
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight" style={{ color: palette.text }}>
              Welcome back to
              <span className="block" style={{ color: palette.primary }}>DriveTrust</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: palette.textSecondary }}>
              Sign in to continue managing your portable reputation profile, verify new trip records,
              and maintain trusted visibility across ride platforms.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Cross-platform rating portability',
              'Verified trip and behavior insights',
              'Security-first account controls',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border p-3"
                style={{ borderColor: palette.border, backgroundColor: 'rgba(148, 163, 184, 0.08)' }}
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ color: palette.success }}>
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-sm" style={{ color: palette.text }}>{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>Account Access</p>
              <h2 className="mt-2 text-3xl font-bold" style={{ color: palette.text }}>Sign in</h2>
              <p className="mt-2 text-sm" style={{ color: palette.textSecondary }}>
                New to DriveTrust?{' '}
                <Link to="/register" className="font-semibold" style={{ color: palette.primary }}>
                  Create your account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>
                  Work Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                    submitted && errors.email
                      ? 'focus:border-transparent'
                      : 'focus:border-transparent'
                  }`}
                  style={{
                    backgroundColor: palette.card,
                    borderColor: submitted && errors.email ? palette.danger : palette.border,
                    color: palette.text,
                    boxShadow: submitted && errors.email ? `0 0 0 2px ${palette.danger}33` : `0 0 0 2px transparent`,
                  }}
                />
                {submitted && errors.email && <p className="mt-1.5 text-xs" style={{ color: palette.danger }}>{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition focus:ring-2 ${
                      submitted && errors.password
                        ? 'focus:border-transparent'
                        : 'focus:border-transparent'
                    }`}
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.password ? palette.danger : palette.border,
                      color: palette.text,
                      boxShadow: submitted && errors.password ? `0 0 0 2px ${palette.danger}33` : `0 0 0 2px transparent`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-xs font-semibold"
                    style={{ color: palette.textSecondary }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
                {submitted && errors.password && <p className="mt-1.5 text-xs" style={{ color: palette.danger }}>{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm" style={{ color: palette.textSecondary }}>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: palette.primary }}
                  />
                  Remember me
                </label>

                <Link to="/reset-password" className="text-sm font-medium" style={{ color: palette.primary }}>
                  Forgot password?
                </Link>
              </div>

              <div>
                <label htmlFor="role" className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>
                  Sign in as
                </label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                    color: palette.text,
                  }}
                >
                  <option value="driver">Driver</option>
                  <option value="owner">Owner</option>
                  <option value="platform">Platform</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: palette.primary }}
              >
                {loading ? 'Signing in...' : 'Sign in securely'}
                <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {authError && (
                <p className="rounded-xl border px-3 py-2 text-xs font-medium" style={{ color: palette.danger, borderColor: palette.danger }}>
                  {authError}
                </p>
              )}
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1" style={{ backgroundColor: palette.border }} />
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: palette.textSecondary }}>or continue with</span>
              <div className="h-px flex-1" style={{ backgroundColor: palette.border }} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-xl border px-4 py-3 text-sm font-medium transition"
                style={{ borderColor: palette.border, color: palette.text, backgroundColor: palette.card }}
              >
                Google
              </button>
              <button
                type="button"
                className="rounded-xl border px-4 py-3 text-sm font-medium transition"
                style={{ borderColor: palette.border, color: palette.text, backgroundColor: palette.card }}
              >
                Microsoft
              </button>
            </div>

            <p className="mt-8 text-center text-xs leading-relaxed" style={{ color: palette.textSecondary }}>
              By signing in, you agree to our{' '}
              <Link to="/terms" className="font-medium" style={{ color: palette.primaryDark }}>Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="font-medium" style={{ color: palette.primaryDark }}>Privacy Policy</Link>.
            </p>

            <p className="mt-4 text-center text-xs" style={{ color: palette.textSecondary }}>
              Register as a{' '}
              <Link to="/register/driver" style={{ color: palette.primaryDark }} className="font-medium">Driver</Link>,{' '}
              <Link to="/register/owner" style={{ color: palette.primaryDark }} className="font-medium">Owner</Link>, or{' '}
              <Link to="/register/platform" style={{ color: palette.primaryDark }} className="font-medium">Platform</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
