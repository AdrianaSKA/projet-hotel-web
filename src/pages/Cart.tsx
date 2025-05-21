
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X, ShoppingCart, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Cart = () => {
  const { bookings, removeBooking, purchaseBookings, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  
  const totalAmount = bookings.reduce((total, booking) => total + booking.price, 0);
  
  const handleRemoveBooking = (id: string) => {
    removeBooking(id);
    toast({
      title: "Reserva eliminada",
      description: "La reserva ha sido eliminada del carrito.",
    });
  };
  
  const handleOpenPaymentDialog = () => {
    if (bookings.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No tienes reservas en tu carrito.",
        variant: "destructive",
      });
      return;
    }
    setIsPaymentDialogOpen(true);
  };
  
  const handlePurchase = () => {

    setIsPaymentDialogOpen(false);
    
    purchaseBookings();
    toast({
      title: "¡Compra realizada!",
      description: `Pago realizado con ${paymentMethod === "card" ? "tarjeta" : "PayPal"}.`,
    });
    

    navigate('/my-reservations');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-hotel-light-bg">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-hotel-blue mb-6">Carrito de Compras</h1>
        
        {bookings.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-hotel-dark mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">
              Añade reservas de hotel a tu carrito para continuar con tu compra.
            </p>
            <Button onClick={() => navigate('/hotels')} className="bg-hotel-blue hover:bg-hotel-blue/90">
              Explorar hoteles
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel</TableHead>
                      <TableHead>Fechas</TableHead>
                      <TableHead>Habitaciones</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.hotel.name}</TableCell>
                        <TableCell>
                          {format(new Date(booking.checkIn), "dd/MM/yyyy", { locale: es })} - 
                          {format(new Date(booking.checkOut), "dd/MM/yyyy", { locale: es })}
                          <div className="text-xs text-gray-500">({booking.nights} noches)</div>
                        </TableCell>
                        <TableCell>{booking.rooms}</TableCell>
                        <TableCell>${booking.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-500 hover:text-red-500"
                            onClick={() => handleRemoveBooking(booking.id)}
                          >
                            <X size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleOpenPaymentDialog}
                    className="w-full bg-hotel-blue hover:bg-hotel-blue/90"
                  >
                    Completar compra
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      clearCart();
                      toast({
                        title: "Carrito vaciado",
                        description: "Se han eliminado todas las reservas del carrito.",
                      });
                    }}
                  >
                    Vaciar carrito
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Método de pago</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value) => setPaymentMethod(value as "card" | "paypal")}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="card" id="card" />
                  <label 
                    htmlFor="card" 
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Tarjeta de crédito/débito</span>
                    </div>
                    <div className="flex gap-1">
                      <img src="https://icrono.com/wp-content/uploads/2022/05/png-american-express-logo-png-Visa-Mastercard-American-Express-Logo.png" alt="tarjetas" className="h-10" />
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <label 
                    htmlFor="paypal" 
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-[#003087] text-white font-bold rounded-sm w-5 h-5 text-xs">P</div>
                      <span>PayPal</span>
                    </div>
                    <div>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png" alt="PayPal" className="h-10" />
                    </div>
                  </label>
                </div>
              </RadioGroup>
              
              <Button 
                onClick={handlePurchase}
                className="w-full mt-6 bg-hotel-blue hover:bg-hotel-blue/90"
              >
                {paymentMethod === "card" ? "Pagar con tarjeta" : "Pagar con PayPal"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;