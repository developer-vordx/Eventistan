import React, { useState } from 'react';
import { Search, Filter, Grid, List, MapPin } from 'lucide-react';
import VendorCard from './VendorCard';
import { Vendor } from '../../types';
import { mockVendors } from '../../data/mockData';

interface VendorListProps {
  onVendorSelect: (vendor: Vendor) => void;
}

const VendorList: React.FC<VendorListProps> = ({ onVendorSelect }) => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    priceRange: '',
    rating: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Faisalabad'];
  const categories = ['All Categories', 'catering', 'venue', 'photography', 'decoration', 'dj', 'transport'];
  const priceRanges = ['All Prices', 'budget', 'mid-range', 'premium'];
  const ratings = ['All Ratings', '4+ Stars', '3+ Stars', '2+ Stars'];

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
    let filtered = [...vendors];

    // Apply search
    if (query) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(query.toLowerCase()) ||
        vendor.description.toLowerCase().includes(query.toLowerCase()) ||
        vendor.city.toLowerCase().includes(query.toLowerCase()) ||
        vendor.services.some(service => service.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Apply city filter
    if (currentFilters.city && currentFilters.city !== 'All Cities') {
      filtered = filtered.filter(vendor => vendor.city === currentFilters.city);
    }

    // Apply category filter
    if (currentFilters.category && currentFilters.category !== 'All Categories') {
      filtered = filtered.filter(vendor => vendor.category === currentFilters.category);
    }

    // Apply price range filter
    if (currentFilters.priceRange && currentFilters.priceRange !== 'All Prices') {
      filtered = filtered.filter(vendor => vendor.priceRange === currentFilters.priceRange);
    }

    // Apply rating filter
    if (currentFilters.rating && currentFilters.rating !== 'All Ratings') {
      const minRating = parseInt(currentFilters.rating.charAt(0));
      filtered = filtered.filter(vendor => vendor.rating >= minRating);
    }

    setFilteredVendors(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find Trusted Event Vendors
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with verified professionals who will make your event memorable and hassle-free
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
              placeholder="Search vendors by name, services, or location..."
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
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All Categories' ? '' : category}>
                  {category === 'All Categories' ? category : category.charAt(0).toUpperCase() + category.slice(1)}
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
                  {range === 'All Prices' ? range : range.charAt(0).toUpperCase() + range.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {ratings.map(rating => (
                <option key={rating} value={rating === 'All Ratings' ? '' : rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* View Controls and Results */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredVendors.length}</span> vendors
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

      {/* Vendors Grid/List */}
      {filteredVendors.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredVendors.map(vendor => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onViewDetails={onVendorSelect}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredVendors.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            Load More Vendors
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorList;