import React from 'react';
import { Star, MapPin, Phone, Mail, Eye } from 'lucide-react';
import { Vendor } from '../../types';

interface VendorCardProps {
  vendor: Vendor;
  onViewDetails: (vendor: Vendor) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onViewDetails }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      catering: 'bg-orange-100 text-orange-700',
      venue: 'bg-blue-100 text-blue-700',
      photography: 'bg-purple-100 text-purple-700',
      decoration: 'bg-pink-100 text-pink-700',
      dj: 'bg-yellow-100 text-yellow-700',
      transport: 'bg-green-100 text-green-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getPriceRangeColor = (range: string) => {
    const colors = {
      budget: 'text-green-600',
      'mid-range': 'text-yellow-600',
      premium: 'text-red-600'
    };
    return colors[range as keyof typeof colors] || 'text-gray-600';
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Vendor Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(vendor.category)}`}>
            {vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
          <span className={`font-bold text-sm ${getPriceRangeColor(vendor.priceRange)}`}>
            {vendor.priceRange.charAt(0).toUpperCase() + vendor.priceRange.slice(1)}
          </span>
        </div>
      </div>

      {/* Vendor Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {vendor.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vendor.description}
        </p>

        {/* Rating and Location */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(vendor.rating)}
            <span className="text-sm text-gray-600 ml-1">
              {vendor.rating} ({vendor.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
          <span>{vendor.city}</span>
        </div>

        {/* Services */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-1">
            {vendor.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                {service}
              </span>
            ))}
            {vendor.services.length > 3 && (
              <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-md">
                +{vendor.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Contact and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm">
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
            <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
          </div>
          
          <button
            onClick={() => onViewDetails(vendor)}
            className="flex items-center space-x-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;