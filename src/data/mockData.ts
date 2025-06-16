import { Event, Vendor, User, PaymentMethod } from '../types';

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
  joinedDate: '2023-01-15'
};

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
    price: 5000
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
    bookedSeats: 567
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
    bookedSeats: 145
  }
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Royal Caterers',
    category: 'catering',
    description: 'Premium catering services specializing in traditional Pakistani and continental cuisine for all types of events.',
    city: 'Karachi',
    rating: 4.8,
    reviews: 156,
    priceRange: 'premium',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contact: {
      phone: '+92-21-1234567',
      email: 'info@royalcaterers.pk'
    },
    services: ['Traditional Pakistani Cuisine', 'Continental Food', 'BBQ Specialists', 'Live Cooking Stations']
  },
  {
    id: '2',
    name: 'Majestic Venues',
    category: 'venue',
    description: 'Elegant wedding halls and event venues with modern amenities and traditional Pakistani architecture.',
    city: 'Lahore',
    rating: 4.6,
    reviews: 89,
    priceRange: 'mid-range',
    image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contact: {
      phone: '+92-42-1234567',
      email: 'bookings@majesticvenues.pk'
    },
    services: ['Wedding Halls', 'Conference Rooms', 'Outdoor Gardens', 'Parking Facilities']
  },
  {
    id: '3',
    name: 'Pixel Perfect Photography',
    category: 'photography',
    description: 'Professional wedding and event photography capturing your special moments with artistic excellence.',
    city: 'Islamabad',
    rating: 4.9,
    reviews: 203,
    priceRange: 'premium',
    image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contact: {
      phone: '+92-51-1234567',
      email: 'info@pixelperfect.pk'
    },
    services: ['Wedding Photography', 'Event Coverage', 'Pre-wedding Shoots', 'Drone Photography']
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