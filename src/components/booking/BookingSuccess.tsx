import React from 'react';
import { CheckCircle, Download, Share2, Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '../../types';

interface BookingSuccessProps {
  event: Event;
  bookingId: string;
  onBackToEvents: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ event, bookingId, onBackToEvents }) => {
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

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download feature will be implemented with PDF generation');
  };

  const handleShareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ticket for ${event.title}`,
        text: `I'm attending ${event.title} on ${formatDate(event.date)}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`I'm attending ${event.title} on ${formatDate(event.date)}! Booking ID: ${bookingId}`);
      alert('Ticket details copied to clipboard!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your tickets have been successfully booked</p>
      </div>

      {/* Ticket Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-1">{event.title}</h2>
              <p className="text-emerald-100">Booking ID: {bookingId}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {event.price ? `Rs. ${event.price.toLocaleString()}` : 'FREE'}
              </div>
              <div className="text-emerald-100 text-sm">per ticket</div>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">{formatDate(event.date)}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Time</div>
                  <div className="font-medium">{formatTime(event.time)}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Venue</div>
                  <div className="font-medium">{event.venue}</div>
                  <div className="text-sm text-gray-600">{event.address}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Organizer</div>
                <div className="font-medium">{event.organizer.name}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Event Type</div>
                <div className="font-medium capitalize">{event.type}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Booking Status</div>
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Confirmed
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2"></div>
                  <div className="text-xs text-gray-500">QR Code</div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Show this QR code at the venue for entry
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center space-x-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download Ticket</span>
          </button>

          <button
            onClick={handleShareTicket}
            className="flex items-center justify-center space-x-2 border border-emerald-600 text-emerald-600 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Ticket</span>
          </button>
        </div>

        <button
          onClick={onBackToEvents}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back to Events
        </button>
      </div>

      {/* Important Information */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-medium text-amber-800 mb-2">Important Information</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Please arrive at least 30 minutes before the event starts</li>
          <li>• Bring a valid ID for verification</li>
          <li>• Screenshots of tickets are not accepted - show the original QR code</li>
          <li>• Contact the organizer for any event-related queries</li>
          <li>• Refund policy applies as per event terms and conditions</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingSuccess;