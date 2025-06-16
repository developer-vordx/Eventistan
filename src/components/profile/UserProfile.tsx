import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Heart, Ticket } from 'lucide-react';
import { mockUser, mockEvents } from '../../data/mockData';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'events' | 'bookings' | 'favorites'>('profile');
  const [profileData, setProfileData] = useState(mockUser);

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {profileData.name.charAt(0)}
            </span>
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
          <p className="text-gray-600 capitalize">{profileData.role}</p>
          <p className="text-sm text-gray-500">Member since {new Date(profileData.joinedDate).getFullYear()}</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-400" />
              <span>{profileData.name}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{profileData.email}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{profileData.phone}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          {isEditing ? (
            <select
              value={profileData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Multan">Multan</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
            </select>
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{profileData.city}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          {isEditing ? (
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          ) : (
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not set'}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <User className="w-4 h-4 text-gray-400" />
            <span className="capitalize">{profileData.role}</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        {isEditing ? (
          <textarea
            value={profileData.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{profileData.bio || 'No bio added yet.'}</p>
          </div>
        )}
      </div>

      {/* Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Preferences
        </label>
        <div className="flex flex-wrap gap-2">
          {(profileData.preferences || []).map((preference, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm capitalize"
            >
              {preference}
            </span>
          ))}
          {(!profileData.preferences || profileData.preferences.length === 0) && (
            <span className="text-gray-500 text-sm">No preferences set</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">My Events</h3>
      {mockEvents.filter(event => event.organizer.id === profileData.id).map(event => (
        <div key={event.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{event.title}</h4>
              <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{event.attendees} attendees</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-emerald-600">Active</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookingsTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
      <div className="text-center py-8">
        <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h4>
        <p className="text-gray-500">Your event bookings will appear here</p>
      </div>
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Favorite Events</h3>
      <div className="text-center py-8">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h4>
        <p className="text-gray-500">Events you like will appear here</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'events', label: 'My Events', icon: Calendar },
              { id: 'bookings', label: 'Bookings', icon: Ticket },
              { id: 'favorites', label: 'Favorites', icon: Heart }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'events' && renderEventsTab()}
          {activeTab === 'bookings' && renderBookingsTab()}
          {activeTab === 'favorites' && renderFavoritesTab()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;