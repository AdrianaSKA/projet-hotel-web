
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';


const loginSchema = z.object({
  email: z.string().email({ message: "Formato de correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  
  
  const demoAccounts = [
    { email: 'demo@ecohotel.com', password: 'demo123' },
    { email: 'test@ecohotel.com', password: 'test123' }
  ];

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    const success = login(values.email, values.password);
    if (success) {
      navigate('/');
    }
  };
  
  const useDemoAccount = (email: string, password: string) => {
    form.setValue('email', email);
    form.setValue('password', password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-hotel-blue text-center mb-6">
              Iniciar sesión
            </h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-dark-gray" />
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
                            placeholder="Contraseña" 
                            className="pl-10"
                          />
                          <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hotel-dark-gray" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-gray-300 text-hotel-blue focus:ring-hotel-blue"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-hotel-blue hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-hotel-blue hover:bg-hotel-blue/90">
                  Iniciar sesión
                </Button>
              </form>
            </Form>
            
            
            <div className="mt-6">
              <Button 
                variant="link" 
                className="text-hotel-blue p-0 h-auto"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              >
                {showDemoAccounts ? "Ocultar cuentas demo" : "Usar una cuenta demo"}
              </Button>
              
              {showDemoAccounts && (
                <div className="mt-2 space-y-2 border border-hotel-light-gray rounded-md p-3">
                  <p className="text-sm text-hotel-dark-gray mb-2">Selecciona una cuenta para iniciar:</p>
                  {demoAccounts.map((account, index) => (
                    <div 
                      key={index} 
                      className="p-2 border border-hotel-light-gray rounded hover:bg-hotel-blue/5 cursor-pointer"
                      onClick={() => useDemoAccount(account.email, account.password)}
                    >
                      <p className="font-medium text-sm">{account.email}</p>
                      <p className="text-xs text-hotel-dark-gray">Contraseña: {account.password}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-hotel-blue hover:underline font-medium">
                  Regístrate ahora
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

export default Login;
