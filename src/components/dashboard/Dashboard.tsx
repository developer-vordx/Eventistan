import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Plus, Eye, Edit, Trash2, MapPin, Clock } from 'lucide-react';
import { mockEvents, mockUser } from '../../data/mockData';
import { Event } from '../../types';

interface DashboardProps {
  onCreateEvent: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCreateEvent }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'rsvps'>('overview');
  const [userEvents] = useState<Event[]>(mockEvents);

  const stats = [
    {
      title: 'Total Events',
      value: userEvents.length,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Total Attendees',
      value: userEvents.reduce((sum, event) => sum + event.attendees, 0),
      icon: Users,
      color: 'bg-emerald-500',
      change: '+15% vs last month'
    },
    {
      title: 'Revenue',
      value: `Rs. ${userEvents.reduce((sum, event) => sum + (event.price || 0), 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-amber-500',
      change: '+25% vs last month'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {mockUser.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your events today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'events', label: 'My Events' },
              { id: 'rsvps', label: 'RSVPs' }
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

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={onCreateEvent}
                    className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <div className="bg-emerald-500 p-2 rounded-lg">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-emerald-700">Create Event</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-blue-700">Manage RSVPs</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="bg-purple-500 p-2 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-purple-700">View Analytics</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <div className="bg-amber-500 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-amber-700">Event Calendar</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">New RSVP for "Grand Wedding Celebration"</span>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Event "Tech Innovation Summit 2025" published</span>
                    <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Vendor inquiry received</span>
                    <span className="text-xs text-gray-500 ml-auto">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Events</h3>
                <button 
                  onClick={onCreateEvent}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Event</span>
                </button>
              </div>

              <div className="space-y-4">
                {userEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.city}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-emerald-600 rounded-lg hover:bg-white">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-white">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rsvps' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">RSVP Management</h3>
              <div className="space-y-4">
                {userEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">{event.attendees}</div>
                        <div className="text-sm text-gray-500">Going</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-amber-600">{Math.floor(event.capacity * 0.1)}</div>
                        <div className="text-sm text-gray-500">Maybe</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{Math.floor(event.capacity * 0.05)}</div>
                        <div className="text-sm text-gray-500">Not Going</div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Capacity: {event.capacity}</span>
                      <span>Response Rate: {Math.round((event.attendees / event.capacity) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;