const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin(form) {
  const errors = {}

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}

export function validateRegisterOwner(form) {
  const errors = {}

  if (!form.firstName.trim()) errors.firstName = 'First name is required.'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.'

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.'
  } else if (!form.phoneNumber.startsWith('0') || form.phoneNumber.length !== 10) {
    errors.phoneNumber = 'Phone must be 10 digits starting with 0.'
  }
  if (!form.fleetSize) errors.fleetSize = 'Fleet size is required.'
  if (!form.primaryVehicle.trim()) errors.primaryVehicle = 'Vehicle type is required.'
  if (!form.operatingCity.trim()) errors.operatingCity = 'Operating city is required.'
  if (!form.address.trim() || form.address.trim().length < 8) errors.address = 'Address must be at least 8 characters.'

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.'

  return errors
}

export function validateRegisterDriver(form) {
  const errors = {}

  if (!form.firstName.trim()) errors.firstName = 'First name is required.'
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.'

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.'
  } else if (!form.phoneNumber.startsWith('0') || form.phoneNumber.length !== 10) {
    errors.phoneNumber = 'Phone must be 10 digits starting with 0.'
  }
  if (!form.operatingCity.trim()) errors.operatingCity = 'Operating city is required.'
  if (!form.address.trim() || form.address.trim().length < 8) errors.address = 'Address must be at least 8 characters.'

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.'

  return errors
}

export function validateRegisterVendor(form) {
  const errors = {}

  if (!form.companyName.trim()) errors.companyName = 'Company name is required.'
  if (!form.platformBrandName.trim()) errors.platformBrandName = 'Platform name is required.'

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.country.trim()) errors.country = 'Country is required.'
  if (!form.activeFleetMonthly) errors.activeFleetMonthly = 'Active fleet size is required.'
  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.'
  } else if (!form.phoneNumber.startsWith('0') || form.phoneNumber.length !== 10) {
    errors.phoneNumber = 'Phone must be 10 digits starting with 0.'
  }
  if (!form.operatingCity.trim()) errors.operatingCity = 'Operating city is required.'
  if (!form.address.trim() || form.address.trim().length < 8) errors.address = 'Address must be at least 8 characters.'

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 10) {
    errors.password = 'Password must be at least 10 characters.'
  }

  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.'

  return errors
}
