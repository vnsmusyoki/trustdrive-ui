import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '@/components/AuthForm'

export default function SetNewPasswordPage() {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
  const [submitted, setSubmitted] = useState(false)
  const [updated, setUpdated] = useState(false)

  const errors = useMemo(() => {
    const nextErrors = {}
    if (formData.password.length < 10) {
      nextErrors.password = 'Password must be at least 10 characters.'
    }
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }
    return nextErrors
  }, [formData])

  const isValid = Object.keys(errors).length === 0

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return
    setUpdated(true)
    console.log('Set new password submitted')
  }

  return (
    <AuthForm
      label="Security Update"
      title="Set new password"
      description="Choose a strong password that you have not used before."
      fields={[
        { name: 'password', type: 'password', label: 'New password', col: 2 },
        { name: 'confirmPassword', type: 'password', label: 'Confirm new password', col: 2 },
      ]}
      formData={formData}
      onFieldChange={handleFieldChange}
      errors={errors}
      submitted={submitted}
      onSubmit={handleSubmit}
      submitLabel="Save new password"
      successMessage={updated ? 'Password updated successfully. You can now sign in with your new credentials.' : null}
      links={[
        {
          text: 'Sign in',
          to: '/login',
          href: '#/login',
        },
        {
          text: 'Return to',
          role: 'prefix',
        },
      ]}
    />
  )
}
