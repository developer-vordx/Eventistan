import React, { useState } from 'react';
import { CreditCard, Users, ArrowLeft, Check } from 'lucide-react';
import { Event, PaymentMethod } from '../../types';
import { paymentMethods } from '../../data/mockData';

interface BookingFormProps {
  event: Event;
  onBack: () => void;
  onBookingComplete: (bookingId: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ event, onBack, onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    seats: 1,
    paymentMethod: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    paymentDetails: {
      jazzcash: { phone: '' },
      easypaisa: { phone: '' },
      wallet: { balance: 5000 }, // Mock wallet balance
      cash: { location: '' }
    }
  });

  const totalAmount = (event.price || 0) * bookingData.seats;
  const availableSeats = (event.availableSeats || event.capacity - event.attendees);

  const handleInputChange = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handlePaymentDetailsChange = (method: string, field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [method]: {
          ...prev.paymentDetails[method as keyof typeof prev.paymentDetails],
          [field]: value
        }
      }
    }));
  };

  const handleBooking = () => {
    // Simulate booking process
    const bookingId = `BK${Date.now()}`;
    setTimeout(() => {
      onBookingComplete(bookingId);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Tickets
        </label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleInputChange('seats', Math.max(1, bookingData.seats - 1))}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-xl font-semibold w-12 text-center">{bookingData.seats}</span>
          <button
            type="button"
            onClick={() => handleInputChange('seats', Math.min(availableSeats, bookingData.seats + 1))}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Maximum {availableSeats} tickets available
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Ticket Price</span>
            <span>Rs. {(event.price || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity</span>
            <span>{bookingData.seats}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>Rs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Contact Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={bookingData.contactInfo.name}
            onChange={(e) => handleContactInfoChange('name', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={bookingData.contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={bookingData.contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="+92-300-1234567"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
      
      <div className="space-y-3">
        {paymentMethods.filter(method => method.isActive).map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              bookingData.paymentMethod === method.type
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.type}
              checked={bookingData.paymentMethod === method.type}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-2xl">{method.icon}</span>
              <div>
                <div className="font-medium text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-600">{method.description}</div>
              </div>
            </div>
            {bookingData.paymentMethod === method.type && (
              <Check className="w-5 h-5 text-emerald-600" />
            )}
          </label>
        ))}
      </div>

      {/* Payment Method Specific Fields */}
      {bookingData.paymentMethod === 'jazzcash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            JazzCash Phone Number
          </label>
          <input
            type="tel"
            value={bookingData.paymentDetails.jazzcash.phone}
            onChange={(e) => handlePaymentDetailsChange('jazzcash', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="03XX-XXXXXXX"
          />
        </div>
      )}

      {bookingData.paymentMethod === 'easypaisa' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            EasyPaisa Phone Number
          </label>
          <input
            type="tel"
            value={bookingData.paymentDetails.easypaisa.phone}
            onChange={(e) => handlePaymentDetailsChange('easypaisa', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="03XX-XXXXXXX"
          />
        </div>
      )}

      {bookingData.paymentMethod === 'wallet' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-blue-900">Wallet Balance</span>
            <span className="text-lg font-bold text-blue-900">
              Rs. {bookingData.paymentDetails.wallet.balance.toLocaleString()}
            </span>
          </div>
          {totalAmount > bookingData.paymentDetails.wallet.balance && (
            <p className="text-red-600 text-sm mt-2">
              Insufficient balance. Please add funds to your wallet or choose another payment method.
            </p>
          )}
        </div>
      )}

      {bookingData.paymentMethod === 'cash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Payment Location
          </label>
          <select
            value={bookingData.paymentDetails.cash.location}
            onChange={(e) => handlePaymentDetailsChange('cash', 'location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select location</option>
            <option value="venue">At the venue</option>
            <option value="office">Eventistan office</option>
            <option value="delivery">Cash on delivery</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            You can pay cash at the selected location. Additional charges may apply for delivery.
          </p>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{event.title}</span>
            <span>Rs. {(event.price || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity</span>
            <span>{bookingData.seats} tickets</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>Rs. 0</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>Rs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const canProceedToPayment = () => {
    const hasContactInfo = bookingData.contactInfo.name && 
                          bookingData.contactInfo.email && 
                          bookingData.contactInfo.phone;
    return hasContactInfo && bookingData.seats > 0;
  };

  const canCompleteBooking = () => {
    if (!bookingData.paymentMethod) return false;
    
    switch (bookingData.paymentMethod) {
      case 'jazzcash':
        return bookingData.paymentDetails.jazzcash.phone;
      case 'easypaisa':
        return bookingData.paymentDetails.easypaisa.phone;
      case 'wallet':
        return totalAmount <= bookingData.paymentDetails.wallet.balance;
      case 'cash':
        return bookingData.paymentDetails.cash.location;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Event</span>
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Book Tickets</h1>
        <p className="text-gray-600">{event.title}</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2].map((step) => (
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
                {step === 1 ? 'Booking Details' : 'Payment'}
              </span>
              {step < 2 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
          </div>
          
          <div>
            {currentStep === 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToPayment()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBooking}
                disabled={!canCompleteBooking()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Complete Booking</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;