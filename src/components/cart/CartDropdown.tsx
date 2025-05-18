import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

export const CartDropdown = () => {
  const { bookings, removeBooking, totalItems } = useCart();

  const handleRemoveBooking = (id: string, hotelName: string) => {
    removeBooking(id);
    toast({
      title: "Reserva eliminada",
      description: `La reserva en ${hotelName} ha sido eliminada del carrito.`
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative p-2 h-9 w-9 rounded-full"
          aria-label="Carrito de compras"
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-hotel-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-medium">Carrito de reservas</h3>
        </div>
        
        <div className="max-h-60 overflow-auto">
          {bookings.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No hay reservas en el carrito</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-3 border-b hover:bg-gray-50">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-sm">{booking.hotel.name}</h4>
                  <button 
                    onClick={() => handleRemoveBooking(booking.id, booking.hotel.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  {format(booking.checkIn, "dd/MM/yyyy", { locale: es })} - {format(booking.checkOut, "dd/MM/yyyy", { locale: es })}
                </div>
                <div className="text-xs text-gray-500">
                  {booking.guests.adults} adultos, {booking.guests.children} niños
                </div>
                <div className="text-sm font-medium mt-1">
                  ${booking.price.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
        
        {bookings.length > 0 && (
          <div className="p-4">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${bookings.reduce((total, booking) => total + booking.price, 0).toFixed(2)}</span>
            </div>
            <Link to="/cart">
              <Button className="w-full bg-hotel-blue hover:bg-hotel-blue/90">
                Ver carrito
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};