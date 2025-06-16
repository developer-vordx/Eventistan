import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Share2, Heart, ArrowLeft, Camera, Tag, Phone, Mail, CreditCard } from 'lucide-react';
import { Event } from '../../types';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onBookTicket: (event: Event) => void;
  onRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onBookTicket, onRSVP }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'maybe' | 'not-going' | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRSVP = (status: 'going' | 'maybe' | 'not-going') => {
    setRsvpStatus(status);
    onRSVP(event.id, status);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  const attendancePercentage = (event.attendees / event.capacity) * 100;
  const availableSeats = event.capacity - event.attendees;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Events</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <img
                src={event.gallery?.[selectedImageIndex] || event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
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
            {event.gallery && event.gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {event.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${event.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Event Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.city}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{event.venue}</h4>
                <p className="text-gray-600 mt-1">{event.address}</p>
                <p className="text-gray-600">{event.city}</p>
              </div>
            </div>

            {/* Amenities */}
            {event.amenities && event.amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {event.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {event.requirements && event.requirements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements & Guidelines</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <ul className="space-y-1">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="text-amber-800 text-sm">
                        • {requirement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Organizer</h3>
              <div className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {event.organizer.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.organizer.name}</h4>
                  <p className="text-gray-600 text-sm">{event.organizer.city}</p>
                </div>
                {event.contactInfo && (
                  <div className="flex space-x-2">
                    {event.contactInfo.phone && (
                      <a
                        href={`tel:${event.contactInfo.phone}`}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                    {event.contactInfo.email && (
                      <a
                        href={`mailto:${event.contactInfo.email}`}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
            {event.price ? (
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-emerald-600">
                  Rs. {event.price.toLocaleString()}
                </div>
                <div className="text-gray-600 text-sm">per ticket</div>
              </div>
            ) : (
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-emerald-600">Free</div>
                <div className="text-gray-600 text-sm">event</div>
              </div>
            )}

            {/* Attendance Info */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Attendance</span>
                <span>{event.attendees} / {event.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {availableSeats > 0 ? `${availableSeats} seats available` : 'Event is full'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {event.price ? (
                <button
                  onClick={() => onBookTicket(event)}
                  disabled={availableSeats === 0}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{availableSeats === 0 ? 'Sold Out' : 'Book Ticket'}</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 text-center">Will you attend this event?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { status: 'going', label: 'Going', color: 'emerald' },
                      { status: 'maybe', label: 'Maybe', color: 'yellow' },
                      { status: 'not-going', label: 'No', color: 'red' }
                    ].map(({ status, label, color }) => (
                      <button
                        key={status}
                        onClick={() => handleRSVP(status as any)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          rsvpStatus === status
                            ? `bg-${color}-600 text-white`
                            : `border border-${color}-300 text-${color}-600 hover:bg-${color}-50`
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Event Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{event.attendees}</div>
                  <div className="text-sm text-gray-600">Attending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(attendancePercentage)}%
                  </div>
                  <div className="text-sm text-gray-600">Capacity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Date & Time</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-600">{event.venue}, {event.city}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Capacity</div>
                  <div className="text-sm text-gray-600">{event.capacity} people</div>
                </div>
              </div>

              {event.rsvpDeadline && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">RSVP Deadline</div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.rsvpDeadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;