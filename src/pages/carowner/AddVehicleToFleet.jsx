import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowLeft, Plus, Check, ChevronRight, ChevronLeft, Upload, Shield, FileText, Camera, Building, CreditCard } from 'lucide-react';

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
  { id: 1, name: 'Account & Owner', icon: Shield },
  { id: 2, name: 'Vehicle Details', icon: Car },
  { id: 3, name: 'Verification', icon: Check },
  { id: 4, name: 'Subscription', icon: CreditCard },
];

function FormInput({ label, required, error, icon: Icon, ...props }) {
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

function FormTextArea({ label, required, error, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>
        {label} {required && <span style={{ color: palette.danger }}>*</span>}
      </label>
      <textarea
        className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
        style={{
          backgroundColor: palette.bg,
          borderColor: error ? palette.danger : palette.border,
          color: palette.text,
          '--tw-ring-color': palette.primary,
        }}
        rows={3}
        {...props}
      />
      {error && <p className="mt-1 text-xs" style={{ color: palette.danger }}>{error}</p>}
    </div>
  );
}

function FileUpload({ label, onFileChange, accept = "image/*" }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  return (
    <div>
      <label className="mb-1 block text-xs font-semibold" style={{ color: palette.textSecondary }}>{label}</label>
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition hover:opacity-80"
        style={{ borderColor: palette.border, backgroundColor: palette.bg }}
        onClick={() => document.getElementById(`upload-${label}`).click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="h-24 w-24 rounded-lg object-cover" />
        ) : (
          <>
            <Upload size={24} style={{ color: palette.textSecondary }} />
            <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Click to upload</p>
          </>
        )}
        <input
          id={`upload-${label}`}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default function AddVehicleToFleet() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Step 1: Account & Owner Details
  const [ownerDetails, setOwnerDetails] = useState({
    phone: '',
    fullName: '',
    email: '',
    userType: 'owner',
    businessRegNumber: '',
    saccoAffiliation: '',
  });

  // Step 2: Vehicle Details
  const [vehicleDetails, setVehicleDetails] = useState({
    plate: '',
    make: '',
    model: '',
    year: '',
    color: '',
    vin: '',
    mileage: '',
    insuranceExpiry: '',
    lastMaintenance: '',
    nextMaintenance: '',
    depositAmount: '',
    rentalTerms: '',
    vehiclePhoto: null,
  });

  // Step 3: Verification (optional)
  const [verificationDetails, setVerificationDetails] = useState({
    businessRegNumber: '',
    saccoAffiliation: '',
    proofOfOwnership: null,
  });

  // Step 4: Subscription
  const [subscription, setSubscription] = useState({
    plan: 'free',
  });

  const handleOwnerChange = (field, value) => {
    setOwnerDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleVehicleChange = (field, value) => {
    setVehicleDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!ownerDetails.phone) newErrors.phone = 'Phone number is required';
    if (!ownerDetails.fullName) newErrors.fullName = 'Full name is required';
    if (ownerDetails.phone && !/^\+?[0-9]{10,15}$/.test(ownerDetails.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!vehicleDetails.plate) newErrors.plate = 'License plate is required';
    if (!vehicleDetails.make) newErrors.make = 'Make is required';
    if (!vehicleDetails.model) newErrors.model = 'Model is required';
    if (!vehicleDetails.year) newErrors.year = 'Year is required';
    if (vehicleDetails.year && (vehicleDetails.year < 1900 || vehicleDetails.year > new Date().getFullYear() + 1)) {
      newErrors.year = 'Enter a valid year';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
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
    
    // Final validation
    if (!validateStep1() || !validateStep2()) {
      setCurrentStep(1);
      return;
    }

    // Prepare payload for API
    const payload = {
      owner: {
        phone: ownerDetails.phone,
        full_name: ownerDetails.fullName,
        email: ownerDetails.email,
        user_type: ownerDetails.userType,
        business_reg_number: verificationDetails.businessRegNumber || ownerDetails.businessRegNumber,
        sacco_affiliation: verificationDetails.saccoAffiliation || ownerDetails.saccoAffiliation,
      },
      vehicle: {
        plate: vehicleDetails.plate.toUpperCase(),
        make: vehicleDetails.make,
        model: vehicleDetails.model,
        year: parseInt(vehicleDetails.year),
        color: vehicleDetails.color,
        vin: vehicleDetails.vin,
        mileage: vehicleDetails.mileage ? parseInt(vehicleDetails.mileage) : null,
        insurance_expiry: vehicleDetails.insuranceExpiry,
        last_maintenance: vehicleDetails.lastMaintenance,
        next_maintenance: vehicleDetails.nextMaintenance,
        deposit_amount: vehicleDetails.depositAmount ? parseFloat(vehicleDetails.depositAmount) : null,
        rental_terms: vehicleDetails.rentalTerms,
      },
      subscription_plan: subscription.plan,
    };

    console.log('Submitting:', payload);
    
    // TODO: Wire to actual API
    // const response = await api.post('/vehicles', payload);
    
    navigate('/fleet-management');
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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Owner Information</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>Your contact and business details</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="Phone Number"
          required
          type="tel"
          placeholder="+2547XXXXXXXX"
          value={ownerDetails.phone}
          onChange={(e) => handleOwnerChange('phone', e.target.value)}
          error={errors.phone}
          icon={Shield}
        />
        <FormInput
          label="Full Name"
          required
          placeholder="e.g. John Mwangi"
          value={ownerDetails.fullName}
          onChange={(e) => handleOwnerChange('fullName', e.target.value)}
          error={errors.fullName}
        />
        <FormInput
          label="Email (Optional)"
          type="email"
          placeholder="john@example.com"
          value={ownerDetails.email}
          onChange={(e) => handleOwnerChange('email', e.target.value)}
        />
        <FormSelect
          label="User Type"
          value={ownerDetails.userType}
          onChange={(e) => handleOwnerChange('userType', e.target.value)}
        >
          <option value="owner">Car Owner</option>
          <option value="fleet_manager">Fleet Manager</option>
          <option value="agency">Rental Agency</option>
        </FormSelect>
      </div>

      <div className="rounded-lg border p-4" style={{ borderColor: palette.border }}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: palette.textSecondary }}>
          Optional Verification Info
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Business Registration Number"
            placeholder="e.g. PVT-2024-12345"
            value={ownerDetails.businessRegNumber}
            onChange={(e) => handleOwnerChange('businessRegNumber', e.target.value)}
          />
          <FormInput
            label="Sacco / Fleet Affiliation"
            placeholder="e.g. Nairobi Sacco"
            value={ownerDetails.saccoAffiliation}
            onChange={(e) => handleOwnerChange('saccoAffiliation', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Vehicle Registration</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>Complete all required vehicle details</p>
      </div>

      {/* Vehicle Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="License Plate *"
          required
          placeholder="e.g. KCD 456M"
          value={vehicleDetails.plate}
          onChange={(e) => handleVehicleChange('plate', e.target.value)}
          error={errors.plate}
          icon={Car}
        />
        <FormInput
          label="Make *"
          required
          placeholder="e.g. Toyota"
          value={vehicleDetails.make}
          onChange={(e) => handleVehicleChange('make', e.target.value)}
          error={errors.make}
        />
        <FormInput
          label="Model *"
          required
          placeholder="e.g. Premio"
          value={vehicleDetails.model}
          onChange={(e) => handleVehicleChange('model', e.target.value)}
          error={errors.model}
        />
        <FormInput
          label="Year *"
          required
          type="number"
          placeholder="e.g. 2022"
          value={vehicleDetails.year}
          onChange={(e) => handleVehicleChange('year', e.target.value)}
          error={errors.year}
        />
        <FormInput
          label="Color"
          placeholder="e.g. White, Silver"
          value={vehicleDetails.color}
          onChange={(e) => handleVehicleChange('color', e.target.value)}
        />
        <FormInput
          label="VIN (Vehicle Identification Number)"
          placeholder="e.g. JTDBE32KX0000000"
          value={vehicleDetails.vin}
          onChange={(e) => handleVehicleChange('vin', e.target.value)}
        />
        <FormInput
          label="Initial Mileage (km)"
          type="number"
          placeholder="e.g. 45000"
          value={vehicleDetails.mileage}
          onChange={(e) => handleVehicleChange('mileage', e.target.value)}
        />
      </div>

      {/* Vehicle Photo Upload */}
      <div>
        <FileUpload
          label="Vehicle Photo"
          onFileChange={(file) => handleVehicleChange('vehiclePhoto', file)}
        />
      </div>

      <hr className="my-4" style={{ borderColor: palette.border }} />

      {/* Maintenance & Insurance */}
      <div>
        <h4 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>Maintenance & Insurance</h4>
        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            label="Insurance Expiry"
            type="date"
            value={vehicleDetails.insuranceExpiry}
            onChange={(e) => handleVehicleChange('insuranceExpiry', e.target.value)}
          />
          <FormInput
            label="Last Maintenance"
            type="date"
            value={vehicleDetails.lastMaintenance}
            onChange={(e) => handleVehicleChange('lastMaintenance', e.target.value)}
          />
          <FormInput
            label="Next Maintenance Due"
            type="date"
            value={vehicleDetails.nextMaintenance}
            onChange={(e) => handleVehicleChange('nextMaintenance', e.target.value)}
          />
        </div>
      </div>

      <hr className="my-4" style={{ borderColor: palette.border }} />

      {/* Rental Terms */}
      <div>
        <h4 className="mb-3 text-sm font-semibold" style={{ color: palette.text }}>Rental Terms (for driver visibility)</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Typical Deposit Amount (KES)"
            type="number"
            placeholder="e.g. 10000"
            value={vehicleDetails.depositAmount}
            onChange={(e) => handleVehicleChange('depositAmount', e.target.value)}
          />
          <FormInput
            label="Insurance Validity Date"
            type="date"
            value={vehicleDetails.insuranceExpiry}
            onChange={(e) => handleVehicleChange('insuranceExpiry', e.target.value)}
          />
        </div>
        <div className="mt-3">
          <FormTextArea
            label="Rental Terms & Conditions"
            placeholder="e.g. Late return policy, fuel requirements, mileage limits, etc."
            value={vehicleDetails.rentalTerms}
            onChange={(e) => handleVehicleChange('rentalTerms', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Verification (Optional)</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>
          Verified owners get a badge and appear higher in search results
        </p>
      </div>

      <div className="rounded-lg border p-4" style={{ backgroundColor: palette.bg, borderColor: palette.border }}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            label="Business Registration Number"
            placeholder="e.g. PVT-2024-12345"
            value={verificationDetails.businessRegNumber}
            onChange={(e) => setVerificationDetails(prev => ({ ...prev, businessRegNumber: e.target.value }))}
          />
          <FormInput
            label="Sacco / Fleet Affiliation"
            placeholder="e.g. Nairobi Sacco"
            value={verificationDetails.saccoAffiliation}
            onChange={(e) => setVerificationDetails(prev => ({ ...prev, saccoAffiliation: e.target.value }))}
          />
        </div>
        <div className="mt-4">
          <FileUpload
            label="Proof of Ownership (Logbook or Registration)"
            accept="image/*,application/pdf"
            onFileChange={(file) => setVerificationDetails(prev => ({ ...prev, proofOfOwnership: file }))}
          />
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: '#e8f4f8', borderLeft: `4px solid ${palette.primary}` }}>
        <p className="text-sm" style={{ color: palette.text }}>
          <strong>Why verify?</strong> Verified owners get a trust badge, appear higher in search results, and drivers are more likely to rent from you.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.text }}>Choose Your Plan</h3>
        <p className="text-sm" style={{ color: palette.textSecondary }}>Select the subscription that works for you</p>
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
          onClick={() => setSubscription({ plan: 'free' })}
        >
          <div className="mb-2 flex items-center justify-between">
            <h4 className="font-bold" style={{ color: palette.text }}>Free</h4>
            <span className="text-2xl font-bold" style={{ color: palette.text }}>$0</span>
          </div>
          <p className="mb-3 text-sm" style={{ color: palette.textSecondary }}>Per month</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Basic search
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Last 10 ratings visible
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> 3 reviews/month
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Static heatmap
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
          onClick={() => setSubscription({ plan: 'premium' })}
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
              <Check size={14} style={{ color: palette.success }} /> Monitor reviews
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Respond to driver reviews
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> AI hiring assistant
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Bulk driver search
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} style={{ color: palette.success }} /> Verified owner badge
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ backgroundColor: '#e6f7e6', borderLeft: `4px solid ${palette.success}` }}>
        <p className="text-sm" style={{ color: palette.text }}>
          <strong>💡 Tip:</strong> Premium owners get up to 3x more driver inquiries and verified badge trust.
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
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/fleet-management')}
            className="mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition hover:opacity-80"
            style={{ color: palette.textSecondary }}
          >
            <ArrowLeft size={16} /> Back to Fleet Management
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: palette.primary }}>
              <Car size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: palette.text }}>Register New Vehicle</h1>
              <p className="text-sm" style={{ color: palette.textSecondary }}>Add a vehicle to your fleet inventory</p>
            </div>
          </div>
        </div>

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
                onClick={() => navigate('/fleet-management')}
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
                  <Plus size={16} /> Add Vehicle
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}