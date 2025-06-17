import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Building2, Camera, 
  Plus, X, DollarSign, Clock, Shield, Award,
  Facebook, Instagram, Globe, Save, ArrowLeft
} from 'lucide-react';

interface VendorRegistrationProps {
  onBack: () => void;
  onVendorCreated: () => void;
}

const VendorRegistration: React.FC<VendorRegistrationProps> = ({ onBack, onVendorCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    category: '',
    description: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    
    // Business Details
    establishedYear: '',
    teamSize: '',
    priceRange: '',
    minimumOrder: '',
    serviceAreas: [''],
    specializations: [''],
    certifications: [''],
    
    // Services & Portfolio
    services: [''],
    portfolio: [],
    
    // Business Hours
    businessHours: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '10:00', close: '16:00', isOpen: true },
      sunday: { open: '10:00', close: '16:00', isOpen: false }
    },
    
    // Social & Payment
    socialLinks: {
      facebook: '',
      instagram: '',
      website: ''
    },
    paymentMethods: [],
    cancellationPolicy: '',
    
    // Gallery
    gallery: ['']
  });

  const categories = [
    { value: 'catering', label: 'Catering', icon: '🍽️' },
    { value: 'venue', label: 'Venue', icon: '🏛️' },
    { value: 'photography', label: 'Photography', icon: '📸' },
    { value: 'decoration', label: 'Decoration', icon: '🎨' },
    { value: 'dj', label: 'DJ & Music', icon: '🎵' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'planning', label: 'Event Planning', icon: '📋' },
    { value: 'security', label: 'Security', icon: '🛡️' }
  ];

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Peshawar', 'Quetta'];
  const priceRanges = ['budget', 'mid-range', 'premium'];
  const paymentMethodOptions = ['Cash', 'Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cheque'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleBusinessHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value
        }
      }
    }));
  };

  const handleSocialLinksChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handlePaymentMethodToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Vendor registration data:', formData);
    onVendorCreated();
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Enter your business name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map(category => (
            <label
              key={category.value}
              className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.category === category.value
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={formData.category === category.value}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="sr-only"
              />
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-center">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Describe your business and services..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select city</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range *
          </label>
          <select
            value={formData.priceRange}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select price range</option>
            {priceRanges.map(range => (
              <option key={range} value={range}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Address *
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          required
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Enter complete business address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="+92-300-1234567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="business@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website (Optional)
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="https://yourbusiness.com"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
          </label>
          <input
            type="number"
            value={formData.establishedYear}
            onChange={(e) => handleInputChange('establishedYear', e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="2020"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Size
          </label>
          <input
            type="number"
            value={formData.teamSize}
            onChange={(e) => handleInputChange('teamSize', e.target.value)}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="10"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Order Amount (Rs.)
        </label>
        <input
          type="number"
          value={formData.minimumOrder}
          onChange={(e) => handleInputChange('minimumOrder', e.target.value)}
          min="0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="50000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Areas
        </label>
        {formData.serviceAreas.map((area, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={area}
              onChange={(e) => handleArrayChange('serviceAreas', index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter service area"
            />
            {formData.serviceAreas.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('serviceAreas', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('serviceAreas')}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service Area</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializations
        </label>
        {formData.specializations.map((spec, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={spec}
              onChange={(e) => handleArrayChange('specializations', index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter specialization"
            />
            {formData.specializations.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('specializations', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('specializations')}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Specialization</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications & Awards
        </label>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={cert}
              onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter certification or award"
            />
            {formData.certifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('certifications', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('certifications')}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Services & Hours</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Services Offered
        </label>
        {formData.services.map((service, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={service}
              onChange={(e) => handleArrayChange('services', index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter service"
            />
            {formData.services.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('services', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('services')}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Business Hours
        </label>
        <div className="space-y-3">
          {Object.entries(formData.businessHours).map(([day, hours]) => (
            <div key={day} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-20">
                <span className="capitalize font-medium text-gray-700">{day}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hours.isOpen}
                  onChange={(e) => handleBusinessHoursChange(day, 'isOpen', e.target.checked)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Open</span>
              </div>
              
              {hours.isOpen && (
                <>
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cancellation Policy
        </label>
        <textarea
          value={formData.cancellationPolicy}
          onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Describe your cancellation and refund policy..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accepted Payment Methods
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentMethodOptions.map(method => (
            <label
              key={method}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethods.includes(method)
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.paymentMethods.includes(method)}
                onChange={() => handlePaymentMethodToggle(method)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{method}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery & Social Links</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Gallery (Image URLs)
        </label>
        {formData.gallery.map((image, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="url"
              value={image}
              onChange={(e) => handleArrayChange('gallery', index, e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            {formData.gallery.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('gallery', index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('gallery')}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Social Media Links
        </label>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Facebook className="w-5 h-5 text-blue-600" />
            <input
              type="url"
              value={formData.socialLinks.facebook}
              onChange={(e) => handleSocialLinksChange('facebook', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://facebook.com/yourbusiness"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Instagram className="w-5 h-5 text-pink-600" />
            <input
              type="url"
              value={formData.socialLinks.instagram}
              onChange={(e) => handleSocialLinksChange('instagram', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://instagram.com/yourbusiness"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-600" />
            <input
              type="url"
              value={formData.socialLinks.website}
              onChange={(e) => handleSocialLinksChange('website', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://yourbusiness.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-2">Review Your Information</h4>
        <p className="text-sm text-amber-700">
          Please review all the information you've provided. Once submitted, your vendor profile will be reviewed by our team before being published.
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Registration</h1>
          <p className="text-gray-600">Join Eventistan as a trusted vendor</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Business Details'}
                  {step === 3 && 'Services & Hours'}
                  {step === 4 && 'Gallery & Social'}
                </span>
                {step < 4 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Submit Registration</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration;