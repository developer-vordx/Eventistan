import React, { useState } from 'react';
import { Filter, Grid, List, MapPin, Calendar, Search } from 'lucide-react';
import EventCard from './EventCard';
import { Event } from '../../types';
import { mockEvents } from '../../data/mockData';

interface EventListProps {
  onEventSelect: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ onEventSelect }) => {
  const [events] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    date: '',
    priceRange: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Faisalabad'];
  const eventTypes = ['All Types', 'wedding', 'corporate', 'birthday', 'religious', 'cultural'];
  const priceRanges = ['All Prices', 'Free', 'Under Rs. 1,000', 'Rs. 1,000 - 5,000', 'Above Rs. 5,000'];

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters, searchQuery);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(filters, query);
  };

  const applyFilters = (currentFilters: typeof filters, query: string) => {
    let filtered = [...events];

    // Apply search
    if (query) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.city.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Apply city filter
    if (currentFilters.city && currentFilters.city !== 'All Cities') {
      filtered = filtered.filter(event => event.city === currentFilters.city);
    }

    // Apply type filter
    if (currentFilters.type && currentFilters.type !== 'All Types') {
      filtered = filtered.filter(event => event.type === currentFilters.type);
    }

    // Apply price filter
    if (currentFilters.priceRange && currentFilters.priceRange !== 'All Prices') {
      filtered = filtered.filter(event => {
        if (currentFilters.priceRange === 'Free') return !event.price;
        if (currentFilters.priceRange === 'Under Rs. 1,000') return event.price && event.price < 1000;
        if (currentFilters.priceRange === 'Rs. 1,000 - 5,000') return event.price && event.price >= 1000 && event.price <= 5000;
        if (currentFilters.priceRange === 'Above Rs. 5,000') return event.price && event.price > 5000;
        return true;
      });
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Events in Pakistan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From grand weddings to corporate conferences, find and attend the most exciting events in your city
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events by name, location, or tags..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {cities.map(city => (
                <option key={city} value={city === 'All Cities' ? '' : city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {eventTypes.map(type => (
                <option key={type} value={type === 'All Types' ? '' : type}>
                  {type === 'All Types' ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range} value={range === 'All Prices' ? '' : range}>
                  {range}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* View Controls and Results */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredEvents.length}</span> events
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={onEventSelect}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredEvents.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;