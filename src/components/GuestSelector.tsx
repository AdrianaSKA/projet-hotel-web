
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, UserRound } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

interface Room {
  id: number;
  adults: number;
  children: number;

}

const GuestSelector = ({ 
  initialRooms = [{ id: 1, adults: 2, children: 0 }],
  onChange
}: { 
  initialRooms?: Room[];
  onChange?: (rooms: Room[]) => void;
}) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const MAX_ROOMS = 8;
  
  const getTotalGuests = (): number => {
    return rooms.reduce((total, room) => total + room.adults + room.children, 0);
  };

  const getRoomsText = (): string => {
    const totalGuests = getTotalGuests();
    const roomsCount = rooms.length;
    
    return `${totalGuests} ${totalGuests === 1 ? 'persona' : 'personas'}, ${roomsCount} ${roomsCount === 1 ? 'habitación' : 'habitaciones'}`;
  };
  
  const addRoom = () => {
    if (rooms.length >= MAX_ROOMS) return;
    
    const newRoom = { id: rooms.length + 1, adults: 1, children: 0 };
    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    onChange?.(updatedRooms);
  };
  
  const removeRoom = (id: number) => {
    
    const filteredRooms = rooms.filter(room => room.id !== id);
    
    
    const renumberedRooms = filteredRooms.map((room, index) => ({
      ...room,
      id: index + 1
    }));
    
    setRooms(renumberedRooms);
    onChange?.(renumberedRooms);
  };
  
  const updateRoom = (id: number, field: 'adults' | 'children', value: number) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === id) {
        return { ...room, [field]: value };
      }
      return room;
    });
    setRooms(updatedRooms);
    onChange?.(updatedRooms);
  };
  
  const incrementGuest = (id: number, field: 'adults' | 'children') => {
    const room = rooms.find(r => r.id === id);
    if (!room) return;
    const currentValue = room[field];
    updateRoom(id, field, currentValue + 1);
  };
  
  const decrementGuest = (id: number, field: 'adults' | 'children') => {
    const room = rooms.find(r => r.id === id);
    if (!room) return;
    const currentValue = room[field];
    if (field === 'adults' && currentValue <= 1) return;
    if (currentValue <= 0) return;
    updateRoom(id, field, currentValue - 1);
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hotel-dark-gray" size={20} />
          <input
            className="pl-10 h-12 border-hotel-light-gray cursor-pointer w-full rounded-md border bg-background px-3 py-2 text-sm"
            readOnly
            placeholder="Huéspedes"
            value={getRoomsText()}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="center">
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {rooms.map((room) => (
            <div key={room.id} className="space-y-3 pb-4 border-b border-gray-100">
              <h3 className="font-medium">Habitación {room.id}</h3>
              
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Adultos</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className={`rounded-full w-8 h-8 flex items-center justify-center border ${
                      room.adults <= 1 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => decrementGuest(room.id, 'adults')}
                    disabled={room.adults <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center">{room.adults}</span>
                  <button 
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700"
                    onClick={() => incrementGuest(room.id, 'adults')}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Niños</p>
                  <p className="text-sm text-gray-500">0 a 17 años</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    className={`rounded-full w-8 h-8 flex items-center justify-center border ${
                      room.children <= 0 ? 'border-gray-200 text-gray-300' : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => decrementGuest(room.id, 'children')}
                    disabled={room.children <= 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center">{room.children}</span>
                  <button 
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700"
                    onClick={() => incrementGuest(room.id, 'children')}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              
              {rooms.length > 1 && (
                <div className="text-center">
                  <button 
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    onClick={() => removeRoom(room.id)}
                  >
                    Eliminar habitación
                  </button>
                </div>
              )}
            </div>
          ))}
          
          
          <div className="text-center">
            <button 
              className={`text-sm font-medium ${rooms.length >= MAX_ROOMS ? 'text-gray-300 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'}`}
              onClick={addRoom}
              disabled={rooms.length >= MAX_ROOMS}
            >
              Agregar otra habitación
            </button>
          </div>
          
          
          {rooms.length >= 2 && (
            <div className="mt-6 flex justify-between items-center border-t pt-4 border-gray-100">
              <p className="text-sm text-blue-500">¿Quieres reservar 9 o más habitaciones?</p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">Listo</Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GuestSelector;
