import React, { useState } from 'react';
import Header from './components/layout/Header';
import EventList from './components/events/EventList';
import EventDetails from './components/events/EventDetails';
import CreateEventForm from './components/events/CreateEventForm';
import VendorList from './components/vendors/VendorList';
import Dashboard from './components/dashboard/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import BookingForm from './components/booking/BookingForm';
import BookingSuccess from './components/booking/BookingSuccess';
import UserProfile from './components/profile/UserProfile';
import { Event, Vendor } from './types';

type ViewType = 'events' | 'event-details' | 'create-event' | 'vendors' | 'dashboard' | 'profile' | 'login' | 'register' | 'forgot-password' | 'booking' | 'booking-success';
type AuthPage = 'login' | 'register' | 'forgot-password';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('events');
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [bookingId, setBookingId] = useState<string>('');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleViewChange = (view: string) => {
    if ((view === 'dashboard' || view === 'profile' || view === 'create-event') && !isAuthenticated) {
      setAuthPage('login');
      setCurrentView('login');
    } else {
      setCurrentView(view as ViewType);
    }
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('event-details');
  };

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    console.log('Selected vendor:', vendor);
  };

  const handleBookTicket = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('booking');
  };

  const handleBookingComplete = (id: string) => {
    setBookingId(id);
    setCurrentView('booking-success');
  };

  const handleRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
    console.log(`RSVP for event ${eventId}: ${status}`);
    // Here you would typically update the backend
  };

  const handleEventCreated = () => {
    setCurrentView('dashboard');
    // Here you would typically refresh the events list
  };

  const handleAuthNavigation = (page: AuthPage) => {
    setAuthPage(page);
    setCurrentView(page);
  };

  // Auth pages
  if (currentView === 'login') {
    return (
      <LoginForm
        onLogin={handleLogin}
        onNavigate={handleAuthNavigation}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterForm
        onRegister={handleRegister}
        onNavigate={handleAuthNavigation}
      />
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordForm
        onNavigate={handleAuthNavigation}
      />
    );
  }

  // Booking pages
  if (currentView === 'booking' && selectedEvent) {
    return (
      <BookingForm
        event={selectedEvent}
        onBack={() => setCurrentView('event-details')}
        onBookingComplete={handleBookingComplete}
      />
    );
  }

  if (currentView === 'booking-success' && selectedEvent) {
    return (
      <BookingSuccess
        event={selectedEvent}
        bookingId={bookingId}
        onBackToEvents={() => setCurrentView('events')}
      />
    );
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange}
        isAuthenticated={isAuthenticated}
      />
      
      <main>
        {currentView === 'events' && (
          <EventList onEventSelect={handleEventSelect} />
        )}
        
        {currentView === 'event-details' && selectedEvent && (
          <EventDetails
            event={selectedEvent}
            onBack={() => setCurrentView('events')}
            onBookTicket={handleBookTicket}
            onRSVP={handleRSVP}
          />
        )}

        {currentView === 'create-event' && (
          <CreateEventForm
            onEventCreated={handleEventCreated}
            onCancel={() => setCurrentView('dashboard')}
          />
        )}
        
        {currentView === 'vendors' && (
          <VendorList onVendorSelect={handleVendorSelect} />
        )}
        
        {currentView === 'dashboard' && isAuthenticated && (
          <Dashboard onCreateEvent={() => setCurrentView('create-event')} />
        )}

        {currentView === 'profile' && isAuthenticated && (
          <UserProfile onBack={() => setCurrentView('dashboard')} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-xl font-bold">Eventistan</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted companion for discovering and organizing memorable events across Pakistan.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Event Organizers</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleViewChange('create-event')}>Create Events</button></li>
                <li><button onClick={() => handleViewChange('dashboard')}>Manage Events</button></li>
                <li><button onClick={() => handleViewChange('vendors')}>Find Vendors</button></li>
                <li>Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Attendees</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleViewChange('events')}>Browse Events</button></li>
                <li>Book Tickets</li>
                <li>RSVP Events</li>
                <li><button onClick={() => handleViewChange('profile')}>My Profile</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Eventistan. Made with ❤️ in Pakistan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;