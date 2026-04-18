import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import toast from 'react-hot-toast'
import { Eye, EyeOff, AlertCircle, X } from 'lucide-react'
import { registerCarOwner } from '@/services/authService'
import { validateRegisterOwner } from '@/services/validationService'

const KENYA_CITIES = [
  { value: 'Nairobi', label: 'Nairobi' },
  { value: 'Mombasa', label: 'Mombasa' },
  { value: 'Kisumu', label: 'Kisumu' },
  { value: 'Nakuru', label: 'Nakuru' },
  { value: 'Eldoret', label: 'Eldoret' },
]

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
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    fleetSize: '',
    primaryVehicle: '',
    password: '',
    confirmPassword: '',
    operatingCity: '',
    address: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiErrors, setApiErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const errors = useMemo(() => validateRegisterOwner(form), [form])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (apiErrors[name]) setApiErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handlePhoneChange = (event) => {
    let digits = event.target.value.replace(/\D/g, '')
    if (digits.length > 0 && digits[0] !== '0') digits = '0' + digits
    if (digits.length > 10) digits = digits.slice(0, 10)
    setForm((prev) => ({ ...prev, phoneNumber: digits }))
    if (apiErrors.phoneNumber) setApiErrors((prev) => ({ ...prev, phoneNumber: undefined }))
  }

  const handleCityChange = (option) => {
    setForm((prev) => ({ ...prev, operatingCity: option ? option.value : '' }))
    if (apiErrors.operatingCity) setApiErrors((prev) => ({ ...prev, operatingCity: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setAuthError('')
    setApiErrors({})

    if (Object.keys(errors).length > 0) return

    setLoading(true)
    try {
      const data = await registerCarOwner({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        fleetSize: parseInt(form.fleetSize) || 0,
        primaryVehicle: form.primaryVehicle,
        password: form.password,
        confirmPassword: form.confirmPassword,
        operatingCity: form.operatingCity,
        address: form.address,
      })
      toast.success(data.message || 'Registration successful!')
      navigate('/login')
    } catch (error) {
      if (error.errors) {
        setApiErrors(error.errors)
      }
      setAuthError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getError = (field) => (submitted && errors[field]) || apiErrors[field]

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
              {(authError || Object.keys(apiErrors).filter((k) => apiErrors[k]).length > 0) && (
                <div
                  className="relative rounded-xl border p-4"
                  style={{ borderColor: palette.danger, backgroundColor: `${palette.danger}08` }}
                >
                  
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: palette.danger }} />
                    <div className="space-y-1">
                      {authError && (
                        <p className="text-sm font-medium" style={{ color: palette.danger }}>{authError}</p>
                      )}
                      {Object.entries(apiErrors)
                        .filter(([, v]) => v)
                        .map(([field, msg]) => (
                          <p key={field} className="text-xs" style={{ color: palette.danger }}>
                            <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>: {msg}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>First name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: getError('firstName') ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {getError('firstName') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('firstName')}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Last name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: getError('lastName') ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {getError('lastName') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('lastName')}</p>}
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
                      borderColor: getError('email') ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {getError('email') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('email')}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Phone</label>
                  <div className="relative">
                    <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="0712345678"
                      maxLength={10}
                      className="w-full rounded-xl border px-4 py-3 pr-14 text-sm outline-none transition focus:ring-2"
                      style={{
                        backgroundColor: palette.card,
                        borderColor: getError('phoneNumber') ? palette.danger : palette.border,
                        color: palette.text,
                      }}
                    />
                    <span
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums"
                      style={{ color: form.phoneNumber.length === 10 ? palette.success : palette.textSecondary }}
                    >
                      {form.phoneNumber.length}/10
                    </span>
                  </div>
                  {getError('phoneNumber') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('phoneNumber')}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Fleet size</label>
                  <input
                    name="fleetSize"
                    type="number"
                    value={form.fleetSize}
                    onChange={handleChange}
                    placeholder="e.g. 12"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{
                      backgroundColor: palette.card,
                      borderColor: getError('fleetSize') ? palette.danger : palette.border,
                      color: palette.text,
                    }}
                  />
                  {getError('fleetSize') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('fleetSize')}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Operating city</label>
                  <Select
                    options={KENYA_CITIES}
                    value={KENYA_CITIES.find((c) => c.value === form.operatingCity) || null}
                    onChange={handleCityChange}
                    placeholder="Select a city..."
                    isClearable
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: palette.card,
                        borderColor: getError('operatingCity') ? palette.danger : palette.border,
                        borderRadius: '0.75rem',
                        padding: '0.25rem 0.25rem',
                        fontSize: '0.875rem',
                        boxShadow: state.isFocused ? `0 0 0 2px ${palette.primary}40` : 'none',
                        '&:hover': { borderColor: palette.primary },
                      }),
                      singleValue: (base) => ({ ...base, color: palette.text }),
                      menu: (base) => ({ ...base, backgroundColor: palette.card, borderRadius: '0.75rem', border: `1px solid ${palette.border}` }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? palette.primary : state.isFocused ? `${palette.primary}15` : 'transparent',
                        color: state.isSelected ? '#fff' : palette.text,
                        fontSize: '0.875rem',
                      }),
                      placeholder: (base) => ({ ...base, color: palette.textSecondary }),
                      input: (base) => ({ ...base, color: palette.text }),
                    }}
                  />
                  {getError('operatingCity') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('operatingCity')}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Primary vehicle category</label>
                <input
                  name="primaryVehicle"
                  value={form.primaryVehicle}
                  onChange={handleChange}
                  placeholder="Sedan, SUV, Van, Mixed"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: getError('primaryVehicle') ? palette.danger : palette.border,
                    color: palette.text,
                  }}
                />
                {getError('primaryVehicle') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('primaryVehicle')}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: getError('address') ? palette.danger : palette.border,
                    color: palette.text,
                  }}
                />
                {getError('address') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('address')}</p>}
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition focus:ring-2"
                      style={{
                        backgroundColor: palette.card,
                        borderColor: getError('password') ? palette.danger : palette.border,
                        color: palette.text,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                      style={{ color: palette.textSecondary }}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {getError('password') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('password')}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>Confirm password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition focus:ring-2"
                      style={{
                        backgroundColor: palette.card,
                        borderColor: getError('confirmPassword') ? palette.danger : palette.border,
                        color: palette.text,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                      style={{ color: palette.textSecondary }}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {getError('confirmPassword') && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{getError('confirmPassword')}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: palette.primary }}
              >
                {loading ? 'Creating account...' : 'Create Owner Account'}
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
