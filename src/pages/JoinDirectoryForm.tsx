import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Upload } from 'lucide-react';

// Define TypeScript interfaces for our form data structure
interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: File | null;
  
  // Professional Information
  title: string;
  specialization: string;
  otherSpecialization: string;
  languages: {
    english: boolean;
    swahili: boolean;
    french: boolean;
    kinyarwanda: boolean;
    luganda: boolean;
    luo: boolean;
    other: boolean;
  };
  otherLanguage: string;
  
  // Location Information
  hospital: string;
  city: string;
  country: string;
  
  // Additional Information
  bio: string;
  education: string;
  certifications: string;
  acceptTerms: boolean;
}

// Interface for form errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  photo?: string;
  title?: string;
  specialization?: string;
  otherSpecialization?: string;
  languages?: string;
  otherLanguage?: string;
  hospital?: string;
  city?: string;
  country?: string;
  bio?: string;
  acceptTerms?: string;
  [key: string]: string | undefined;
}

const JoinDirectoryForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photo: null,
    
    // Professional Information
    title: '',
    specialization: '',
    otherSpecialization: '',
    languages: {
      english: false,
      swahili: false,
      french: false,
      kinyarwanda: false,
      luganda: false,
      luo: false,
      other: false
    },
    otherLanguage: '',
    
    // Location Information
    hospital: '',
    city: '',
    country: '',
    
    // Additional Information
    bio: '',
    education: '',
    certifications: '',
    acceptTerms: false
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const specializations = [
    'Epilepsy',
    'Neurodevelopmental Disorders',
    'Autism Spectrum Disorders',
    'Movement Disorders',
    'ADHD',
    'Other'
  ];
  
  const countries = [
    'Kenya',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Burundi',
    'Ethiopia',
    'South Sudan'
  ];

  // Improved phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^\+?[\d\s-]{10,15}$/;
    return regex.test(phone);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      const { checked } = target;
      
      if (name.startsWith('languages.')) {
        const language = name.split('.')[1];
        setFormData({
          ...formData,
          languages: {
            ...formData.languages,
            [language]: checked
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked
        });
      }
    } else if (type === 'file') {
      const target = e.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;
      if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
        setFormErrors({
          ...formErrors,
          photo: 'File size must be less than 10MB'
        });
      } else {
        setFormData({
          ...formData,
          [name]: file
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };
  
  const validateStep = (step: number): FormErrors => {
    const errors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhoneNumber(formData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
      if (formData.photo && formData.photo.size > 10 * 1024 * 1024) {
        errors.photo = 'File size must be less than 10MB';
      }
    } else if (step === 2) {
      if (!formData.title.trim()) errors.title = 'Professional title is required';
      if (!formData.specialization) errors.specialization = 'Specialization is required';
      if (formData.specialization === 'Other' && !formData.otherSpecialization.trim()) {
        errors.otherSpecialization = 'Please specify your specialization';
      }
      
      const hasSelectedLanguage = Object.values(formData.languages).some(value => value === true);
      if (!hasSelectedLanguage) {
        errors.languages = 'Please select at least one language';
      }
      
      if (formData.languages.other && !formData.otherLanguage.trim()) {
        errors.otherLanguage = 'Please specify the other language';
      }
    } else if (step === 3) {
      if (!formData.hospital.trim()) errors.hospital = 'Hospital/Institution is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.country) errors.country = 'Country is required';
    } else if (step === 4) {
      if (!formData.bio.trim()) errors.bio = 'Professional bio is required';
      if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    return errors;
  };
  
  const handleNext = (): void => {
    const errors = validateStep(step);
    
    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormErrors(errors);
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  const handleBack = (): void => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const errors = validateStep(step);
    
    if (Object.keys(errors).length === 0) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Submission error:', error);
        // You could show an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
      setIsSubmitting(false);
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderStepIndicator = (): JSX.Element => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center relative flex-1">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  stepNumber < step 
                    ? 'bg-green-500 text-white' 
                    : stepNumber === step 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber < step ? <CheckCircle className="h-5 w-5" /> : stepNumber}
              </div>
              <div className="text-xs mt-2 font-medium text-gray-600 text-center">
                {stepNumber === 1 && 'Personal'}
                {stepNumber === 2 && 'Professional'}
                {stepNumber === 3 && 'Location'}
                {stepNumber === 4 && 'Additional'}
              </div>
              
              {/* Connector line */}
              {stepNumber < 4 && (
                <div className="absolute w-full h-0.5 bg-gray-300 top-5 left-1/2 -translate-x-1/2" style={{ zIndex: -1 }}>
                  <div 
                    className="h-full bg-primary-600 transition-all duration-300" 
                    style={{ width: step > stepNumber ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPersonalInfoForm = (): JSX.Element => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary-800">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+xxx xxx xxx xxx"
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo
            {formErrors.photo && (
              <span className="text-red-500 ml-1">* {formErrors.photo}</span>
            )}
          </label>
          <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
            formData.photo ? 'border-primary-300 bg-primary-50' : 'border-gray-300'
          }`}>
            {formData.photo ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-sm font-medium text-gray-900">File uploaded: {formData.photo.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(formData.photo.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, photo: null})}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label
                    htmlFor="photo"
                    className="cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-700"
                  >
                    <span>Upload a file</span>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProfessionalInfoForm = (): JSX.Element => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary-800">Professional Information</h3>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Pediatric Neurologist, Developmental Pediatrician"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
              formErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.title && (
            <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Area of Specialization <span className="text-red-500">*</span>
          </label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
              formErrors.specialization ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
          {formErrors.specialization && (
            <p className="mt-1 text-sm text-red-500">{formErrors.specialization}</p>
          )}
        </div>
        
        {formData.specialization === 'Other' && (
          <div>
            <label htmlFor="otherSpecialization" className="block text-sm font-medium text-gray-700 mb-1">
              Other Specialization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="otherSpecialization"
              name="otherSpecialization"
              value={formData.otherSpecialization}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.otherSpecialization ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.otherSpecialization && (
              <p className="mt-1 text-sm text-red-500">{formErrors.otherSpecialization}</p>
            )}
          </div>
        )}
        
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3">
            Languages Spoken <span className="text-red-500">*</span>
            {formErrors.languages && (
              <span className="text-red-500 ml-2">{formErrors.languages}</span>
            )}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.english"
                name="languages.english"
                checked={formData.languages.english}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.english" className="ml-2 block text-sm text-gray-700">
                English
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.swahili"
                name="languages.swahili"
                checked={formData.languages.swahili}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.swahili" className="ml-2 block text-sm text-gray-700">
                Swahili
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.french"
                name="languages.french"
                checked={formData.languages.french}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.french" className="ml-2 block text-sm text-gray-700">
                French
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.kinyarwanda"
                name="languages.kinyarwanda"
                checked={formData.languages.kinyarwanda}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.kinyarwanda" className="ml-2 block text-sm text-gray-700">
                Kinyarwanda
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.luganda"
                name="languages.luganda"
                checked={formData.languages.luganda}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.luganda" className="ml-2 block text-sm text-gray-700">
                Luganda
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.luo"
                name="languages.luo"
                checked={formData.languages.luo}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.luo" className="ml-2 block text-sm text-gray-700">
                Luo
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="languages.other"
                name="languages.other"
                checked={formData.languages.other}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="languages.other" className="ml-2 block text-sm text-gray-700">
                Other
              </label>
            </div>
          </div>
        </div>
        
        {formData.languages.other && (
          <div>
            <label htmlFor="otherLanguage" className="block text-sm font-medium text-gray-700 mb-1">
              Other Language <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="otherLanguage"
              name="otherLanguage"
              value={formData.otherLanguage}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.otherLanguage ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.otherLanguage && (
              <p className="mt-1 text-sm text-red-500">{formErrors.otherLanguage}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderLocationInfoForm = (): JSX.Element => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary-800">Location Information</h3>
        
        <div>
          <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
            Hospital/Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
              formErrors.hospital ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.hospital && (
            <p className="mt-1 text-sm text-red-500">{formErrors.hospital}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.city && (
              <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
                formErrors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
            {formErrors.country && (
              <p className="mt-1 text-sm text-red-500">{formErrors.country}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAdditionalInfoForm = (): JSX.Element => {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-primary-800">Additional Information</h3>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Please provide a brief professional biography"
            className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${
              formErrors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {formErrors.bio && (
            <p className="mt-1 text-sm text-red-500">{formErrors.bio}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            This bio will be displayed on your profile page. Include your experience, approach to patient care, and areas of interest.
          </p>
        </div>
        
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
            Education
          </label>
          <textarea
            id="education"
            name="education"
            rows={3}
            value={formData.education}
            onChange={handleChange}
            placeholder="List your educational background and qualifications"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          <textarea
            id="certifications"
            name="certifications"
            rows={3}
            value={formData.certifications}
            onChange={handleChange}
            placeholder="List any relevant certifications or professional memberships"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500"
          ></textarea>
        </div>
        
        <div className="flex items-start mt-6">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="font-medium text-gray-700">
              Terms and Conditions <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500">
              I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>. I confirm that all the information provided is accurate and up-to-date.
            </p>
            {formErrors.acceptTerms && (
              <p className="mt-1 text-sm text-red-500">{formErrors.acceptTerms}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSuccessMessage = (): JSX.Element => {
    return (
      <motion.div 
        className="text-center py-12"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Registration Successful!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Thank you for joining our specialist directory. Our team will review your submission and contact you shortly.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Homepage
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-700 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/600')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative py-16 lg:py-20">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Join Our Specialist Directory
          </motion.h1>
          
          <motion.p 
            className="text-lg max-w-2xl mb-8 text-white/90"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Connect with patients and colleagues across East Africa by becoming part of our growing network of pediatric neurology specialists.
          </motion.p>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            {isSubmitted ? (
              renderSuccessMessage()
            ) : (
              <form onSubmit={handleSubmit}>
                {renderStepIndicator()}
                
                <div className="mt-8">
                  {step === 1 && renderPersonalInfoForm()}
                  {step === 2 && renderProfessionalInfoForm()}
                  {step === 3 && renderLocationInfoForm()}
                  {step === 4 && renderAdditionalInfoForm()}
                </div>
                
                <div className="mt-10 flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Benefits of Joining Our Directory</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Becoming part of our specialist network connects you with patients and colleagues across East Africa, enhancing your professional visibility and impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Enhanced Visibility</h3>
              <p className="text-gray-600">
                Make your practice more visible to patients searching for specialists in your area of expertise. Our directory is a trusted resource for families seeking neurological care.
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Professional Networking</h3>
              <p className="text-gray-600">
                Connect with other specialists for consultations, referrals, and collaboration opportunities. Build relationships with colleagues across East Africa.
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Educational Resources</h3>
              <p className="text-gray-600">
                Access exclusive educational content, webinars, and training opportunities. Stay updated with the latest developments in pediatric neurology.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinDirectoryForm;