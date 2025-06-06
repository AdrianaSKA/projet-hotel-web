

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelList from '@/components/hotel/HotelList';
import HotelFilters from '@/components/hotel/HotelFilters';
import SearchDetailsBar from '@/components/hotel/SearchDetailsBar';
import { allHotels } from '@/data/hotelData';

const Hotels = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const [priceFilter, setPriceFilter] = useState<[number]>([0]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);


  const allAmenities = Array.from(
    new Set(allHotels.flatMap(hotel => hotel.amenities))
  ).sort();
  
  
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
    let filtered = [...allHotels];
    
  
    if (destinationId) {
      filtered = filtered.filter(hotel => hotel.locationId === Number(destinationId));
    }
    
  
    if (priceFilter[0] > 0) {
      filtered = filtered.filter(hotel => hotel.price <= priceFilter[0]);
    }
    
  
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    setFilteredHotels(filtered);
  }, [destinationId, priceFilter, selectedAmenities]);
  
  
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setSelectedAmenities(prev => {
      if (checked) {
        return [...prev, amenity];
      } else {
        return prev.filter(item => item !== amenity);
      }
    });
  };
  
  
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

        {isMobile && (
          <div className="bg-white border-b border-hotel-light-gray p-4">
            <div className="relative">
              <Input
                className="pl-4 pr-4 py-2 bg-hotel-light-bg"
                placeholder="¿Adónde vas?"
                readOnly
                value={locationName || ""}
              />
            </div>
          </div>
        )}
        

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
          <div className="flex flex-col md:flex-row md:gap-6">


            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <HotelFilters 
                minPrice={priceFilter[0]}
                maxPrice={1000}
                onPriceChange={setPriceFilter}
                onAmenityChange={handleAmenityChange}
                selectedAmenities={selectedAmenities}
                allAmenities={allAmenities}
                isMobile={isMobile}
              />
            </div>
            

            <div className="w-full md:w-3/4">
              <HotelList 
                filteredHotels={filteredHotels} 
                isMobile={isMobile} 
                initialDates={{ checkIn, checkOut }}
                initialGuests={initialGuests}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hotels;
