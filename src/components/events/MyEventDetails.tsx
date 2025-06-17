import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Eye, Edit, Trash2, 
  Download, Share2, CheckCircle, XCircle, Clock3,
  UserCheck, UserX, Search, Filter, ArrowLeft,
  Mail, Phone, QrCode, MoreVertical
} from 'lucide-react';
import { Event, EventParticipant } from '../../types';

interface MyEventDetailsProps {
  event: Event;
  onBack: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
}

const MyEventDetails: React.FC<MyEventDetailsProps> = ({ 
  event, 
  onBack, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'participants' | 'analytics'>('overview');
  const [participantFilter, setParticipantFilter] = useState<'all' | 'going' | 'maybe' | 'not-going'>('all');
  const [searchParticipants, setSearchParticipants] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

  const participants = event.participants || [];
  
  const filteredParticipants = participants.filter(participant => {
    const matchesFilter = participantFilter === 'all' || participant.status === participantFilter;
    const matchesSearch = participant.user.name.toLowerCase().includes(searchParticipants.toLowerCase()) ||
                         participant.user.email.toLowerCase().includes(searchParticipants.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const participantStats = {
    total: participants.length,
    going: participants.filter(p => p.status === 'going').length,
    maybe: participants.filter(p => p.status === 'maybe').length,
    notGoing: participants.filter(p => p.status === 'not-going').length,
    checkedIn: participants.filter(p => p.checkInStatus === 'checked-in').length,
    paid: participants.filter(p => p.paymentStatus === 'completed').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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

  const getStatusColor = (status: string) => {
    const colors = {
      going: 'bg-emerald-100 text-emerald-700',
      maybe: 'bg-yellow-100 text-yellow-700',
      'not-going': 'bg-red-100 text-red-700',
      'checked-in': 'bg-blue-100 text-blue-700',
      pending: 'bg-gray-100 text-gray-700',
      completed: 'bg-emerald-100 text-emerald-700',
      failed: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const handleSelectParticipant = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSelectAll = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredParticipants.map(p => p.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for participants:`, selectedParticipants);
    // Implement bulk actions like send email, export, etc.
  };

  const exportParticipants = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Status', 'Seats', 'Payment Status', 'Check-in Status', 'Joined Date'],
      ...filteredParticipants.map(p => [
        p.user.name,
        p.user.email,
        p.user.phone,
        p.status,
        p.seats.toString(),
        p.paymentStatus || 'N/A',
        p.checkInStatus || 'N/A',
        new Date(p.joinedAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}-participants.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Event Status */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Event Status</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{participantStats.total}</div>
            <div className="text-sm text-gray-600">Total RSVPs</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{participantStats.going}</div>
            <div className="text-sm text-gray-600">Going</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{participantStats.maybe}</div>
            <div className="text-sm text-gray-600">Maybe</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{participantStats.checkedIn}</div>
            <div className="text-sm text-gray-600">Checked In</div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Date & Time</div>
                <div className="font-medium">{formatDate(event.date)} at {formatTime(event.time)}</div>
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
            
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500">Capacity</div>
                <div className="font-medium">{event.capacity} people</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Event Type</div>
              <div className="font-medium capitalize">{event.type}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Visibility</div>
              <div className="font-medium">{event.isPublic ? 'Public' : 'Private'}</div>
            </div>
            
            {event.price && (
              <div>
                <div className="text-sm text-gray-500">Ticket Price</div>
                <div className="font-medium">Rs. {event.price.toLocaleString()}</div>
              </div>
            )}
            
            <div>
              <div className="text-sm text-gray-500">RSVP Deadline</div>
              <div className="font-medium">{formatDate(event.rsvpDeadline)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onEditEvent(event)}
            className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-600" />
            <span>Edit Event</span>
          </button>
          
          <button
            onClick={exportParticipants}
            className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span>Export Data</span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>Share Event</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderParticipantsTab = () => (
    <div className="space-y-6">
      {/* Participants Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Event Participants</h3>
          <p className="text-gray-600">{filteredParticipants.length} of {participants.length} participants</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={exportParticipants}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          {selectedParticipants.length > 0 && (
            <div className="relative">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <MoreVertical className="w-4 h-4" />
                <span>Actions ({selectedParticipants.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search participants..."
                value={searchParticipants}
                onChange={(e) => setSearchParticipants(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={participantFilter}
            onChange={(e) => setParticipantFilter(e.target.value as typeof participantFilter)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="going">Going</option>
            <option value="maybe">Maybe</option>
            <option value="not-going">Not Going</option>
          </select>
        </div>
      </div>

      {/* Participants List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {filteredParticipants.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedParticipants.length === filteredParticipants.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Select All
                </span>
              </div>
            </div>

            {/* Participants */}
            <div className="divide-y divide-gray-200">
              {filteredParticipants.map((participant) => (
                <div key={participant.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(participant.id)}
                      onChange={() => handleSelectParticipant(participant.id)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {participant.user.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {participant.user.name}
                        </h4>
                        {participant.user.isVerified && (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{participant.user.email}</span>
                        <span className="text-sm text-gray-500">{participant.user.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{participant.seats}</div>
                        <div className="text-xs text-gray-500">seats</div>
                      </div>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}>
                        {participant.status.replace('-', ' ')}
                      </span>
                      
                      {participant.paymentStatus && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.paymentStatus)}`}>
                          {participant.paymentStatus}
                        </span>
                      )}
                      
                      {participant.checkInStatus && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.checkInStatus)}`}>
                          {participant.checkInStatus === 'checked-in' ? 'Checked In' : 'Pending'}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a
                        href={`mailto:${participant.user.email}`}
                        className="p-1 text-gray-400 hover:text-emerald-600"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${participant.user.phone}`}
                        className="p-1 text-gray-400 hover:text-emerald-600"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      {participant.ticketNumber && (
                        <button className="p-1 text-gray-400 hover:text-emerald-600">
                          <QrCode className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Joined: {new Date(participant.joinedAt).toLocaleDateString()}
                    {participant.ticketNumber && (
                      <span className="ml-4">Ticket: {participant.ticketNumber}</span>
                    )}
                    {participant.checkInTime && (
                      <span className="ml-4">
                        Checked in: {new Date(participant.checkInTime).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No participants found</h3>
            <p className="text-gray-500">
              {searchParticipants || participantFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No one has RSVP\'d to your event yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-sm text-emerald-600 mt-2">+12% from last week</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">RSVP Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((participantStats.total / event.capacity) * 100)}%
              </p>
            </div>
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
          <p className="text-sm text-emerald-600 mt-2">
            {participantStats.total} of {event.capacity}
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                Rs. {((event.price || 0) * participantStats.paid).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-sm text-emerald-600 mt-2">
            {participantStats.paid} paid tickets
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Check-in Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {participantStats.going > 0 
                  ? Math.round((participantStats.checkedIn / participantStats.going) * 100)
                  : 0
                }%
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-sm text-emerald-600 mt-2">
            {participantStats.checkedIn} checked in
          </p>
        </div>
      </div>

      {/* RSVP Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">RSVP Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-700">Going</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-medium">{participantStats.going}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${(participantStats.going / participantStats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-700">Maybe</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-medium">{participantStats.maybe}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(participantStats.maybe / participantStats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">Not Going</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-medium">{participantStats.notGoing}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(participantStats.notGoing / participantStats.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {participants.slice(0, 5).map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {participant.user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{participant.user.name}</span> RSVP'd as{' '}
                  <span className="font-medium">{participant.status}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(participant.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <p className="text-gray-600">{formatDate(event.date)} • {event.city}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => onEditEvent(event)}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Event</span>
          </button>
          
          <button
            onClick={() => onDeleteEvent(event.id)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'participants', label: `Participants (${participants.length})`, icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
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
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'participants' && renderParticipantsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </div>
      </div>
    </div>
  );
};

export default MyEventDetails;