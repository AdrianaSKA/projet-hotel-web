
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard,Trash2,ShoppingCart,Check} from 'lucide-react';

const Cart = () => {
  const { bookings, removeBooking, clearCart, totalItems } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [idNumberError, setIdNumberError] = useState('');

  const totalAmount = bookings.reduce((total, booking) => total + booking.price, 0);

  const handleRemoveBooking = (id: string, hotelName: string) => {
    removeBooking(id);
    toast({
      title: "Reserva eliminada",
      description: `La reserva en ${hotelName} ha sido eliminada del carrito.`
    });
  };

  const handleInitCheckout = () => {
    if (!isLoggedIn) {
      toast({
        title: "Inicie sesión primero",
        description: "Debe iniciar sesión para continuar con la compra",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setShowConfirmation(true);
    
    setPasswordError('');
    setIdNumberError('');
  };
  
  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setIdNumber(value);
      setIdNumberError('');
    } else {
      setIdNumberError('');
    }
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    
    if (!/^[0-9]+$/.test(idNumber)) {
      setIdNumberError('');
      setIsProcessing(false);
      return;
    }
    
    
    setTimeout(() => {
      
      if (idNumber.length < 6) {
        toast({
          title: "Error de validación",
          description: "El número de cédula debe tener al menos 6 caracteres",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }
      
      
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find((u: any) => u.email === user?.email);
      
      if (!currentUser || currentUser.password !== password) {
        setPasswordError('La contraseña es incorrecta');
        toast({
          title: "Error de validación",
          description: "La contraseña ingresada no coincide con la contraseña de su cuenta",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }
      
      
      clearCart();
      setIsProcessing(false);
      setShowConfirmation(false);
      
      toast({
        title: "¡Compra exitosa!",
        description: "Tus reservas han sido confirmadas",
      });
      
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mi carrito de reservas</h1>
        
        {totalItems === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-500 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-6">No tienes ninguna reserva en tu carrito</p>
            <Button onClick={() => navigate('/hotels')} variant="outline">
              Explorar hoteles
            </Button>
          </div>
        ) : (
          <>
            <Table>
              <TableCaption>Listado de tus reservas pendientes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Huéspedes</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.hotel.name}
                    </TableCell>
                    <TableCell>
                      {format(booking.checkIn, "dd/MM/yyyy", { locale: es })} - 
                      {format(booking.checkOut, "dd/MM/yyyy", { locale: es })}
                      <div className="text-xs text-gray-500">{booking.nights} noches</div>
                    </TableCell>
                    <TableCell>
                      {booking.guests.adults} adultos, {booking.guests.children} niños
                      {booking.rooms > 1 && (
                        <div className="text-xs text-gray-500">{booking.rooms} habitaciones</div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">${booking.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveBooking(booking.id, booking.hotel.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={handleInitCheckout} 
                className="bg-hotel-blue hover:bg-hotel-blue/90 flex items-center gap-2"
              >
                <CreditCard size={18} />
                Finalizar compra
              </Button>
            </div>
            
            {showConfirmation && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Confirmar compra</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Total a pagar:</span>
                      <span className="font-bold">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {totalItems} {totalItems === 1 ? 'reserva' : 'reservas'}
                    </div>
                  </div>
                  
                  <form onSubmit={handleConfirmPurchase}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="idNumber" className="block text-sm font-medium mb-1">
                          Número de Cédula
                        </label>
                        <Input
                          id="idNumber"
                          value={idNumber}
                          onChange={handleIdNumberChange}
                          required
                          placeholder="Ingresa tu número de cédula"
                          className={idNumberError ? "border-red-500" : ""}
                        />
                        {idNumberError && (
                          <p className="text-sm text-red-500 mt-1">{idNumberError}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                          Contraseña de tu cuenta
                        </label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError('');
                          }}
                          required
                          placeholder="Ingresa tu contraseña"
                          className={passwordError ? "border-red-500" : ""}
                        />
                        {passwordError && (
                          <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowConfirmation(false)}
                        disabled={isProcessing}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-hotel-blue hover:bg-hotel-blue/90"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-1">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Procesando...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Check size={18} />
                            Confirmar compra
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;