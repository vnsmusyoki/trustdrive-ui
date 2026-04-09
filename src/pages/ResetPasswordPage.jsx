import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)

  const errors = useMemo(() => {
    const nextErrors = {}
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    return nextErrors
  }, [form])

  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)

    if (!isFormValid) return

    setSent(true)
    console.log('Reset password email:', form.email)
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
              Security First
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight" style={{ color: palette.text }}>
              Recover your
              <span className="block" style={{ color: palette.primary }}>account access</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: palette.textSecondary }}>
              We'll send you a secure link to reset your password. Access your trusted mobility identity
              and keep your reputation profile safe.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Secure link sent via email',
              'One-time reset token',
              'Protected account recovery',
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
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>Password Recovery</p>
              <h2 className="mt-2 text-3xl font-bold" style={{ color: palette.text }}>Reset password</h2>
              <p className="mt-2 text-sm" style={{ color: palette.textSecondary }}>
                Enter your email and we'll send you a link to create a new password.
              </p>
            </div>

            {sent ? (
              <div
                className="rounded-xl border p-4 mb-6"
                style={{
                  backgroundColor: `${palette.success}15`,
                  borderColor: palette.success,
                }}
              >
                <p className="text-sm font-medium" style={{ color: palette.success }}>
                  Reset instructions sent successfully. Use the link from your inbox to continue.
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: submitted && errors.email ? palette.danger : palette.border,
                    color: palette.text,
                    boxShadow: submitted && errors.email ? `0 0 0 2px ${palette.danger}33` : `0 0 0 2px transparent`,
                  }}
                />
                {submitted && errors.email && <p className="mt-1.5 text-xs" style={{ color: palette.danger }}>{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: palette.primary }}
              >
                Send reset link
                <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: palette.textSecondary }}>
                Remembered your password?{' '}
                <Link to="/login" className="font-semibold" style={{ color: palette.primary }}>
                  Sign in
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: palette.textSecondary }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium" style={{ color: palette.primaryDark }}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
