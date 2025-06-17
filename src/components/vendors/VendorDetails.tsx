import React, { useState } from 'react';
import { 
  Star, MapPin, Phone, Mail, Globe, Clock, Shield, Award, 
  ArrowLeft, Heart, Share2, MessageCircle, Calendar, 
  CheckCircle, Users, Camera, Facebook, Instagram, 
  DollarSign, Package, Truck, CreditCard
} from 'lucide-react';
import { Vendor, VendorReview } from '../../types';
import { mockVendorReviews } from '../../data/mockData';

interface VendorDetailsProps {
  vendor: Vendor;
  onBack: () => void;
  onContactVendor: (vendor: Vendor) => void;
}

const VendorDetails: React.FC<VendorDetailsProps> = ({ vendor, onBack, onContactVendor }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'contact'>('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = mockVendorReviews.filter(review => review.vendorId === vendor.id);

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

  const getCategoryIcon = (category: string) => {
    const icons = {
      catering: '🍽️',
      venue: '🏛️',
      photography: '📸',
      decoration: '🎨',
      dj: '🎵',
      transport: '🚗',
      planning: '📋',
      security: '🛡️'
    };
    return icons[category as keyof typeof icons] || '🎉';
  };

  const formatBusinessHours = () => {
    if (!vendor.businessHours) return 'Contact for hours';
    
    const today = new Date().toLocaleLowerCase().slice(0, 3) + 
                  new Date().toLocaleDateString('en-US', { weekday: 'long' }).slice(3);
    const todayHours = vendor.businessHours[today];
    
    if (!todayHours?.isOpen) return 'Closed today';
    return `Open today: ${todayHours.open} - ${todayHours.close}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vendor.name,
        text: vendor.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Vendor link copied to clipboard!');
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* About */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About {vendor.name}</h3>
        <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Services Offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vendor.services.map((service, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-800">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specializations */}
      {vendor.specializations && vendor.specializations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {vendor.specializations.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Service Areas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Areas</h3>
        <div className="flex flex-wrap gap-2">
          {vendor.serviceAreas.map((area, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              <MapPin className="w-3 h-3 mr-1" />
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {vendor.certifications && vendor.certifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications & Awards</h3>
          <div className="space-y-2">
            {vendor.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business Hours */}
      {vendor.businessHours && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(vendor.businessHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="capitalize font-medium text-gray-700">{day}</span>
                  <span className="text-gray-600">
                    {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Policies */}
      {vendor.cancellationPolicy && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellation Policy</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800">{vendor.cancellationPolicy}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderPortfolioTab = () => (
    <div className="space-y-6">
      {vendor.portfolio && vendor.portfolio.length > 0 ? (
        vendor.portfolio.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 mb-3">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Event Type</span>
                    <p className="font-medium text-gray-900">{item.eventType}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Completed</span>
                    <p className="font-medium text-gray-900">
                      {new Date(item.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                  {item.budget && (
                    <div className="col-span-2">
                      <span className="text-sm text-gray-500">Budget Range</span>
                      <p className="font-medium text-gray-900">{item.budget}</p>
                    </div>
                  )}
                </div>

                {item.clientTestimonial && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                    <p className="text-gray-700 italic">"{item.clientTestimonial}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Portfolio Items</h3>
          <p className="text-gray-500">This vendor hasn't added any portfolio items yet.</p>
        </div>
      )}
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{vendor.rating}</div>
            <div className="flex justify-center space-x-1 mb-2">
              {renderStars(vendor.rating)}
            </div>
            <div className="text-sm text-gray-600">{vendor.reviews} reviews</div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(r => Math.floor(r.rating) === stars).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {review.user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    {review.isVerified && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{review.comment}</p>
            
            {review.eventTitle && (
              <div className="text-sm text-gray-500 mb-3">
                Event: {review.eventTitle}
              </div>
            )}

            {review.response && (
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{vendor.name}</span>
                  <span className="text-sm text-gray-500">responded</span>
                </div>
                <p className="text-gray-700">{review.response.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
          </button>
        </div>
      )}
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <a href={`tel:${vendor.contact.phone}`} className="font-medium text-gray-900 hover:text-emerald-600">
                {vendor.contact.phone}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <a href={`mailto:${vendor.contact.email}`} className="font-medium text-gray-900 hover:text-emerald-600">
                {vendor.contact.email}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-sm text-gray-500">Address</div>
              <div className="font-medium text-gray-900">{vendor.contact.address}</div>
            </div>
          </div>

          {vendor.contact.website && (
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-gray-500">Website</div>
                <a 
                  href={vendor.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 hover:text-emerald-600"
                >
                  {vendor.contact.website}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      {vendor.socialLinks && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {vendor.socialLinks.facebook && (
              <a
                href={vendor.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            )}
            {vendor.socialLinks.instagram && (
              <a
                href={vendor.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
        <div className="flex flex-wrap gap-2">
          {vendor.paymentMethods.map((method, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm"
            >
              <CreditCard className="w-3 h-3 mr-1 text-gray-500" />
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">{vendor.completedEvents}</div>
          <div className="text-sm text-gray-600">Events Completed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{vendor.responseTime}</div>
          <div className="text-sm text-gray-600">Response Time</div>
        </div>
        {vendor.teamSize && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{vendor.teamSize}</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
        )}
        {vendor.establishedYear && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {new Date().getFullYear() - vendor.establishedYear}+
            </div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Vendors</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <img
                src={vendor.gallery[selectedImageIndex]}
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium">
                  {vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)}
                </span>
                {vendor.isVerified && (
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:scale-110 transition-all`}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 bg-white text-gray-600 rounded-full hover:scale-110 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {vendor.gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {vendor.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${vendor.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vendor Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getCategoryIcon(vendor.category)}</span>
                <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(vendor.rating)}
                  <span className="ml-1">{vendor.rating} ({vendor.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.city}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatBusinessHours()}</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'contact', label: 'Contact' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'portfolio' && renderPortfolioTab()}
              {activeTab === 'reviews' && renderReviewsTab()}
              {activeTab === 'contact' && renderContactTab()}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {vendor.priceRange.charAt(0).toUpperCase() + vendor.priceRange.slice(1)} Range
              </div>
              {vendor.minimumOrder && (
                <div className="text-sm text-gray-600">
                  Minimum order: Rs. {vendor.minimumOrder.toLocaleString()}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{vendor.completedEvents}</div>
                <div className="text-xs text-gray-600">Events</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{vendor.responseTime}</div>
                <div className="text-xs text-gray-600">Response</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onContactVendor(vendor)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Vendor</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${vendor.contact.phone}`}
                  className="flex items-center justify-center space-x-1 border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
                <a
                  href={`mailto:${vendor.contact.email}`}
                  className="flex items-center justify-center space-x-1 border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">{vendor.responseTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">
                    {new Date(vendor.joinedDate).getFullYear()}
                  </span>
                </div>
                {vendor.teamSize && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-medium">{vendor.teamSize} members</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Service Areas</h3>
            <div className="space-y-2">
              {vendor.serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;