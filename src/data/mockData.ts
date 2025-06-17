import { Event, Vendor, User, PaymentMethod, EventParticipant, VendorReview, VendorPortfolioItem } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Ahmed Hassan',
  email: 'ahmed@example.com',
  phone: '+92-300-1234567',
  role: 'organizer',
  city: 'Karachi',
  dateOfBirth: '1990-05-15',
  bio: 'Event organizer with 5+ years of experience in creating memorable celebrations.',
  preferences: ['weddings', 'corporate', 'cultural'],
  joinedDate: '2023-01-15',
  isVerified: true,
  socialLinks: {
    facebook: 'https://facebook.com/ahmed.hassan',
    instagram: 'https://instagram.com/ahmed_events',
    website: 'https://ahmedevents.pk'
  }
};

export const mockParticipants: EventParticipant[] = [
  {
    id: '1',
    userId: '2',
    eventId: '1',
    user: {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      phone: '+92-301-2345678',
      role: 'user',
      city: 'Karachi',
      joinedDate: '2024-03-10',
      isVerified: true
    },
    status: 'going',
    ticketType: 'paid',
    ticketNumber: 'TK001234',
    bookingId: 'BK001',
    joinedAt: '2025-01-15T10:30:00Z',
    seats: 2,
    paymentStatus: 'completed',
    checkInStatus: 'pending'
  },
  {
    id: '2',
    userId: '3',
    eventId: '1',
    user: {
      id: '3',
      name: 'Ali Raza',
      email: 'ali@example.com',
      phone: '+92-302-3456789',
      role: 'user',
      city: 'Lahore',
      joinedDate: '2024-05-20',
      isVerified: false
    },
    status: 'maybe',
    ticketType: 'paid',
    joinedAt: '2025-01-16T14:20:00Z',
    seats: 1,
    paymentStatus: 'pending',
    checkInStatus: 'pending'
  },
  {
    id: '3',
    userId: '4',
    eventId: '1',
    user: {
      id: '4',
      name: 'Sara Ahmed',
      email: 'sara@example.com',
      phone: '+92-303-4567890',
      role: 'user',
      city: 'Islamabad',
      joinedDate: '2024-07-12',
      isVerified: true
    },
    status: 'going',
    ticketType: 'paid',
    ticketNumber: 'TK001235',
    bookingId: 'BK002',
    joinedAt: '2025-01-17T09:15:00Z',
    seats: 3,
    paymentStatus: 'completed',
    checkInStatus: 'checked-in',
    checkInTime: '2025-01-20T17:45:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Grand Wedding Celebration',
    description: 'Join us for a magnificent wedding celebration with traditional Pakistani customs, delicious cuisine, and joyful festivities. Experience the rich cultural heritage of Pakistan with traditional music, dance performances, and authentic Pakistani dishes prepared by renowned chefs.',
    type: 'wedding',
    date: '2025-02-15',
    time: '18:00',
    venue: 'Pearl Continental Hotel',
    address: 'Club Road, Karachi',
    city: 'Karachi',
    organizer: mockUser,
    isPublic: true,
    capacity: 500,
    attendees: 234,
    image: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
    rsvpDeadline: '2025-02-10',
    tags: ['wedding', 'traditional', 'family'],
    gallery: [
      'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Air Conditioning', 'Parking', 'Sound System', 'Catering', 'Photography'],
    requirements: ['Formal Dress Code', 'RSVP Required', 'No Outside Food'],
    contactInfo: {
      phone: '+92-21-1234567',
      email: 'wedding@example.com'
    },
    seatingArrangement: 'tables',
    availableSeats: 266,
    bookedSeats: 234,
    price: 5000,
    participants: mockParticipants,
    status: 'published',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-18T12:30:00Z'
  },
  {
    id: '2',
    title: 'Tech Innovation Summit 2025',
    description: 'Pakistan\'s premier technology conference bringing together innovators, entrepreneurs, and tech enthusiasts. Featuring keynote speakers from leading tech companies, startup pitches, and networking opportunities.',
    type: 'corporate',
    date: '2025-01-28',
    time: '09:00',
    venue: 'Expo Centre',
    address: 'University Road, Lahore',
    city: 'Lahore',
    organizer: mockUser,
    isPublic: true,
    capacity: 1000,
    attendees: 567,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 2500,
    rsvpDeadline: '2025-01-25',
    tags: ['technology', 'business', 'networking'],
    gallery: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Lunch Included', 'Networking Area', 'Exhibition Booths'],
    requirements: ['Business Attire', 'Registration Required', 'ID Card Mandatory'],
    contactInfo: {
      phone: '+92-42-1234567',
      email: 'summit@techpk.com'
    },
    seatingArrangement: 'open',
    availableSeats: 433,
    bookedSeats: 567,
    participants: [],
    status: 'published',
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-15T16:45:00Z'
  },
  {
    id: '3',
    title: 'Mehndi Night Celebration',
    description: 'A colorful and vibrant mehndi celebration with traditional music, dance, and henna designs. Join us for an evening filled with joy, laughter, and beautiful Pakistani traditions.',
    type: 'cultural',
    date: '2025-02-20',
    time: '19:00',
    venue: 'Fortress Stadium',
    address: 'Stadium Road, Lahore',
    city: 'Lahore',
    organizer: mockUser,
    isPublic: false,
    capacity: 300,
    attendees: 145,
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800',
    rsvpDeadline: '2025-02-18',
    tags: ['mehndi', 'traditional', 'celebration'],
    gallery: [
      'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Traditional Music', 'Henna Artists', 'Photography', 'Refreshments'],
    requirements: ['Traditional Dress Preferred', 'Family Event', 'Invitation Only'],
    contactInfo: {
      phone: '+92-42-9876543',
      email: 'mehndi@celebration.pk'
    },
    seatingArrangement: 'open',
    availableSeats: 155,
    bookedSeats: 145,
    participants: [],
    status: 'published',
    createdAt: '2025-01-08T14:20:00Z',
    updatedAt: '2025-01-12T11:15:00Z'
  }
];

export const mockVendorPortfolio: VendorPortfolioItem[] = [
  {
    id: '1',
    title: 'Luxury Wedding at PC Hotel',
    description: 'Complete catering service for 500+ guests with traditional Pakistani and continental cuisine',
    images: [
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    eventType: 'Wedding',
    completedDate: '2024-12-15',
    clientTestimonial: 'Exceptional service and delicious food. Our guests are still talking about it!',
    budget: 'Rs. 800,000 - 1,200,000'
  },
  {
    id: '2',
    title: 'Corporate Annual Dinner',
    description: 'Professional catering for tech company annual dinner with international cuisine',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    eventType: 'Corporate',
    completedDate: '2024-11-20',
    clientTestimonial: 'Professional service that impressed our international clients.',
    budget: 'Rs. 300,000 - 500,000'
  }
];

export const mockVendorReviews: VendorReview[] = [
  {
    id: '1',
    vendorId: '1',
    userId: '2',
    user: {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      phone: '+92-301-2345678',
      role: 'user',
      city: 'Karachi',
      joinedDate: '2024-03-10'
    },
    rating: 5,
    comment: 'Outstanding catering service! The food was delicious and the presentation was beautiful. Highly recommended for weddings.',
    eventId: '1',
    eventTitle: 'Grand Wedding Celebration',
    createdAt: '2024-12-20T10:30:00Z',
    isVerified: true,
    response: {
      message: 'Thank you so much for your kind words! It was our pleasure to be part of your special day.',
      respondedAt: '2024-12-21T09:15:00Z'
    }
  },
  {
    id: '2',
    vendorId: '1',
    userId: '3',
    user: {
      id: '3',
      name: 'Ali Raza',
      email: 'ali@example.com',
      phone: '+92-302-3456789',
      role: 'user',
      city: 'Lahore',
      joinedDate: '2024-05-20'
    },
    rating: 4,
    comment: 'Great food quality and professional service. The only minor issue was a slight delay in serving desserts.',
    createdAt: '2024-11-25T14:20:00Z',
    isVerified: true
  }
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Royal Caterers',
    category: 'catering',
    description: 'Premium catering services specializing in traditional Pakistani and continental cuisine for all types of events. With over 15 years of experience, we have served thousands of satisfied customers across Pakistan.',
    city: 'Karachi',
    rating: 4.8,
    reviews: 156,
    priceRange: 'premium',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contact: {
      phone: '+92-21-1234567',
      email: 'info@royalcaterers.pk',
      address: 'Block 15, Gulshan-e-Iqbal, Karachi',
      website: 'https://royalcaterers.pk'
    },
    services: ['Traditional Pakistani Cuisine', 'Continental Food', 'BBQ Specialists', 'Live Cooking Stations', 'Dessert Counters', 'Beverage Service'],
    portfolio: mockVendorPortfolio,
    businessHours: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '10:00', close: '16:00', isOpen: true },
      sunday: { open: '10:00', close: '16:00', isOpen: false }
    },
    socialLinks: {
      facebook: 'https://facebook.com/royalcaterers',
      instagram: 'https://instagram.com/royal_caterers_pk',
      website: 'https://royalcaterers.pk'
    },
    isVerified: true,
    joinedDate: '2020-03-15',
    completedEvents: 1250,
    responseTime: 'Within 2 hours',
    cancellationPolicy: 'Free cancellation up to 7 days before event. 50% refund for 3-7 days notice.',
    paymentMethods: ['Cash', 'Bank Transfer', 'JazzCash', 'EasyPaisa'],
    minimumOrder: 50000,
    serviceAreas: ['Karachi', 'Hyderabad', 'Thatta'],
    specializations: ['Wedding Catering', 'Corporate Events', 'Traditional Cuisine'],
    certifications: ['Food Safety Certified', 'Halal Certified', 'ISO 9001:2015'],
    teamSize: 45,
    establishedYear: 2008
  },
  {
    id: '2',
    name: 'Majestic Venues',
    category: 'venue',
    description: 'Elegant wedding halls and event venues with modern amenities and traditional Pakistani architecture. Our venues can accommodate events from 100 to 2000 guests.',
    city: 'Lahore',
    rating: 4.6,
    reviews: 89,
    priceRange: 'mid-range',
    image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contact: {
      phone: '+92-42-1234567',
      email: 'bookings@majesticvenues.pk',
      address: 'Main Boulevard, Gulberg III, Lahore',
      website: 'https://majesticvenues.pk'
    },
    services: ['Wedding Halls', 'Conference Rooms', 'Outdoor Gardens', 'Parking Facilities', 'Bridal Rooms', 'Stage Setup'],
    portfolio: [],
    businessHours: {
      monday: { open: '08:00', close: '22:00', isOpen: true },
      tuesday: { open: '08:00', close: '22:00', isOpen: true },
      wednesday: { open: '08:00', close: '22:00', isOpen: true },
      thursday: { open: '08:00', close: '22:00', isOpen: true },
      friday: { open: '08:00', close: '22:00', isOpen: true },
      saturday: { open: '08:00', close: '22:00', isOpen: true },
      sunday: { open: '08:00', close: '22:00', isOpen: true }
    },
    socialLinks: {
      facebook: 'https://facebook.com/majesticvenues',
      instagram: 'https://instagram.com/majestic_venues'
    },
    isVerified: true,
    joinedDate: '2019-07-20',
    completedEvents: 850,
    responseTime: 'Within 4 hours',
    cancellationPolicy: 'Free cancellation up to 30 days before event. 25% refund for 15-30 days notice.',
    paymentMethods: ['Cash', 'Bank Transfer', 'Cheque'],
    minimumOrder: 100000,
    serviceAreas: ['Lahore', 'Kasur', 'Sheikhupura'],
    specializations: ['Wedding Venues', 'Corporate Events', 'Cultural Events'],
    certifications: ['Licensed Venue', 'Fire Safety Certified'],
    teamSize: 25,
    establishedYear: 2015
  },
  {
    id: '3',
    name: 'Pixel Perfect Photography',
    category: 'photography',
    description: 'Professional wedding and event photography capturing your special moments with artistic excellence. We specialize in traditional Pakistani wedding photography and modern portrait styles.',
    city: 'Islamabad',
    rating: 4.9,
    reviews: 203,
    priceRange: 'premium',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contact: {
      phone: '+92-51-1234567',
      email: 'info@pixelperfect.pk',
      address: 'F-7 Markaz, Islamabad',
      website: 'https://pixelperfect.pk'
    },
    services: ['Wedding Photography', 'Event Coverage', 'Pre-wedding Shoots', 'Drone Photography', 'Video Production', 'Photo Albums'],
    portfolio: [],
    businessHours: {
      monday: { open: '10:00', close: '19:00', isOpen: true },
      tuesday: { open: '10:00', close: '19:00', isOpen: true },
      wednesday: { open: '10:00', close: '19:00', isOpen: true },
      thursday: { open: '10:00', close: '19:00', isOpen: true },
      friday: { open: '10:00', close: '19:00', isOpen: true },
      saturday: { open: '10:00', close: '17:00', isOpen: true },
      sunday: { open: '10:00', close: '17:00', isOpen: false }
    },
    socialLinks: {
      facebook: 'https://facebook.com/pixelperfectpk',
      instagram: 'https://instagram.com/pixelperfect_photography',
      website: 'https://pixelperfect.pk'
    },
    isVerified: true,
    joinedDate: '2018-11-10',
    completedEvents: 650,
    responseTime: 'Within 1 hour',
    cancellationPolicy: 'Free cancellation up to 14 days before event. 75% refund for 7-14 days notice.',
    paymentMethods: ['Cash', 'Bank Transfer', 'JazzCash', 'EasyPaisa'],
    minimumOrder: 75000,
    serviceAreas: ['Islamabad', 'Rawalpindi', 'Attock'],
    specializations: ['Wedding Photography', 'Portrait Photography', 'Event Documentation'],
    certifications: ['Professional Photography License', 'Drone Pilot License'],
    teamSize: 8,
    establishedYear: 2016
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'JazzCash',
    type: 'jazzcash',
    icon: '📱',
    description: 'Pay securely with your JazzCash mobile wallet',
    isActive: true
  },
  {
    id: '2',
    name: 'EasyPaisa',
    type: 'easypaisa',
    icon: '💳',
    description: 'Quick payment through EasyPaisa mobile account',
    isActive: true
  },
  {
    id: '3',
    name: 'Digital Wallet',
    type: 'wallet',
    icon: '💰',
    description: 'Use your Eventistan wallet balance',
    isActive: true
  },
  {
    id: '4',
    name: 'Cash Payment',
    type: 'cash',
    icon: '💵',
    description: 'Pay cash at the venue or designated location',
    isActive: true
  }
];