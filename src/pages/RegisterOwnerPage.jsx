import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

export default function RegisterOwnerPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    fleetSize: '',
    vehicleType: '',
    password: '',
    confirmPassword: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => {
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!EMAIL_REGEX.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!form.fleetSize.trim()) nextErrors.fleetSize = 'Fleet size is required.'
    if (!form.vehicleType.trim()) nextErrors.vehicleType = 'Vehicle type is required.'
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'
    return nextErrors
  }, [form])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return
    localStorage.setItem('trustdrive-user-role', 'owner')
    navigate('/home')
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
              Owner Onboarding
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight" style={{ color: palette.text }}>
              Find trustworthy
              <span className="block" style={{ color: palette.primary }}>drivers effortlessly</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: palette.textSecondary }}>
              Build a trusted owner profile and match with verified, reputation-backed drivers.
              Reduce risk with transparency.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Match with verified drivers',
              'Access verified driving history',
              'Set preferences and requirements',
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
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>Owner Registration</p>
              <h2 className="mt-2 text-3xl font-bold" style={{ color: palette.text }}>Create account</h2>
              <p className="mt-2 text-sm" style={{ color: palette.textSecondary }}>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold" style={{ color: palette.primary }}>
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.fullName ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.fullName && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.fullName}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.email ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.email && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.phone ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.phone && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Fleet size</label>
                  <input
                    name="fleetSize"
                    value={form.fleetSize}
                    onChange={handleChange}
                    placeholder="e.g. 12 vehicles"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.fleetSize ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.fleetSize && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.fleetSize}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Primary vehicle category</label>
                <input
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  placeholder="Sedan, SUV, Van, Mixed"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: submitted && errors.vehicleType ? palette.danger : palette.border,
                    color: palette.text,
                  }}
                />
                {submitted && errors.vehicleType && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.vehicleType}</p>}
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.password ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.password && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.password}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Confirm password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.confirmPassword ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.confirmPassword && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                Create Owner Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: palette.textSecondary }}>
              Want another account type?{' '}
              <Link to="/register" className="font-semibold" style={{ color: palette.primaryDark }}>
                Select role
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
