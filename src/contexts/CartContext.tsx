
import React, { createContext, useContext, useState } from 'react';
import { Hotel } from '@/types/hotel';

export interface BookingItem {
  id: string;
  hotel: Hotel;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
  };
  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
  price: number;
  nights: number;
  rooms: number;
  timestamp: Date;
}

interface CartContextType {
  bookings: BookingItem[];
  purchasedBookings: BookingItem[];
  addBooking: (booking: BookingItem) => void;
  removeBooking: (id: string) => void;
  purchaseBookings: () => void;
  clearCart: () => void;
  totalItems: number;
  availableRooms: Record<number, number>;
  checkRoomAvailability: (hotelId: number, roomsRequested: number) => boolean;
  updateRoomAvailability: (hotelId: number, roomsBooked: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [purchasedBookings, setPurchasedBookings] = useState<BookingItem[]>([]);
  
  // Hoteles y habitaciones
  const [availableRooms, setAvailableRooms] = useState<Record<number, number>>({
    1: 10, 
    2: 15, 
    3: 8,  
    4: 12, 
    5: 20, 
    6: 18, 
    7: 14, 
    8: 5,  
    9: 7,  
    10: 25, 
    11: 15, 
    12: 10, 
    13: 20, 
    14: 8,  
    15: 22, 
  });

  const addBooking = (booking: BookingItem) => {
    setBookings((prev) => [...prev, booking]);

    updateRoomAvailability(booking.hotel.id, booking.rooms);
  };

  const removeBooking = (id: string) => {

    const bookingToRemove = bookings.find(booking => booking.id === id);
    if (bookingToRemove) {

      updateRoomAvailability(bookingToRemove.hotel.id, -bookingToRemove.rooms);
    }
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const purchaseBookings = () => {
    
    setPurchasedBookings((prev) => [...prev, ...bookings]);
    setBookings([]);
  };

  const clearCart = () => {
    
    bookings.forEach(booking => {
      updateRoomAvailability(booking.hotel.id, -booking.rooms);
    });
    setBookings([]);
  };

  const checkRoomAvailability = (hotelId: number, roomsRequested: number) => {
    return (availableRooms[hotelId] || 0) >= roomsRequested;
  };

  const updateRoomAvailability = (hotelId: number, roomsBooked: number) => {
    setAvailableRooms(prev => ({
      ...prev,
      [hotelId]: Math.max(0, (prev[hotelId] || 0) - roomsBooked)
    }));
  };

  return (
    <CartContext.Provider
      value={{
        bookings,
        purchasedBookings,
        addBooking,
        removeBooking,
        purchaseBookings,
        clearCart,
        totalItems: bookings.length,
        availableRooms,
        checkRoomAvailability,
        updateRoomAvailability
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('');
  }
  return context;
};