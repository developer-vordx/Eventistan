import React, { useState } from 'react';
import Header from './components/layout/Header';
import EventList from './components/events/EventList';
import EventDetails from './components/events/EventDetails';
import MyEventDetails from './components/events/MyEventDetails';
import CreateEventForm from './components/events/CreateEventForm';
import VendorList from './components/vendors/VendorList';
import VendorDetails from './components/vendors/VendorDetails';
import VendorRegistration from './components/vendors/VendorRegistration';
import Dashboard from './components/dashboard/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import BookingForm from './components/booking/BookingForm';
import BookingSuccess from './components/booking/BookingSuccess';
import UserProfile from './components/profile/UserProfile';
import { Event, Vendor } from './types';

type ViewType = 'events' | 'event-details' | 'my-event-details' | 'create-event' | 'vendors' | 'vendor-details' | 'vendor-registration' | 'dashboard' | 'profile' | 'login' | 'register' | 'forgot-password' | 'booking' | 'booking-success';
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
    if ((view === 'dashboard' || view === 'profile' || view === 'create-event' || view === 'vendor-registration') && !isAuthenticated) {
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

  const handleMyEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('my-event-details');
  };

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setCurrentView('vendor-details');
  };

  const handleContactVendor = (vendor: Vendor) => {
    console.log('Contact vendor:', vendor);
    // Here you would typically open a contact form or messaging system
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

  const handleVendorCreated = () => {
    setCurrentView('dashboard');
    // Here you would typically refresh the vendor list
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('create-event');
  };

  const handleDeleteEvent = (eventId: string) => {
    console.log('Delete event:', eventId);
    // Here you would typically delete the event and refresh the list
    setCurrentView('dashboard');
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

  // Vendor Registration
  if (currentView === 'vendor-registration') {
    return (
      <VendorRegistration
        onBack={() => setCurrentView('vendors')}
        onVendorCreated={handleVendorCreated}
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

        {currentView === 'my-event-details' && selectedEvent && (
          <MyEventDetails
            event={selectedEvent}
            onBack={() => setCurrentView('dashboard')}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
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

        {currentView === 'vendor-details' && selectedVendor && (
          <VendorDetails
            vendor={selectedVendor}
            onBack={() => setCurrentView('vendors')}
            onContactVendor={handleContactVendor}
          />
        )}
        
        {currentView === 'dashboard' && isAuthenticated && (
          <Dashboard 
            onCreateEvent={() => setCurrentView('create-event')}
            onEventSelect={handleMyEventSelect}
          />
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
              <h3 className="font-semibold mb-4">For Vendors</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => handleViewChange('vendor-registration')}>Join as Vendor</button></li>
                <li><button onClick={() => handleViewChange('vendors')}>Browse Vendors</button></li>
                <li>Vendor Dashboard</li>
                <li>Portfolio Management</li>
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