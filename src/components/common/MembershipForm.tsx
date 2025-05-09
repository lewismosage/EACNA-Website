// components/membership/MembershipForm.tsx
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Card, { CardContent } from '../common/Card';
import Button from '../common/Button';

type FormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  nationality: string;
  countryOfResidence: string;
  email: string;
  phone: string;
  idNumber: string;
  membershipType: string;
  currentProfession: string;
  institution: string;
  workAddress: string;
  registrationNumber: string;
  highestDegree: string;
  university: string;
  certifyInfo: boolean;
  consentData: boolean;
  paymentMethod: string;
  password: string;
  confirmPassword: string;
};

const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  return {
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
  };
};

interface MembershipFormProps {
  onComplete: (data: FormData) => void;
}

const MembershipForm = ({ onComplete }: MembershipFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();
  
  const watchedPassword = useWatch({
    control,
    name: 'password',
    defaultValue: ''
  });
  
  const passwordStrength = validatePassword(watchedPassword);
  
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  
  const onSubmit = (data: FormData) => {
    onComplete(data);
    nextStep();
  };

  const renderFormStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">First Name</label>
                <input 
                  id="firstName"
                  type="text" 
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">First name is required</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="middleName">Middle Name</label>
                <input 
                  id="middleName"
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500"
                  {...register('middleName')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName"
                  type="text" 
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('lastName', { required: true })}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">Last name is required</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="male"
                      {...register('gender', { required: true })}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="female"
                      {...register('gender', { required: true })}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
                {errors.gender && <p className="mt-1 text-sm text-red-600">Gender is required</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nationality">Nationality</label>
                <select
                  id="nationality"
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.nationality ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('nationality', { required: true })}
                >
                  <option value="">Select nationality</option>
                  <option value="kenyan">Kenyan</option>
                  <option value="ugandan">Ugandan</option>
                  <option value="tanzanian">Tanzanian</option>
                  <option value="south_sudanese">South Sudanese</option>
                  <option value="rwandese">Rwandese</option>
                  <option value="burundian">Burundian</option>
                  <option value="ethiopian">Ethiopian</option>
                  <option value="somalian">Somalian</option>
                </select>
                {errors.nationality && <p className="mt-1 text-sm text-red-600">Nationality is required</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="countryOfResidence">Country of Residence</label>
                <select
                  id="countryOfResidence"
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.countryOfResidence ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('countryOfResidence', { required: true })}
                >
                  <option value="">Select country</option>
                  <option value="kenya">Kenya</option>
                  <option value="uganda">Uganda</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="burundi">Burundi</option>
                  <option value="south_sudan">South Sudan</option>
                  <option value="rwanda">Rwanda</option>
                  <option value="ethiopia">Ethiopia</option>
                  <option value="somalia">Somalia</option>
                </select>
                {errors.countryOfResidence && <p className="mt-1 text-sm text-red-600">Country of residence is required</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email" 
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('email', { 
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">
                  {errors.email.type === 'required' ? 'Email is required' : errors.email.message}
                </p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                <input 
                  id="phone"
                  type="tel" 
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('phone', { required: true })}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">Phone number is required</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="idNumber">ID Number</label>
                <input 
                  id="idNumber"
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500"
                  {...register('idNumber')}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('password', { 
                      required: true,
                      validate: (value) => validatePassword(value).isValid || "Password does not meet requirements"
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">
                  {errors.password.type === 'required' ? 'Password is required' : errors.password.message}
                </p>}
                
                {watchedPassword && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Password must contain:</p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-xs">
                        {passwordStrength.minLength ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-300 mr-1" />
                        )}
                        <span className={passwordStrength.minLength ? "text-green-600" : "text-gray-500"}>
                          At least 8 characters
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordStrength.hasUppercase ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-300 mr-1" />
                        )}
                        <span className={passwordStrength.hasUppercase ? "text-green-600" : "text-gray-500"}>
                          At least one uppercase letter
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordStrength.hasLowercase ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-300 mr-1" />
                        )}
                        <span className={passwordStrength.hasLowercase ? "text-green-600" : "text-gray-500"}>
                          At least one lowercase letter
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordStrength.hasNumber ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-300 mr-1" />
                        )}
                        <span className={passwordStrength.hasNumber ? "text-green-600" : "text-gray-500"}>
                          At least one number
                        </span>
                      </li>
                      <li className="flex items-center text-xs">
                        {passwordStrength.hasSpecialChar ? (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-gray-300 mr-1" />
                        )}
                        <span className={passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-500"}>
                          At least one special character
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                  <input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    {...register('confirmPassword', { 
                      required: true,
                      validate: value => value === watchedPassword || "Passwords do not match"
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message || "Confirm password is required"}
                </p>}
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={nextStep}>
                Continue to Professional Information
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="membershipType">Membership Category</label>
                <select
                id="membershipType"
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.membershipType ? 'border-red-500' : 'border-gray-300'}`}
                {...register('membershipType', { required: true })}
                >
                <option value="">Select membership type</option>
                <option value="ordinary">Ordinary Member</option>
                <option value="associate">Associate Member</option>
                <option value="student">Student Member</option>
                <option value="institutional">Institutional Member</option>
                <option value="honorary">Honorary Member</option>
                </select>
                {errors.membershipType && <p className="mt-1 text-sm text-red-600">Membership type is required</p>}
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currentProfession">Current Profession</label>
                <input 
                id="currentProfession"
                type="text" 
                placeholder="e.g., Paediatric Neurologist"
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.currentProfession ? 'border-red-500' : 'border-gray-300'}`}
                {...register('currentProfession', { required: true })}
                />
                {errors.currentProfession && <p className="mt-1 text-sm text-red-600">Current profession is required</p>}
            </div>
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="institution">Institution</label>
            <input 
                id="institution"
                type="text" 
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.institution ? 'border-red-500' : 'border-gray-300'}`}
                {...register('institution', { required: true })}
            />
            {errors.institution && <p className="mt-1 text-sm text-red-600">Institution is required</p>}
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="workAddress">Work Address</label>
            <textarea 
                id="workAddress"
                rows={3}
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.workAddress ? 'border-red-500' : 'border-gray-300'}`}
                {...register('workAddress', { required: true })}
            ></textarea>
            {errors.workAddress && <p className="mt-1 text-sm text-red-600">Work address is required</p>}
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="registrationNumber">Medical Registration/Licensure Number</label>
            <input 
                id="registrationNumber"
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500"
                {...register('registrationNumber')}
            />
            </div>
            
            <h3 className="text-xl font-semibold mb-4 pt-4">Educational Background</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="highestDegree">Highest Degree Earned</label>
                <input 
                id="highestDegree"
                type="text" 
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.highestDegree ? 'border-red-500' : 'border-gray-300'}`}
                {...register('highestDegree', { required: true })}
                />
                {errors.highestDegree && <p className="mt-1 text-sm text-red-600">Highest degree is required</p>}
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="university">University/Institution</label>
                <input 
                id="university"
                type="text" 
                className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary-200 focus:border-primary-500 ${errors.university ? 'border-red-500' : 'border-gray-300'}`}
                {...register('university', { required: true })}
                />
                {errors.university && <p className="mt-1 text-sm text-red-600">University is required</p>}
            </div>
            </div>
            
            <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>
                Back
            </Button>
            <Button onClick={nextStep}>
                Continue to Payment
            </Button>
            </div>
        </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Payment & Declaration</h3>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h4 className="font-medium mb-2">Membership Fee</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="full"
                      {...register('paymentMethod', { required: true })}
                    />
                    <span className="ml-2">Full Membership – $150</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="associate"
                      {...register('paymentMethod', { required: true })}
                    />
                    <span className="ml-2">Associate Membership – $100</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="student"
                      {...register('paymentMethod', { required: true })}
                    />
                    <span className="ml-2">Student Membership – $50</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="institutional"
                      {...register('paymentMethod', { required: true })}
                    />
                    <span className="ml-2">Institutional Membership – $500</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      value="honorary"
                      {...register('paymentMethod', { required: true })}
                    />
                    <span className="ml-2">Honorary Membership – Free</span>
                  </label>
                </div>
              </div>
              {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">Please select a membership type</p>}
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="flex flex-wrap gap-4">
                <label className="inline-flex items-center p-3 border rounded-md border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    value="bank"
                    {...register('paymentMethod')}
                  />
                  <span className="ml-2">Bank Transfer</span>
                </label>
                <label className="inline-flex items-center p-3 border rounded-md border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    value="mobile"
                    {...register('paymentMethod')}
                  />
                  <span className="ml-2">Mobile Money</span>
                </label>
                <label className="inline-flex items-center p-3 border rounded-md border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    value="online"
                    {...register('paymentMethod')}
                  />
                  <span className="ml-2">Online Payment</span>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium mb-2">Declaration & Consent</h4>
              <div className="space-y-3">
                <label className="inline-flex items-start">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('certifyInfo', { required: true })}
                  />
                  <span className="ml-2 text-gray-700">
                    I certify that the information provided is true and complete to the best of my knowledge.
                  </span>
                </label>
                {errors.certifyInfo && <p className="text-sm text-red-600">You must certify that the information is true</p>}
                
                <label className="inline-flex items-start">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('consentData', { required: true })}
                  />
                  <span className="ml-2 text-gray-700">
                    I consent to the use of my data for official communication and EACNA activities.
                  </span>
                </label>
                {errors.consentData && <p className="text-sm text-red-600">You must consent to data usage</p>}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                Submit Application
              </Button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-primary-800">Application Submitted!</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Thank you for applying to join EACNA. We'll review your application and contact you soon.
            </p>
            <Button variant="primary" to="/">
              Return Home
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-6 text-primary-800">EACNA Online Membership Application</h2>
        <p className="text-gray-600 mb-8">
          Please complete the form below. Fields marked with an asterisk (*) are required.
        </p>
        
        <div className="mb-8 overflow-hidden">
          <div className="flex mb-2">
            <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 1 ? 'border-primary-600' : 'border-gray-300'}`}>
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
                <span className="font-medium">Personal Info</span>
              </div>
            </div>
            <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 2 ? 'border-primary-600' : 'border-gray-300'}`}>
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
                <span className="font-medium">Professional Info</span>
              </div>
            </div>
            <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 3 ? 'border-primary-600' : 'border-gray-300'}`}>
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 ${currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</span>
                <span className="font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>
        
        <form>
          {renderFormStep()}
        </form>
      </CardContent>
    </Card>
  );
};

export default MembershipForm;