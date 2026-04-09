const palette = {
  bg: 'var(--color-bg-main)',
  card: 'var(--color-bg-card)',
  border: 'var(--color-bg-border)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary-main)',
  primaryDark: 'var(--color-primary-dark)',
  danger: 'var(--color-status-danger)',
  success: 'var(--color-status-success)',
}

/**
 * Reusable authentication form component
 * Handles field rendering, validation display, and submission
 *
 * @param {Object} props
 * @param {string} props.title - Form title
 * @param {string} props.description - Form description
 * @param {string} props.label - Uppercase section label (e.g., "Account Access")
 * @param {Array} props.fields - Field configuration array
 * @param {Object} props.formData - Current form values
 * @param {Function} props.onFieldChange - Handler for field changes
 * @param {Object} props.errors - Validation errors object
 * @param {boolean} props.submitted - Whether form has been submitted
 * @param {Function} props.onSubmit - Form submission handler
 * @param {string} props.submitLabel - Submit button text
 * @param {boolean} props.isLoading - Whether form is being submitted
 * @param {Array} props.customSections - Additional form sections (checkboxes, etc.)
 * @param {Array} props.links - Navigation links [{ label, to, text }]
 * @param {string} props.successMessage - Success message to display
 * @param {string} props.maxWidth - Tailwind max-width class (default: max-w-xl)
 * @returns {React.ReactNode}
 */
export default function AuthForm({
  title,
  description,
  label,
  fields,
  formData,
  onFieldChange,
  errors,
  submitted,
  onSubmit,
  submitLabel,
  isLoading = false,
  customSections = [],
  links = [],
  successMessage = null,
  maxWidth = 'max-w-xl',
}) {
  const inputClass = 'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2'

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8" style={{ backgroundColor: palette.bg }}>
      <div
        className={`mx-auto rounded-3xl border p-6 shadow-xl sm:p-8 ${maxWidth}`}
        style={{ backgroundColor: palette.card, borderColor: palette.border }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.primary }}>
          {label}
        </p>
        <h1 className="mt-2 text-3xl font-bold" style={{ color: palette.text }}>
          {title}
        </h1>
        <p className="mt-2 text-sm" style={{ color: palette.textSecondary }}>
          {description}
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
          {/* Field groups */}
          {fields.length > 0 && (
            <div className={`space-y-4 ${fields.some((f) => f.col === 2) ? 'grid gap-4 sm:grid-cols-2' : ''}`}>
              {fields.map((field) => (
                <div key={field.name} className={field.col === 1 ? 'sm:col-span-2' : ''}>
                  <label className="mb-1.5 block text-sm font-medium" style={{ color: palette.text }}>
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={onFieldChange}
                      className={inputClass}
                      style={{
                        backgroundColor: palette.card,
                        borderColor: submitted && errors[field.name] ? palette.danger : palette.border,
                        color: palette.text,
                      }}
                    >
                      <option value="">{field.placeholder || 'Select...'}</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={onFieldChange}
                      placeholder={field.placeholder}
                      className={inputClass}
                      style={{
                        backgroundColor: palette.card,
                        borderColor: submitted && errors[field.name] ? palette.danger : palette.border,
                        color: palette.text,
                      }}
                    />
                  )}
                  {submitted && errors[field.name] && (
                    <p className="mt-1 text-xs" style={{ color: palette.danger }}>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Custom sections (checkboxes, etc.) */}
          {customSections.length > 0 && (
            <div className="space-y-3">
              {customSections.map((section) =>
                section.type === 'checkbox' ? (
                  <label key={section.name} className="flex items-start gap-2 text-sm" style={{ color: palette.textSecondary }}>
                    <input
                      type="checkbox"
                      name={section.name}
                      checked={formData[section.name] || false}
                      onChange={onFieldChange}
                      className="mt-1 h-4 w-4"
                      style={{ accentColor: palette.primary }}
                    />
                    {section.label}
                  </label>
                ) : null
              )}
              {customSections.some((s) => s.type === 'checkbox' && errors[s.name]) && (
                <p className="text-xs" style={{ color: palette.danger }}>
                  {customSections.find((s) => errors[s.name])?.error}
                </p>
              )}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: palette.primary }}
          >
            {submitLabel}
          </button>
        </form>

        {/* Success message */}
        {successMessage && (
          <div className="mt-5 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: palette.success, color: palette.success }}>
            {successMessage}
          </div>
        )}

        {/* Navigation links */}
        {links.length > 0 && (
          <p className="mt-6 text-center text-sm" style={{ color: palette.textSecondary }}>
            {links.map((link, idx) => (
              <span key={link.to}>
                {idx > 0 && ' '}
                {link.href ? (
                  <a href={link.href} className="font-semibold" style={{ color: palette.primaryDark }}>
                    {link.text}
                  </a>
                ) : (
                  <a href={`#${link.to}`} className="font-semibold" style={{ color: palette.primaryDark }}>
                    {link.text}
                  </a>
                )}
                {idx < links.length - 1 && link.separator && link.separator}
              </span>
            ))}
          </p>
        )}

        {/* Custom footer content */}
        {links.length > 0 && links[0].customContent && <div className="mt-4">{links[0].customContent}</div>}
      </div>
    </section>
  )
}
