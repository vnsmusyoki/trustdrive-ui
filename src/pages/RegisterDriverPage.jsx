import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?[0-9\s-]{8,}$/

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

export default function RegisterDriverPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    city: '',
    password: '',
    confirmPassword: '',
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => {
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!EMAIL_REGEX.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!PHONE_REGEX.test(form.phone)) nextErrors.phone = 'Enter a valid phone number.'
    if (!form.licenseNumber.trim()) nextErrors.licenseNumber = 'License number is required.'
    if (!form.city.trim()) nextErrors.city = 'City is required.'
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'
    if (!form.consent) nextErrors.consent = 'You must accept verification consent.'
    return nextErrors
  }, [form])

  const isValid = Object.keys(errors).length === 0

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return
    localStorage.setItem('trustdrive-user-role', 'driver')
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
              Driver Onboarding
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight" style={{ color: palette.text }}>
              Build your
              <span className="block" style={{ color: palette.primary }}>reputation profile</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: palette.textSecondary }}>
              Create a verified driver profile that travels with you across all mobility platforms.
              Your reputation, your control.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Identity and license verification',
              'Portable trip and behavior history',
              'Control who sees your profile',
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
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>Driver Registration</p>
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
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>License number</label>
                  <input
                    name="licenseNumber"
                    value={form.licenseNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: submitted && errors.licenseNumber ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {submitted && errors.licenseNumber && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.licenseNumber}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Operating city</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: submitted && errors.city ? palette.danger : palette.border,
                    color: palette.text,
                  }}
                />
                {submitted && errors.city && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{errors.city}</p>}
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

              <label className="flex items-start gap-2 text-sm" style={{ color: palette.textSecondary }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4"
                  style={{ accentColor: palette.primary }}
                />
                I consent to identity and license verification checks as part of TrustDrive onboarding.
              </label>
              {submitted && errors.consent && <p className="text-xs" style={{ color: palette.danger }}>{errors.consent}</p>}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: palette.primary }}
              >
                Create Driver Account
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
