
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import HotelCard from './HotelCard';
import { Hotel } from '@/types/hotel';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

interface HotelListProps {
  filteredHotels: Hotel[];
  isMobile: boolean;
  initialDates?: { checkIn?: Date; checkOut?: Date };
  initialGuests?: { adults: number; children: number; id: number }[];

}

const HotelList = ({ filteredHotels, isMobile, initialDates, initialGuests }: HotelListProps) => {

  const { isLoggedIn } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  

  const handleShowLoginDialog = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    }
  };
  

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">Ordenar por: <span className="font-medium">Recomendados</span></div>
      </div>
      
      {filteredHotels.length > 0 ? (
        filteredHotels.map(hotel => (
          <HotelCard 
            key={hotel.id} 
            hotel={hotel} 
            initialDates={initialDates}
            initialGuests={initialGuests}
            isLoggedIn={isLoggedIn}
            onAuthRequired={handleShowLoginDialog}
          />
        ))
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium mb-2">No se encontraron hoteles</p>
          <p className="text-gray-500">Prueba a cambiar tus filtros de búsqueda</p>
        </div>
      )}
      
      
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-hotel-blue">
              Inicia sesión para continuar
            </DialogTitle>
            <DialogDescription className="text-center">
              Necesitas iniciar sesión para reservar hoteles
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3 mt-4">
            <Link to="/login" className="w-full">
              <Button className="w-full bg-hotel-blue hover:bg-hotel-blue/90">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register" className="w-full">
              <Button variant="outline" className="w-full border-hotel-blue text-hotel-blue">
                Registrarse
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelList;
