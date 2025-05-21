
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MessageSquare, Map } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setPhone(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error",
        description: "Por favor, introduce un email válido",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactar con nosotros. Te responderemos lo antes posible.",
    });
    

    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">

        <div className="bg-hotel-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contacta con AlojateYa</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Estamos aquí para responder cualquier pregunta que puedas tener sobre nuestros servicios. Contáctanos y te responderemos lo antes posible.
            </p>
          </div>
        </div>
        

        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-hotel-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                    <Phone className="text-hotel-blue" />
                  </div>
                  <CardTitle>Llámanos</CardTitle>
                  <CardDescription>Disponible de lunes a viernes 9:00 - 18:00</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-lg text-hotel-blue">+593 98 765 4321</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-hotel-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                    <Mail className="text-hotel-blue" />
                  </div>
                  <CardTitle>Escríbenos</CardTitle>
                  <CardDescription>Te responderemos lo antes posible</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-lg text-hotel-blue">info@hotmail.com</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-hotel-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                    <Map className="text-hotel-blue" />
                  </div>
                  <CardTitle>Visítanos</CardTitle>
                  <CardDescription>Nuestra oficina central</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-lg">Av. Amazonas, Quito, Ecuador</p>
                </CardContent>
              </Card>
            </div>
            

            <div className="max-w-3xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario a continuación y nos pondremos en contacto contigo pronto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-medium">Nombre</label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Tu nombre" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="tu@email.com" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="font-medium">Teléfono</label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        placeholder="Tu número de teléfono" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-medium">Mensaje</label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="¿En qué podemos ayudarte?" 
                        rows={4} 
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full md:w-auto bg-hotel-blue hover:bg-hotel-blue/90">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        

        <div className="bg-hotel-gray py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestra ubicación</h2>
            <div className="bg-white p-2 rounded-lg shadow-md">
              <div className="aspect-video w-full rounded overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.799571622943!2d-78.4869186!3d-0.1809786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sUnited%20Nations%20Ave%20%26%20Amazonas%20Ave%2C%20Quito%20170135%2C%20Ecuador!5e0!3m2!1sen!2sus!4v1653042951742!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AlojateYa direccion"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;