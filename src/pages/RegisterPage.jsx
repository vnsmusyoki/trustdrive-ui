import { Link } from 'react-router-dom'

const palette = {
  bg: 'var(--color-bg-main)',
  card: 'var(--color-bg-card)',
  border: 'var(--color-bg-border)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary-main)',
  primaryDark: 'var(--color-primary-dark)',
}

const roles = [
  {
    title: 'Driver Registration',
    description: 'For active or aspiring drivers building a verified portable trust profile.',
    path: '/register/driver',
    buttonLabel: 'Register as Driver',
    checks: ['Driver identity verification', 'License and vehicle profile', 'Trip behavior history'],
  },
  {
    title: 'Car Owner Registration',
    description: 'For private owners and fleet owners who rent out cars to vetted drivers.',
    path: '/register/owner',
    buttonLabel: 'Register as Owner',
    checks: ['Owner and fleet details', 'Vehicle onboarding', 'Risk preference settings'],
  },
  {
    title: 'Rental Platform Registration',
    description: 'For car rental platforms integrating trust intelligence into operations.',
    path: '/register/platform',
    buttonLabel: 'Register as Platform',
    checks: ['Business profile onboarding', 'Compliance and data mapping', 'Team access setup'],
  },
]

export default function RegisterPage() {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8" style={{ backgroundColor: palette.bg }}>
      <div className="mx-auto max-w-6xl">
        <div
          className="rounded-3xl border px-6 py-8 shadow-xl sm:px-10 md:py-10"
          style={{
            backgroundColor: palette.card,
            borderColor: palette.border,
            boxShadow: '0 20px 40px rgba(2, 6, 23, 0.08)',
          }}
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>
              Registration Pathways
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: palette.text }}>
              Choose your account type
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base" style={{ color: palette.textSecondary }}>
              TrustDrive supports dedicated onboarding journeys for drivers, car owners, and rental platforms.
              Select the profile that best matches your role.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {roles.map((role) => (
              <article
                key={role.path}
                className="rounded-2xl border p-5"
                style={{ borderColor: palette.border, backgroundColor: palette.card }}
              >
                <h2 className="text-lg font-semibold" style={{ color: palette.text }}>{role.title}</h2>
                <p className="mt-2 min-h-14 text-sm" style={{ color: palette.textSecondary }}>{role.description}</p>

                <ul className="mt-4 space-y-2 text-sm" style={{ color: palette.text }}>
                  {role.checks.map((check) => (
                    <li key={check} className="flex items-start gap-2">
                      <span style={{ color: palette.primary }} className="mt-1">•</span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={role.path}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: palette.primary }}
                >
                  {role.buttonLabel}
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: palette.textSecondary }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold" style={{ color: palette.primaryDark }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
