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
  addBooking: (booking: BookingItem) => void;
  removeBooking: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  const addBooking = (booking: BookingItem) => {
    setBookings((prev) => [...prev, booking]);
  };

  const removeBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const clearCart = () => {
    setBookings([]);
  };

  return (
    <CartContext.Provider
      value={{
        bookings,
        addBooking,
        removeBooking,
        clearCart,
        totalItems: bookings.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};