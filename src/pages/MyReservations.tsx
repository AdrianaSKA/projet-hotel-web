

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const MyReservations = () => {
  const { purchasedBookings } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-hotel-light-bg">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-hotel-blue mb-6">Mis Reservas</h1>
        
        {purchasedBookings.length === 0 ? (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold text-hotel-dark mb-4">No tienes reservas</h2>
            <p className="text-gray-600 mb-6">
              Aún no has realizado ninguna compra. Explora nuestros hoteles y realiza tu primera reserva.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Fechas</TableHead>
                    <TableHead>Habitaciones</TableHead>
                    <TableHead>Huéspedes</TableHead>
                    <TableHead>Precio Total</TableHead>
                    <TableHead>Fecha de Compra</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchasedBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.hotel.name}</TableCell>
                      <TableCell>
                        {format(new Date(booking.checkIn), "dd/MM/yyyy", { locale: es })} - {format(new Date(booking.checkOut), "dd/MM/yyyy", { locale: es })}
                        <div className="text-xs text-gray-500">({booking.nights} noches)</div>
                      </TableCell>
                      <TableCell>{booking.rooms}</TableCell>
                      <TableCell>
                        {booking.guests.adults} adultos
                        {booking.guests.children > 0 && `, ${booking.guests.children} niños`}
                      </TableCell>
                      <TableCell className="font-medium text-hotel-blue">${booking.price.toFixed(2)}</TableCell>
                      <TableCell className="text-gray-500">
                        {format(new Date(booking.timestamp), "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyReservations;