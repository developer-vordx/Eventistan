import React from 'react';
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const getEventTypeColor = (type: string) => {
    const colors = {
      wedding: 'bg-rose-100 text-rose-700',
      birthday: 'bg-purple-100 text-purple-700',
      corporate: 'bg-blue-100 text-blue-700',
      religious: 'bg-emerald-100 text-emerald-700',
      cultural: 'bg-amber-100 text-amber-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
        {event.price && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
            <span className="text-emerald-600 font-bold">Rs. {event.price.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
            {event.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
            <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
            <span>{event.venue}, {event.city}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2 text-emerald-600" />
            <span>{event.attendees} / {event.capacity} attending</span>
          </div>
        </div>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Organizer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {event.organizer.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{event.organizer.name}</p>
              <p className="text-xs text-gray-500">Organizer</p>
            </div>
          </div>
          
          <button
            onClick={() => onViewDetails(event)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            View Details
          </button>
        </div>

        {/* Attendance Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Attendance</span>
            <span>{Math.round((event.attendees / event.capacity) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;