

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelList from '@/components/hotel/HotelList';
import SearchDetailsBar from '@/components/hotel/SearchDetailsBar';
import { allHotels } from '@/data/hotelData';

const Hotels = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  
  
  const destinationId = searchParams.get('destination');
  const locationName = searchParams.get('location');
  
  
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const checkIn = checkInParam ? new Date(checkInParam) : undefined;
  const checkOut = checkOutParam ? new Date(checkOutParam) : undefined;
  
  
  const adultsParam = searchParams.get('adults');
  const childrenParam = searchParams.get('children');
  const roomsParam = searchParams.get('rooms');
  
  const [adults, setAdults] = useState(adultsParam ? Number(adultsParam) : 2);
  const [children, setChildren] = useState(childrenParam ? Number(childrenParam) : 0);
  const [rooms, setRooms] = useState(roomsParam ? Number(roomsParam) : 1);
  
  const [initialGuests, setInitialGuests] = useState(
    roomsParam 
      ? Array.from({ length: Number(roomsParam) }, (_, index) => ({
          id: index + 1,
          adults: index === 0 && adultsParam ? Number(adultsParam) : 1,
          children: index === 0 && childrenParam ? Number(childrenParam) : 0
        }))
      : [{ id: 1, adults: adultsParam ? Number(adultsParam) : 2, children: childrenParam ? Number(childrenParam) : 0 }]
  );
  
  useEffect(() => {
    if (destinationId) {
      const filtered = allHotels.filter(hotel => hotel.locationId === Number(destinationId));
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(allHotels);
    }
  }, [destinationId]);
  
  
  const handleGuestsChange = (newGuests: { id: number; adults: number; children: number }[]) => {
    const totalAdults = newGuests.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = newGuests.reduce((sum, room) => sum + room.children, 0);
    
    setAdults(totalAdults);
    setChildren(totalChildren);
    setRooms(newGuests.length);
    setInitialGuests(newGuests);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-hotel-light-bg">
      <Header />
      
      <main className="flex-grow">
        
        
        <SearchDetailsBar 
          locationName={locationName} 
          filteredHotelsCount={filteredHotels.length} 
          isMobile={isMobile}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          rooms={rooms}
          onGuestsChange={handleGuestsChange}
        />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row">
            <HotelList 
              filteredHotels={filteredHotels} 
              isMobile={isMobile} 
              initialDates={{ checkIn, checkOut }}
              initialGuests={initialGuests}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hotels;
