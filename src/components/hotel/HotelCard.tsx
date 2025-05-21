import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Hotel } from '@/types/hotel';
import { Star, Calendar as CalendarIcon, CheckSquare, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Card } from "@/components/ui/card";
import { Matcher } from 'react-day-picker';
import { useCart } from '@/contexts/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';


const mockReviews = [
  {
    id: 1,
    name: "Carlos Martínez",
    rating: 5,
    date: "15/04/2025",
    comment: "Excelente hotel, las habitaciones son amplias y limpias. El personal muy amable y el desayuno buffet es variado y de calidad. Definitivamente volveré."
  },
  {
    id: 2,
    name: "María González",
    rating: 4,
    date: "02/05/2025",
    comment: "Muy buena ubicación, cerca de todas las atracciones. Las habitaciones son cómodas aunque un poco pequeñas. El servicio es excelente."
  },
  {
    id: 3,
    name: "Juan Pérez",
    rating: 5,
    date: "10/03/2025",
    comment: "Increíble experiencia. El personal fue muy atento y las instalaciones son modernas y limpias. La piscina tiene una vista espectacular. Altamente recomendado."
  }
];

interface HotelCardProps {
  hotel: Hotel;
  initialDates?: { checkIn?: Date; checkOut?: Date };
  initialGuests?: { adults: number; children: number; id: number }[];
  isLoggedIn: boolean;
  onAuthRequired: () => void;
}

const HotelCard = ({ hotel, initialDates, initialGuests, isLoggedIn, onAuthRequired }: HotelCardProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(initialDates?.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(initialDates?.checkOut);
  const [adults, setAdults] = useState(initialGuests && initialGuests.length > 0 ? initialGuests[0].adults : 2);
  const [children, setChildren] = useState(initialGuests && initialGuests.length > 0 ? initialGuests[0].children : 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const isMobile = useIsMobile();
  
  const { addBooking, checkRoomAvailability } = useCart();


  const totalNights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
  
  const roomCount = initialGuests ? initialGuests.length : 1;
  const roomsAvailable = checkRoomAvailability(hotel.id, roomCount);
  const subtotal = hotel.price * totalNights * roomCount;
  const discount = (subtotal * hotel.discount) / 100;
  const total = subtotal - discount;

  const handleBooking = () => {
    if (!isLoggedIn) {
      onAuthRequired();
      return;
    }
    
    if (!roomsAvailable) {
      toast({
        title: "No hay habitaciones disponibles",
        description: "Lo sentimos, no quedan habitaciones disponibles en este hotel.",
        variant: "destructive"
      });
      return;
    }
    
    setIsBookingOpen(true);
  };
  
  const handleReviews = () => {
    setIsReviewsOpen(true);
  };
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido");
      return false;
    }
    setEmailError("");
    return true;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setPhone(value);
      setPhoneError("");
    }
  };
  
  const validateBookingForm = () => {
    let isValid = true;
    
    if (!name || !email || !phone) {
      toast({
        title: "Error al reservar",
        description: "Por favor, completa todos los campos",
        variant: "destructive"
      });
      isValid = false;
    }
    
    if (!validateEmail(email)) {
      isValid = false;
    }
    
    if (phone && !/^[0-9]+$/.test(phone)) {
      setPhoneError("");
      isValid = false;
    }
    
    if (!checkIn || !checkOut) {
      toast({
        title: "Error al reservar",
        description: "Selecciona fechas de entrada y salida",
        variant: "destructive"
      });
      isValid = false;
    }
    
    return isValid;
  };
  
  const bookHotel = () => {
    if (!validateBookingForm()) return;
    
    setShowConfirmButton(true);
  };
  
  const confirmBooking = () => {

    const bookingData = {
      id: `booking-${Date.now()}`,
      hotel,
      checkIn: checkIn!,
      checkOut: checkOut!,
      guests: {
        adults,
        children
      },
      guestInfo: {
        name,
        email,
        phone
      },
      price: parseFloat(total.toFixed(2)),
      nights: totalNights,
      rooms: roomCount, 
      timestamp: new Date()
    };
    
    addBooking(bookingData);
    
    toast({
      title: "Reserva añadida al carrito",
      description: `Tu reserva en ${hotel.name} ha sido añadida al carrito de compras.`,
    });
    

    setIsBookingOpen(false);
    

    setShowConfirmButton(false);
  };
  

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          size={16}
        />
      );
    }
    return stars;
  };
  
  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex flex-col md:flex-row">

        <div className="md:w-1/3 relative">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-48 md:h-full object-cover" 
          />
          

          <div className="absolute bottom-2 left-2 bg-hotel-blue text-white px-2 py-1 rounded-md flex items-center">
            <span className="font-bold mr-1">{hotel.rating}</span>
            <Star className="text-yellow-300" size={14} fill="currentColor" />
          </div>
        </div>
        

        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-hotel-blue">{hotel.name}</h3>
            <div className="text-sm text-gray-600">({hotel.reviews} opiniones)</div>
          </div>
          
          <div className="text-sm text-gray-700 mb-2">{hotel.location}</div>
          
          <div className="flex flex-wrap gap-2 my-2">
            {hotel.amenities && hotel.amenities.slice(0, 2).map((amenity, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <CheckSquare className="mr-1" size={14} />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{hotel.description}</p>
          
          <div className={`mt-auto ${isMobile ? 'flex flex-col' : 'flex justify-between items-end'}`}>
            <div>
              <div className="text-red-500 text-xs font-semibold mb-1">
                {hotel.discount > 0 && `${hotel.discount}% DESCUENTO`}
              </div>
              <p className="text-hotel-blue font-medium text-sm">
                Precio por noche:
              </p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-hotel-blue">
                  ${hotel.price.toFixed(2)}
                </p>
                {hotel.discount > 0 && (
                  <p className="text-sm text-gray-500 line-through">${(hotel.price + (hotel.price * hotel.discount / 100)).toFixed(2)}</p>
                )}
              </div>
              {totalNights > 0 && (
                <p className="text-sm text-green-500">
                  Total: ${total.toFixed(2)} ({totalNights} noches{roomCount > 1 ? `, ${roomCount} habitaciones` : ''})
                </p>
              )}
            </div>
            
            {isMobile ? (
              <div className="flex gap-2 mt-4 w-full">
                <Button 
                  onClick={handleReviews} 
                  className="bg-hotel-blue hover:bg-hotel-blue/90 text-white flex-1"
                  variant="outline"
                >
                  <MessageSquare size={16} className="mr-1" />
                  Reseñas
                </Button>
                <Button 
                  onClick={handleBooking} 
                  className="bg-hotel-red hover:bg-hotel-red/90 text-white flex-1"
                  disabled={!roomsAvailable}
                >
                  {roomsAvailable ? 'Reservar ahora' : 'No disponible'}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={handleReviews} 
                  className="bg-hotel-blue hover:bg-hotel-blue/90 text-white"
                  variant="outline"
                >
                  <MessageSquare size={16} className="mr-1" />
                  Reseñas
                </Button>
                <Button 
                  onClick={handleBooking} 
                  className="bg-hotel-red hover:bg-hotel-red/90 text-white"
                  disabled={!roomsAvailable}
                >
                  {roomsAvailable ? 'Reservar ahora' : 'No hay habitaciones disponibles'}
                </Button>
              </div>
            )}
          </div>
          

          {!roomsAvailable && (
            <div className="mt-2 text-sm text-red-500 text-right">
              No quedan habitaciones disponibles
            </div>
          )}
        </div>
      </div>
      

      <Dialog open={isBookingOpen} onOpenChange={(open) => {
        setIsBookingOpen(open);
        if (!open) setShowConfirmButton(false); 
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Reserva en {hotel.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-2 gap-4 mb-4">

              <div>
                <Label htmlFor="check-in" className="text-right mb-2 block">
                  Entrada
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray pointer-events-none" size={16} />
                      <Input
                        id="check-in"
                        className="pl-8 h-10 border-hotel-light-gray cursor-pointer text-sm"
                        placeholder="Entrada"
                        readOnly
                        value={checkIn ? format(checkIn, "dd/MM/yyyy", { locale: es }) : ""}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 z-50 w-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              

              <div>
                <Label htmlFor="check-out" className="text-right mb-2 block">
                  Salida
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray pointer-events-none" size={16} />
                      <Input
                        id="check-out"
                        className="pl-8 h-10 border-hotel-light-gray cursor-pointer text-sm"
                        placeholder="Salida"
                        readOnly
                        value={checkOut ? format(checkOut, "dd/MM/yyyy", { locale: es }) : ""}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 z-50 w-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={
                        ((date: Date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                          (checkIn && date <= checkIn)
                        ) as Matcher}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Habitaciones
              </Label>
              <div className="col-span-3">{roomCount}</div>
            </div>


            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) validateEmail(e.target.value);
                  }} 
                  className={emailError ? "border-red-500" : ""}
                  onBlur={() => validateEmail(email)}
                />
                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Teléfono
              </Label>
              <div className="col-span-3">
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={handlePhoneChange}
                  className={phoneError ? "border-red-500" : ""}
                  
                />
                {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Total
              </Label>
              <div className="col-span-3 font-bold text-xl text-hotel-blue">
                ${total.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({totalNights} noches{roomCount > 1 ? `, ${roomCount} habitaciones` : ''})
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2">
            {!showConfirmButton ? (
              <Button type="button" onClick={bookHotel} className="w-full">
                Continuar
              </Button>
            ) : (
              <Button type="button" onClick={confirmBooking} className="w-full bg-green-600 hover:bg-green-700">
                Confirmar reserva y añadir al carrito
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Reseñas de {hotel.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsReviewsOpen(false)} className="w-full">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default HotelCard;