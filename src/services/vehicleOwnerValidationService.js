const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?[0-9]{10,15}$/
const URL_REGEX = /^https?:\/\/.+\..+/

export function validateVehicleOwnerStep1(ownerType, personalInfo, companyInfo) {
  const errors = {}

  if (ownerType === 'individual') {
    if (!personalInfo.fullName?.trim()) errors.fullName = 'Full name is required.'
    else if (personalInfo.fullName.trim().length < 2) errors.fullName = 'Full name must be at least 2 characters.'

    if (!personalInfo.phone?.trim()) {
      errors.phone = 'Phone number is required.'
    } else if (!PHONE_REGEX.test(personalInfo.phone)) {
      errors.phone = 'Enter a valid phone number (e.g., +2547XXXXXXXX).'
    }

    if (!personalInfo.email?.trim()) {
      errors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(personalInfo.email)) {
      errors.email = 'Enter a valid email address.'
    }

    if (!personalInfo.nationalId?.trim()) errors.nationalId = 'National ID is required.'
    else if (personalInfo.nationalId.trim().length < 5) errors.nationalId = 'National ID must be at least 5 characters.'

    if (personalInfo.alternativePhone?.trim() && !PHONE_REGEX.test(personalInfo.alternativePhone)) {
      errors.alternativePhone = 'Enter a valid phone number.'
    }
  } else {
    if (!companyInfo.companyName?.trim()) errors.companyName = 'Company name is required.'
    else if (companyInfo.companyName.trim().length < 2) errors.companyName = 'Company name must be at least 2 characters.'

    if (!companyInfo.registrationNumber?.trim()) errors.registrationNumber = 'Registration number is required.'

    if (!companyInfo.contactPersonName?.trim()) errors.contactPersonName = 'Contact person name is required.'

    if (!companyInfo.contactPersonPhone?.trim()) {
      errors.contactPersonPhone = 'Contact person phone is required.'
    } else if (!PHONE_REGEX.test(companyInfo.contactPersonPhone)) {
      errors.contactPersonPhone = 'Enter a valid phone number.'
    }

    if (!companyInfo.contactPersonEmail?.trim()) {
      errors.contactPersonEmail = 'Contact person email is required.'
    } else if (!EMAIL_REGEX.test(companyInfo.contactPersonEmail)) {
      errors.contactPersonEmail = 'Enter a valid email address.'
    }

    if (companyInfo.website?.trim() && !URL_REGEX.test(companyInfo.website)) {
      errors.website = 'Enter a valid URL (e.g., https://company.co.ke).'
    }

    if (companyInfo.yearEstablished) {
      const year = Number(companyInfo.yearEstablished)
      if (year < 1900 || year > new Date().getFullYear()) {
        errors.yearEstablished = 'Enter a valid year.'
      }
    }

    if (companyInfo.numberOfDirectors) {
      const n = Number(companyInfo.numberOfDirectors)
      if (n < 1 || n > 50) errors.numberOfDirectors = 'Number of directors must be between 1 and 50.'
    }
  }

  return errors
}

export function validateVehicleOwnerStep2(ownerType, businessDetails) {
  const errors = {}

  if (ownerType === 'company' || businessDetails.businessType !== 'individual') {
    if (!businessDetails.businessName?.trim()) errors.businessName = 'Business name is required.'
    if (!businessDetails.businessRegNumber?.trim()) errors.businessRegNumber = 'Business registration number is required.'
  }

  if (businessDetails.fleetSize !== '' && businessDetails.fleetSize !== undefined) {
    const size = Number(businessDetails.fleetSize)
    if (isNaN(size) || size < 0) errors.fleetSize = 'Fleet size must be 0 or greater.'
  }

  if (businessDetails.yearsInOperation !== '' && businessDetails.yearsInOperation !== undefined) {
    const years = Number(businessDetails.yearsInOperation)
    if (isNaN(years) || years < 0 || years > 100) errors.yearsInOperation = 'Enter a valid number of years.'
  }

  return errors
}

export function validateVehicleOwnerStep3(verificationDetails) {
  const errors = {}

  if (!verificationDetails.termsAccepted) {
    errors.termsAccepted = 'You must accept the Terms of Service.'
  }

  if (!verificationDetails.dataProcessingConsent) {
    errors.dataProcessingConsent = 'You must consent to data processing under the Data Protection Act.'
  }

  return errors
}
