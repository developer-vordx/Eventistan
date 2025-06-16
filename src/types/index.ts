export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'organizer' | 'user' | 'vendor';
  avatar?: string;
  city: string;
  dateOfBirth?: string;
  bio?: string;
  preferences?: string[];
  joinedDate: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'wedding' | 'birthday' | 'corporate' | 'religious' | 'cultural' | 'other';
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  organizer: User;
  isPublic: boolean;
  capacity: number;
  attendees: number;
  image: string;
  price?: number;
  rsvpDeadline: string;
  tags: string[];
  gallery?: string[];
  amenities?: string[];
  requirements?: string[];
  contactInfo?: {
    phone: string;
    email: string;
  };
  seatingArrangement?: 'open' | 'assigned' | 'tables';
  availableSeats?: number;
  bookedSeats?: number;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'catering' | 'venue' | 'photography' | 'decoration' | 'dj' | 'transport';
  description: string;
  city: string;
  rating: number;
  reviews: number;
  priceRange: 'budget' | 'mid-range' | 'premium';
  image: string;
  gallery: string[];
  contact: {
    phone: string;
    email: string;
  };
  services: string[];
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'going' | 'maybe' | 'not-going';
  guests: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  seats: number;
  totalAmount: number;
  paymentMethod: 'jazzcash' | 'easypaisa' | 'wallet' | 'cash';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  bookingDate: string;
  ticketNumber: string;
  qrCode?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'jazzcash' | 'easypaisa' | 'wallet' | 'cash';
  icon: string;
  description: string;
  isActive: boolean;
}