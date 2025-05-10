

import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';


const registerSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Formato de correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    const success = register(values.name, values.email, values.password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-hotel-blue text-center mb-6">
              Crear una cuenta
            </h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-hotel-dark">Nombre completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            placeholder="Tu nombre completo" 
                            className="pl-10"
                          />
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-dark-gray" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-hotel-dark">Correo electrónico</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            placeholder="tu@email.com" 
                            className="pl-10"
                          />
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-dark-gray" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-hotel-dark">Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="Mínimo 6 caracteres" 
                            className="pl-10"
                          />
                          <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-dark-gray" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-hotel-dark">Confirmar contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="Confirma tu contraseña" 
                            className="pl-10"
                          />
                          <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-dark-gray" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300 text-hotel-blue focus:ring-hotel-blue"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    Acepto los <a href="#" className="text-hotel-blue hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-hotel-blue hover:underline">Política de Privacidad</a>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-hotel-blue hover:bg-hotel-blue/90 flex items-center justify-center">
                  <UserPlus size={18} className="mr-2" />
                  Registrarse
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-hotel-blue hover:underline font-medium">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
