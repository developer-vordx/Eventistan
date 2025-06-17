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
  isVerified?: boolean;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
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
  participants?: EventParticipant[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface EventParticipant {
  id: string;
  userId: string;
  eventId: string;
  user: User;
  status: 'going' | 'maybe' | 'not-going';
  ticketType?: 'free' | 'paid';
  ticketNumber?: string;
  bookingId?: string;
  joinedAt: string;
  seats: number;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  checkInStatus?: 'pending' | 'checked-in';
  checkInTime?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'catering' | 'venue' | 'photography' | 'decoration' | 'dj' | 'transport' | 'planning' | 'security';
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
    address: string;
    website?: string;
  };
  services: string[];
  portfolio?: VendorPortfolioItem[];
  businessHours?: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  isVerified: boolean;
  joinedDate: string;
  completedEvents: number;
  responseTime: string;
  cancellationPolicy?: string;
  paymentMethods: string[];
  minimumOrder?: number;
  serviceAreas: string[];
  specializations?: string[];
  certifications?: string[];
  teamSize?: number;
  establishedYear?: number;
}

export interface VendorPortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  eventType: string;
  completedDate: string;
  clientTestimonial?: string;
  budget?: string;
}

export interface VendorReview {
  id: string;
  vendorId: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  eventId?: string;
  eventTitle?: string;
  createdAt: string;
  isVerified: boolean;
  response?: {
    message: string;
    respondedAt: string;
  };
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
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'jazzcash' | 'easypaisa' | 'wallet' | 'cash';
  icon: string;
  description: string;
  isActive: boolean;
}

export interface VendorInquiry {
  id: string;
  vendorId: string;
  userId: string;
  eventId?: string;
  message: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  eventDetails?: {
    date: string;
    venue: string;
    guestCount: number;
    budget: string;
  };
  status: 'pending' | 'responded' | 'closed';
  createdAt: string;
  response?: {
    message: string;
    respondedAt: string;
  };
}