import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Search, Calendar as CalendarIcon, MapPin,X,Lock} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import GuestSelector from './GuestSelector';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { Matcher } from 'react-day-picker';



const destinations = [
  {
    id: 1,
    name: 'Las Vegas',
    location: 'Nevada, Estados Unidos',
    icon: 'mapPin',
    hotels: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Truckee',
    location: 'California, Estados Unidos',
    icon: 'mapPin',
    hotels: [4, 5, 6, 7]
  },
  {
    id: 3,
    name: 'Los Angeles',
    location: 'California, Estados Unidos',
    icon: 'mapPin',
    hotels: [8, 9, 10]
  },
  {
    id: 4,
    name: 'Miami',
    location: 'Florida, Estados Unidos',
    icon: 'mapPin',
    hotels: [11, 12, 13]
  },
  {
    id: 5,
    name: 'Nueva York',
    location: 'Nueva York, Estados Unidos',
    icon: 'mapPin',
    hotels: [14, 15]
  }
];

const HeroSearch = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isLoggedIn } = useAuth();
  const [destination, setDestination] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [guests, setGuests] = useState([{ id: 1, adults: 2, children: 0 }]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  const handleDestinationSelect = (selected: typeof destinations[0]) => {
    setSelectedDestination(selected);
    setDestination(selected.name);
    setIsDestinationOpen(false);
  };
  
  const clearDestination = () => {
    setDestination('');
    setSelectedDestination(null);
  };
  
  const handleGuestsChange = (newGuests: { id: number; adults: number; children: number }[]) => {
    setGuests(newGuests);
  };
  
  const handleSearch = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    
    if (!selectedDestination) {
      toast({
        title: "Selecciona un destino",
        description: "Por favor, selecciona un destino antes de buscar",
        variant: "destructive"
      });
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Selecciona fechas",
        description: "Por favor, selecciona fechas de entrada y salida",
        variant: "destructive"
      });
      return;
    }
    
    
    const queryParams = new URLSearchParams();
    queryParams.append('destination', selectedDestination.id.toString());
    queryParams.append('location', selectedDestination.name);
    
    
    queryParams.append('checkIn', checkInDate.toISOString());
    queryParams.append('checkOut', checkOutDate.toISOString());
    
    
    const totalAdults = guests.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = guests.reduce((sum, room) => sum + room.children, 0);
    
    queryParams.append('adults', totalAdults.toString());
    queryParams.append('children', totalChildren.toString());
    queryParams.append('rooms', guests.length.toString());
    
    navigate(`/hotels?${queryParams.toString()}`);
  };
  
  return (
    <div className="relative w-full">
      
      <div className="absolute inset-0 bg-gradient-to-r from-hotel-blue/20 to-hotel-blue/10 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2000&auto=format&fit=crop')",
            opacity: 0.8
          }}
        />
      </div>
      
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
              Encuentra tu hotel ideal
            </h1>
            <p className="text-xl text-white drop-shadow-md">
              Más de 1.000.000 de alojamientos en todo el mundo
            </p>
          </div>
          
          
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="space-y-4">
              
              <Popover open={isDestinationOpen} onOpenChange={setIsDestinationOpen}>
                <PopoverTrigger asChild>
                  <div className="relative cursor-pointer">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray" size={20} />
                    <Input
                      className="pl-10 h-12 border-hotel-light-gray cursor-pointer"
                      placeholder="¿Adónde vas?"
                      value={destination}
                      readOnly
                      onClick={() => setIsDestinationOpen(true)}
                    />
                    {destination && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDestination();
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray hover:text-hotel-dark"
                        aria-label="Clear destination"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[350px] max-h-[400px] overflow-hidden" align="start">
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Buscar destinos..." />
                    <CommandList className="max-h-[330px] overflow-auto">
                      <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                      <CommandGroup>
                        {destinations.map((item) => (
                          <CommandItem 
                            key={item.id}
                            onSelect={() => handleDestinationSelect(item)}
                            className="flex items-start p-2 cursor-pointer hover:bg-gray-100"
                          >
                            <div className="flex items-center w-full">
                              <div className="mr-2">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div className="flex flex-col">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.location}</p>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                        <CommandItem className="flex items-start p-2 cursor-pointer hover:bg-gray-100">
                          <div className="flex items-center w-full">
                            <div className="mr-2">
                              <Search className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-medium">Buscar "I"</p>
                            </div>
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-3'}`}>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray pointer-events-none" size={20} />
                      <Input
                        className="pl-10 h-12 border-hotel-light-gray cursor-pointer"
                        placeholder="Entrada"
                        readOnly
                        value={checkInDate ? format(checkInDate, "dd/MM/yyyy", { locale: es }) : ""}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray pointer-events-none" size={20} />
                      <Input
                        className="pl-10 h-12 border-hotel-light-gray cursor-pointer"
                        placeholder="Salida"
                        readOnly
                        value={checkOutDate ? format(checkOutDate, "dd/MM/yyyy", { locale: es }) : ""}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={
                        ((date: Date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          (checkInDate && date <= checkInDate)
                        ) as Matcher
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                
                <GuestSelector 
                  initialRooms={guests} 
                  onChange={handleGuestsChange}
                />
              </div>
              
              
              <Button 
                className="w-full h-12 bg-hotel-red hover:bg-hotel-red/90 text-white text-lg font-medium"
                onClick={handleSearch}
              >
                <Search className="mr-2" size={20} />
                Buscar
              </Button>
              
              
              {!isLoggedIn && (
                <div className="text-xs text-center text-hotel-dark-gray flex items-center justify-center">
                  <Lock size={14} className="mr-1" />
                  <span>Inicia sesión para buscar y reservar hoteles</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-hotel-blue">
              Inicia sesión para continuar
            </DialogTitle>
            <DialogDescription className="text-center">
              Necesitas iniciar sesión para buscar y reservar hoteles
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

export default HeroSearch;
