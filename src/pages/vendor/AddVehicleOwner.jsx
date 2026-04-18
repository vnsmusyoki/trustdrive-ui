import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, ArrowLeft, Plus, Check, ChevronRight, ChevronLeft, 
  Shield, FileText, Building, CreditCard, User, Phone, Mail,
  MapPin, Briefcase, Upload, Award, Clock, Star, AlertCircle
} from 'lucide-react';
import {
  validateVehicleOwnerStep1,
  validateVehicleOwnerStep2,
  validateVehicleOwnerStep3,
} from '@/services/vehicleOwnerValidationService';

const palette = {
  bg: 'var(--color-bg-main)',
  card: 'var(--color-bg-card)',
  border: 'var(--color-bg-border)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary-main)',
  primaryDark: 'var(--color-primary-dark)',
  success: 'var(--color-status-success)',
  warning: 'var(--color-status-warning)',
  danger: 'var(--color-status-danger)',
  accent: 'var(--color-accent-purple)',
};

const STEPS = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Business Details', icon: Building },
  { id: 3, name: 'Verification', icon: Shield },
  { id: 4, name: 'Subscription', icon: CreditCard },
];

function FormInput({ label, required, error, icon: Icon, type = "text", ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>
        {label} {required && <span style={{ color: palette.danger }}>*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Icon size={16} style={{ color: palette.textSecondary }} />
          </div>
        )}
        <input
          type={type}
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${Icon ? 'pl-9' : ''}`}
          style={{
            backgroundColor: palette.bg,
            borderColor: error ? palette.danger : palette.border,
            color: palette.text,
            '--tw-ring-color': palette.primary,
          }}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{error}</p>}
    </div>
  );
}

function FormSelect({ label, required, error, icon: Icon, children, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>
        {label} {required && <span style={{ color: palette.danger }}>*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Icon size={16} style={{ color: palette.textSecondary }} />
          </div>
        )}
        <select
          className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${Icon ? 'pl-9' : ''}`}
          style={{
            backgroundColor: palette.bg,
            borderColor: error ? palette.danger : palette.border,
            color: palette.text,
            '--tw-ring-color': palette.primary,
          }}
          {...props}
        >
          {children}
        </select>
      </div>
      {error && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{error}</p>}
    </div>
  );
}

function FormTextArea({ label, required, error, rows = 3, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>
        {label} {required && <span style={{ color: palette.danger }}>*</span>}
      </label>
      <textarea
        rows={rows}
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
        style={{
          backgroundColor: palette.bg,
          borderColor: error ? palette.danger : palette.border,
          color: palette.text,
          '--tw-ring-color': palette.primary,
        }}
        {...props}
      />
      {error && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, onFileChange, accept = "image/*", multiple = false }) {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
      onFileChange(multiple ? files : files[0]);
    }
  };

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>{label}</label>
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition hover:opacity-80"
        style={{ borderColor: palette.border, backgroundColor: palette.bg }}
        onClick={() => document.getElementById(`upload-${label.replace(/\s/g, '')}`).click()}
      >
        {previews.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {previews.map((preview, idx) => (
              <img key={idx} src={preview} alt={`Preview ${idx + 1}`} className="h-16 w-16 rounded-lg object-cover" />
            ))}
          </div>
        ) : (
          <>
            <Upload size={24} style={{ color: palette.textSecondary }} />
            <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Click to upload</p>
            {multiple && <p className="text-xs" style={{ color: palette.textSecondary }}>You can select multiple files</p>}
          </>
        )}
        <input
          id={`upload-${label.replace(/\s/g, '')}`}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function RatingStars({ rating, onRatingChange, editable = true }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onRatingChange?.(star)}
          className={`${!editable && 'cursor-default'} transition hover:scale-110`}
          disabled={!editable}
        >
          <Star
            size={20}
            fill={star <= rating ? palette.warning : 'none'}
            color={star <= rating ? palette.warning : palette.textSecondary}
          />
        </button>
      ))}
    </div>
  );
}

export default function AddVehicleOwner() {
  const navigate = useNavigate();
  const [ownerType, setOwnerType] = useState(null); // null | 'individual' | 'company'
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Step 1: Personal / Company Information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    nationalId: '',
    alternativePhone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    registrationNumber: '',
    taxId: '',
    contactPersonName: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
    contactPersonRole: '',
    numberOfDirectors: '',
    companyAddress: '',
    companyCity: '',
    companyPostalCode: '',
    website: '',
    yearEstablished: '',
  });

  // Step 2: Business Details
  const [businessDetails, setBusinessDetails] = useState({
    businessType: 'individual',
    businessName: '',
    businessRegNumber: '',
    taxId: '',
    yearsInOperation: '',
    fleetSize: '',
    saccoAffiliation: '',
    saccoMembershipNumber: '',
    preferredContactMethod: 'phone',
    businessAddress: '',
    businessCity: '',
    businessPostalCode: '',
    website: '',
  });

  // Step 3: Verification & Reputation
  const [verificationDetails, setVerificationDetails] = useState({
    proofOfIdentity: null,
    proofOfAddress: null,
    businessRegistrationDoc: null,
    insuranceCertificate: null,
    termsAccepted: false,
    dataProcessingConsent: false,
    marketingConsent: false,
  });

  // Step 4: Subscription
  const [subscription, setSubscription] = useState({
    plan: 'free',
    billingCycle: 'monthly',
    paymentMethod: '',
  });

  const handlePersonalChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCompanyChange = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleBusinessChange = (field, value) => {
    setBusinessDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const newErrors = validateVehicleOwnerStep1(ownerType, personalInfo, companyInfo);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = validateVehicleOwnerStep2(ownerType, businessDetails);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = validateVehicleOwnerStep3(verificationDetails);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = validateStep3();
    else isValid = true;

    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      setCurrentStep(1);
      return;
    }

    const payload = {
      ownerType,
      owner: ownerType === 'individual'
        ? { ...personalInfo, ...businessDetails }
        : { ...companyInfo, ...businessDetails },
      ownerRaw: ownerType === 'individual' ? personalInfo : companyInfo,
      verification_documents: {
        proof_of_identity: verificationDetails.proofOfIdentity,
        proof_of_address: verificationDetails.proofOfAddress,
        business_registration: verificationDetails.businessRegistrationDoc,
        insurance_certificate: verificationDetails.insuranceCertificate,
      },
      subscription: subscription,
      consents: {
        terms_accepted: verificationDetails.termsAccepted,
        data_processing: verificationDetails.dataProcessingConsent,
        marketing: verificationDetails.marketingConsent,
      },
      registered_at: new Date().toISOString(),
    };

    console.log('Submitting owner registration:', payload);
    
    // TODO: Wire to actual API
    // const response = await api.post('/owners/register', payload);
    
    navigate('/vehicle-owners');
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep >= step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                    isActive
                      ? 'border-transparent bg-opacity-100'
                      : 'border-gray-300 bg-transparent'
                  }`}
                  style={{
                    backgroundColor: isActive ? palette.primary : 'transparent',
                    borderColor: isActive ? palette.primary : palette.border,
                  }}
                >
                  {isActive ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <Icon size={18} style={{ color: palette.textSecondary }} />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCurrent ? 'text-primary' : ''
                  }`}
                  style={{ color: isCurrent ? palette.primary : palette.textSecondary }}
                >
                  {step.name}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className="h-[2px] flex-1 mx-2"
                  style={{
                    backgroundColor: currentStep > step.id ? palette.primary : palette.border,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => {
    if (ownerType === 'company') {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Company Information</h3>
            <p className="text-sm" style={{ color: palette.textSecondary }}>Official company registration and contact details</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Company Name"
              required
              placeholder="e.g. Mwangi Fleet Ltd"
              value={companyInfo.companyName}
              onChange={(e) => handleCompanyChange('companyName', e.target.value)}
              error={errors.companyName}
              icon={Building}
            />
            <FormInput
              label="Registration Number"
              required
              placeholder="e.g. PVT-2024-12345"
              value={companyInfo.registrationNumber}
              onChange={(e) => handleCompanyChange('registrationNumber', e.target.value)}
              error={errors.registrationNumber}
              icon={FileText}
            />
            <FormInput
              label="Tax ID / KRA PIN"
              placeholder="e.g. A123456789Z"
              value={companyInfo.taxId}
              onChange={(e) => handleCompanyChange('taxId', e.target.value)}
              icon={Shield}
            />
            <FormInput
              label="Year Established"
              type="number"
              placeholder="e.g. 2018"
              value={companyInfo.yearEstablished}
              onChange={(e) => handleCompanyChange('yearEstablished', e.target.value)}
              icon={Clock}
            />
          </div>

          <hr className="my-4" style={{ borderColor: palette.border }} />

          <div>
            <h4 className="mb-3 text-sm font-semibold flex items-center gap-2" style={{ color: palette.text }}>
              <User size={16} style={{ color: palette.primary }} /> Primary Contact Person
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Contact Person Full Name"
                required
                placeholder="e.g. Jane Kamau"
                value={companyInfo.contactPersonName}
                onChange={(e) => handleCompanyChange('contactPersonName', e.target.value)}
                error={errors.contactPersonName}
                icon={User}
              />
              <FormInput
                label="Role / Title"
                placeholder="e.g. Fleet Manager"
                value={companyInfo.contactPersonRole}
                onChange={(e) => handleCompanyChange('contactPersonRole', e.target.value)}
                icon={Briefcase}
              />
              <FormInput
                label="Contact Phone"
                required
                type="tel"
                placeholder="+2547XXXXXXXX"
                value={companyInfo.contactPersonPhone}
                onChange={(e) => handleCompanyChange('contactPersonPhone', e.target.value)}
                error={errors.contactPersonPhone}
                icon={Phone}
              />
              <FormInput
                label="Contact Email"
                required
                type="email"
                placeholder="jane@company.com"
                value={companyInfo.contactPersonEmail}
                onChange={(e) => handleCompanyChange('contactPersonEmail', e.target.value)}
                error={errors.contactPersonEmail}
                icon={Mail}
              />
              <FormInput
                label="Number of Directors"
                type="number"
                placeholder="e.g. 3"
                value={companyInfo.numberOfDirectors}
                onChange={(e) => handleCompanyChange('numberOfDirectors', e.target.value)}
              />
            </div>
          </div>

          <hr className="my-4" style={{ borderColor: palette.border }} />

          <div>
            <h4 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>Registered Office Address</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Street Address"
                placeholder="e.g. Industrial Area, Enterprise Road"
                value={companyInfo.companyAddress}
                onChange={(e) => handleCompanyChange('companyAddress', e.target.value)}
                icon={MapPin}
              />
              <FormInput
                label="City"
                placeholder="e.g. Nairobi"
                value={companyInfo.companyCity}
                onChange={(e) => handleCompanyChange('companyCity', e.target.value)}
              />
              <FormInput
                label="Postal Code"
                placeholder="e.g. 00100"
                value={companyInfo.companyPostalCode}
                onChange={(e) => handleCompanyChange('companyPostalCode', e.target.value)}
              />
              <FormInput
                label="Website (Optional)"
                type="url"
                placeholder="https://company.co.ke"
                value={companyInfo.website}
                onChange={(e) => handleCompanyChange('website', e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }

    // Individual
    return (
      <div className="space-y-6">
        <div>
          <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Personal Information</h3>
          <p className="text-sm" style={{ color: palette.textSecondary }}>Your legal identification and contact details</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Full Name"
            required
            placeholder="e.g. John Mwangi"
            value={personalInfo.fullName}
            onChange={(e) => handlePersonalChange('fullName', e.target.value)}
            error={errors.fullName}
            icon={User}
          />
          <FormInput
            label="Phone Number"
            required
            type="tel"
            placeholder="+2547XXXXXXXX"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalChange('phone', e.target.value)}
            error={errors.phone}
            icon={Phone}
          />
          <FormInput
            label="Email Address"
            required
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => handlePersonalChange('email', e.target.value)}
            error={errors.email}
            icon={Mail}
          />
          <FormInput
            label="National ID Number"
            required
            placeholder="e.g. 12345678"
            value={personalInfo.nationalId}
            onChange={(e) => handlePersonalChange('nationalId', e.target.value)}
            error={errors.nationalId}
            icon={Shield}
          />
          <FormInput
            label="Alternative Phone Number"
            type="tel"
            placeholder="+2547XXXXXXXX"
            value={personalInfo.alternativePhone}
            onChange={(e) => handlePersonalChange('alternativePhone', e.target.value)}
            icon={Phone}
          />
          <FormInput
            label="Date of Birth"
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => handlePersonalChange('dateOfBirth', e.target.value)}
          />
        </div>

        <hr className="my-4" style={{ borderColor: palette.border }} />

        <div>
          <h4 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>Residential Address</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Street Address"
              placeholder="e.g. 123 Main Street"
              value={personalInfo.address}
              onChange={(e) => handlePersonalChange('address', e.target.value)}
              icon={MapPin}
            />
            <FormInput
              label="City"
              placeholder="e.g. Nairobi"
              value={personalInfo.city}
              onChange={(e) => handlePersonalChange('city', e.target.value)}
            />
            <FormInput
              label="Postal Code"
              placeholder="e.g. 00100"
              value={personalInfo.postalCode}
              onChange={(e) => handlePersonalChange('postalCode', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Business Information</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>Details about your vehicle rental business</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormSelect
          label="Business Type"
          required
          value={businessDetails.businessType}
          onChange={(e) => handleBusinessChange('businessType', e.target.value)}
          icon={Briefcase}
        >
          <option value="individual">Individual Owner</option>
          <option value="sole_proprietorship">Sole Proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="limited_company">Limited Company</option>
          <option value="sacco">Sacco / Cooperative</option>
          <option value="fleet_management">Fleet Management Company</option>
        </FormSelect>

        {businessDetails.businessType !== 'individual' && (
          <>
            <FormInput
              label="Business Name"
              required
              placeholder="e.g. Mwangi Rentals Ltd"
              value={businessDetails.businessName}
              onChange={(e) => handleBusinessChange('businessName', e.target.value)}
              error={errors.businessName}
              icon={Building}
            />
            <FormInput
              label="Business Registration Number"
              required
              placeholder="e.g. PVT-2024-12345"
              value={businessDetails.businessRegNumber}
              onChange={(e) => handleBusinessChange('businessRegNumber', e.target.value)}
              error={errors.businessRegNumber}
              icon={FileText}
            />
            <FormInput
              label="Tax ID / PIN"
              placeholder="e.g. A123456789Z"
              value={businessDetails.taxId}
              onChange={(e) => handleBusinessChange('taxId', e.target.value)}
            />
          </>
        )}

        <FormInput
          label="Years in Operation"
          type="number"
          placeholder="e.g. 3"
          value={businessDetails.yearsInOperation}
          onChange={(e) => handleBusinessChange('yearsInOperation', e.target.value)}
        />
        
        <FormInput
          label="Fleet Size"
          type="number"
          placeholder="Number of vehicles"
          value={businessDetails.fleetSize}
          onChange={(e) => handleBusinessChange('fleetSize', e.target.value)}
          error={errors.fleetSize}
        />
      </div>

      <hr className="my-4" style={{ borderColor: palette.border }} />

      <div>
        <h4 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>Sacco / Association Membership</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Sacco / Fleet Affiliation"
            placeholder="e.g. Nairobi Matatu Sacco"
            value={businessDetails.saccoAffiliation}
            onChange={(e) => handleBusinessChange('saccoAffiliation', e.target.value)}
            icon={Users}
          />
          <FormInput
            label="Membership Number"
            placeholder="e.g. SAC123456"
            value={businessDetails.saccoMembershipNumber}
            onChange={(e) => handleBusinessChange('saccoMembershipNumber', e.target.value)}
          />
        </div>
      </div>

      <hr className="my-4" style={{ borderColor: palette.border }} />

      <div>
        <h4 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>Business Address</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Business Street Address"
            placeholder="e.g. Industrial Area"
            value={businessDetails.businessAddress}
            onChange={(e) => handleBusinessChange('businessAddress', e.target.value)}
            icon={MapPin}
          />
          <FormInput
            label="Business City"
            placeholder="e.g. Nairobi"
            value={businessDetails.businessCity}
            onChange={(e) => handleBusinessChange('businessCity', e.target.value)}
          />
          <FormInput
            label="Business Postal Code"
            placeholder="e.g. 00100"
            value={businessDetails.businessPostalCode}
            onChange={(e) => handleBusinessChange('businessPostalCode', e.target.value)}
          />
          <FormInput
            label="Website (Optional)"
            type="url"
            placeholder="https://yourbusiness.com"
            value={businessDetails.website}
            onChange={(e) => handleBusinessChange('website', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormSelect
          label="Preferred Contact Method"
          value={businessDetails.preferredContactMethod}
          onChange={(e) => handleBusinessChange('preferredContactMethod', e.target.value)}
        >
          <option value="phone">Phone Call</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </FormSelect>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Verification & Compliance</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>
          Help us verify your identity and build trust with drivers
        </p>
      </div>

      <div className="rounded-lg border p-4" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
        <h4 className="mb-3 text-sm font-semibold flex items-center gap-2" style={{ color: palette.text }}>
          <Shield size={16} /> Required Documents
        </h4>
        
        <div className="grid gap-4 md:grid-cols-2">
          <FileUpload
            label="Proof of Identity (ID/Passport)"
            accept="image/*,application/pdf"
            onFileChange={(file) => setVerificationDetails(prev => ({ ...prev, proofOfIdentity: file }))}
          />
          <FileUpload
            label="Proof of Address (Utility Bill/Bank Statement)"
            accept="image/*,application/pdf"
            onFileChange={(file) => setVerificationDetails(prev => ({ ...prev, proofOfAddress: file }))}
          />
          {businessDetails.businessType !== 'individual' && (
            <FileUpload
              label="Business Registration Certificate"
              accept="image/*,application/pdf"
              onFileChange={(file) => setVerificationDetails(prev => ({ ...prev, businessRegistrationDoc: file }))}
            />
          )}
          <FileUpload
            label="Insurance Certificate (Optional)"
            accept="image/*,application/pdf"
            onFileChange={(file) => setVerificationDetails(prev => ({ ...prev, insuranceCertificate: file }))}
          />
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: '#e8f4f8', borderLeft: `4px solid ${palette.primary}` }}>
        <p className="text-sm" style={{ color: palette.text }}>
          <strong>Why verify?</strong> Verified owners receive a trust badge, appear higher in search results, 
          and drivers are 3x more likely to rent from verified owners.
        </p>
      </div>

      <hr className="my-4" style={{ borderColor: palette.border }} />

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={verificationDetails.termsAccepted}
            onChange={(e) => setVerificationDetails(prev => ({ ...prev, termsAccepted: e.target.checked }))}
          />
          <span className="text-sm" style={{ color: palette.text }}>
            I accept the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>
            {!verificationDetails.termsAccepted && errors.termsAccepted && (
              <span className="block text-xs" style={{ color: palette.danger }}>{errors.termsAccepted}</span>
            )}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={verificationDetails.dataProcessingConsent}
            onChange={(e) => setVerificationDetails(prev => ({ ...prev, dataProcessingConsent: e.target.checked }))}
          />
          <span className="text-sm" style={{ color: palette.text }}>
            I consent to the processing of my personal data as outlined in the <strong>Data Protection Act (2019)</strong>
            {!verificationDetails.dataProcessingConsent && errors.dataProcessingConsent && (
              <span className="block text-xs" style={{ color: palette.danger }}>{errors.dataProcessingConsent}</span>
            )}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={verificationDetails.marketingConsent}
            onChange={(e) => setVerificationDetails(prev => ({ ...prev, marketingConsent: e.target.checked }))}
          />
          <span className="text-sm" style={{ color: palette.text }}>
            I would like to receive marketing communications about new features and promotions (optional)
          </span>
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Choose Your Plan</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>Select the subscription that works for your business</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Free Plan */}
        <div
          className={`cursor-pointer rounded-xl border-2 p-4 transition ${
            subscription.plan === 'free' ? 'border-primary' : ''
          }`}
          style={{
            borderColor: subscription.plan === 'free' ? palette.primary : palette.border,
            backgroundColor: palette.card,
          }}
          onClick={() => setSubscription(prev => ({ ...prev, plan: 'free' }))}
        >
          <div className="mb-2 flex items-center justify-between">
            <h4 className="font-bold" style={{ color: palette.text }}>Free</h4>
            <span className="text-2xl font-bold" style={{ color: palette.text }}>$0</span>
          </div>
          <p className="mb-3 text-sm" style={{ color: palette.textSecondary }}>Per month</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Basic driver search
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> View last 10 driver ratings
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Submit 3 reviews per month
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Static safety heatmap
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.textSecondary }} /> ❌ AI hiring assistant
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.textSecondary }} /> ❌ Verified owner badge
            </li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div
          className={`cursor-pointer rounded-xl border-2 p-4 transition ${
            subscription.plan === 'premium' ? 'border-primary' : ''
          }`}
          style={{
            borderColor: subscription.plan === 'premium' ? palette.primary : palette.border,
            backgroundColor: palette.card,
          }}
          onClick={() => setSubscription(prev => ({ ...prev, plan: 'premium' }))}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold" style={{ color: palette.text }}>Owner Premium</h4>
              <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: palette.accent, color: 'white' }}>
                RECOMMENDED
              </span>
            </div>
            <span className="text-2xl font-bold" style={{ color: palette.text }}>$10</span>
          </div>
          <p className="mb-3 text-sm" style={{ color: palette.textSecondary }}>Per month</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Unlimited driver searches
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> View complete driver history
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Monitor & respond to reviews
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> AI hiring assistant
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Verified owner badge
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Bulk driver search
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Priority support
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormSelect
          label="Billing Cycle"
          value={subscription.billingCycle}
          onChange={(e) => setSubscription(prev => ({ ...prev, billingCycle: e.target.value }))}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly (Save 20%)</option>
        </FormSelect>

        <FormSelect
          label="Payment Method"
          value={subscription.paymentMethod}
          onChange={(e) => setSubscription(prev => ({ ...prev, paymentMethod: e.target.value }))}
        >
          <option value="">Select payment method</option>
          <option value="mpesa">M-Pesa</option>
          <option value="card">Credit/Debit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
        </FormSelect>
      </div>

      {subscription.billingCycle === 'yearly' && subscription.plan === 'premium' && (
        <div className="rounded-lg p-4" style={{ backgroundColor: '#e6f7e6', borderLeft: `4px solid ${palette.success}` }}>
          <p className="text-sm" style={{ color: palette.text }}>
            <strong>🎉 You save $24/year!</strong> Yearly premium plan costs $96/year instead of $120.
          </p>
        </div>
      )}

      <div className="rounded-lg p-4" style={{ backgroundColor: '#fff8e7', borderLeft: `4px solid ${palette.warning}` }}>
        <p className="text-sm flex items-start gap-2" style={{ color: palette.text }}>
          <AlertCircle size={16} style={{ color: palette.warning, marginTop: 2 }} />
          <span>
            <strong>Free trial available:</strong> Your first 14 days are completely free on the Premium plan. 
            Cancel anytime.
          </span>
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.bg }}>
      <div className="mx-auto w-fulll  py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition hover:opacity-80"
            style={{ color: palette.textSecondary }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: palette.primary }}>
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: palette.text }}>Register Vehicle Owner</h1>
              <p className="text-sm" style={{ color: palette.textSecondary }}>
                {ownerType ? (
                  <>
                    Registering as <strong style={{ color: palette.primary }}>{ownerType === 'individual' ? 'Individual' : 'Company'}</strong>
                    {' · '}
                    <button
                      type="button"
                      onClick={() => { setOwnerType(null); setCurrentStep(1); setErrors({}); }}
                      className="underline transition hover:opacity-80"
                      style={{ color: palette.primary }}
                    >
                      Change type
                    </button>
                  </>
                ) : (
                  'Add a new vehicle owner to the platform'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Owner Type Selector — shown before the wizard */}
        {!ownerType && (
          <div className="rounded-2xl border p-8" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mx-auto max-w-xl text-center">
              <h3 className="mb-2 text-xl font-bold" style={{ color: palette.text }}>What type of owner are you registering?</h3>
              <p className="mb-8 text-sm" style={{ color: palette.textSecondary }}>
                This determines the information we collect in Step 1
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => { setOwnerType('individual'); setBusinessDetails(prev => ({ ...prev, businessType: 'individual' })); }}
                  className="group flex flex-col items-center gap-4 rounded-2xl border-2 p-8 transition hover:shadow-lg"
                  style={{ borderColor: palette.border, backgroundColor: palette.bg }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = palette.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = palette.border; }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${palette.primary}15` }}>
                    <User size={28} style={{ color: palette.primary }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: palette.text }}>Individual</div>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: palette.textSecondary }}>
                      A single person who owns one or more vehicles and wants to register on the platform
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setOwnerType('company'); setBusinessDetails(prev => ({ ...prev, businessType: 'limited_company' })); }}
                  className="group flex flex-col items-center gap-4 rounded-2xl border-2 p-8 transition hover:shadow-lg"
                  style={{ borderColor: palette.border, backgroundColor: palette.bg }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = palette.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = palette.border; }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: `${palette.accent}15` }}>
                    <Building size={28} style={{ color: palette.accent }} />
                  </div>
                  <div>
                    <div className="text-lg font-bold" style={{ color: palette.text }}>Company</div>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: palette.textSecondary }}>
                      A registered business entity — limited company, partnership, sacco, or fleet management company
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wizard — shown after type is selected */}
        {ownerType && (
          <>
        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: palette.card, borderColor: palette.border }}
          >
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className={`inline-flex items-center gap-2 rounded-xl border px-6 py-2.5 text-sm font-semibold transition hover:opacity-80 ${
                currentStep === 1 ? 'invisible' : ''
              }`}
              style={{ borderColor: palette.border, color: palette.text }}
            >
              <ChevronLeft size={16} /> Back
            </button>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/vehicle-owners')}
                className="rounded-xl border px-6 py-2.5 text-sm font-semibold transition hover:opacity-80"
                style={{ borderColor: palette.border, color: palette.text }}
              >
                Cancel
              </button>
              
              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: palette.primary }}
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: palette.success }}
                >
                  <Plus size={16} /> Register Owner
                </button>
              )}
            </div>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  );
}