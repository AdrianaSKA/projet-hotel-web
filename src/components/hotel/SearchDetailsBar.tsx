

import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import GuestSelector from '@/components/GuestSelector';

interface SearchDetailsBarProps {
  locationName: string | null;
  filteredHotelsCount: number;
  isMobile: boolean;
  checkIn?: Date;
  checkOut?: Date;
  adults: number;
  children: number;
  rooms: number;
  onGuestsChange?: (rooms: { id: number; adults: number; children: number }[]) => void;

}

const SearchDetailsBar = ({ 
  locationName, 
  filteredHotelsCount, 
  isMobile,
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
  onGuestsChange
}: SearchDetailsBarProps) => {
  const initialRooms = [
    { id: 1, adults, children }
  ];

  
  if (rooms > 1) {
    for (let i = 1; i < rooms; i++) {
      initialRooms.push({ id: i + 1, adults: 1, children: 0 });
    }
  }


  return (
    <div className="bg-white border-b border-hotel-light-gray py-3 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="font-bold text-xl mb-1">
              {locationName 
                ? `${locationName}: ${filteredHotelsCount} propiedades encontradas` 
                : `${filteredHotelsCount} propiedades encontradas`}
            </h1>
            <div className="text-sm text-hotel-dark-gray flex flex-wrap items-center gap-3">
              <span className="flex items-center">
                <CalendarDays size={14} className="mr-1" />
                {checkIn && checkOut 
                  ? `${format(checkIn, 'dd MMM', { locale: es })} - ${format(checkOut, 'dd MMM', { locale: es })}`
                  : 'Fechas no seleccionadas'}
              </span>
              <span className="flex items-center gap-1">
                <GuestSelector 
                  initialRooms={initialRooms} 
                  onChange={onGuestsChange}
                />
              </span>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default SearchDetailsBar;
