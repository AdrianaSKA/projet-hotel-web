
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";


type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};


const DEFAULT_USERS = [
  { id: '1', name: 'Henry', email: 'hperez@gmail.com', password: '123456' },
  { id: '2', name: 'Dylan', email: 'dleo@gmail.com', password: '123456' },
];


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    
    
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    }
  }, []);
  
  
  const login = (email: string, password: string): boolean => {
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido/a, ${foundUser.name}`,
      });
      return true;
    }
    
    toast({
      title: "Error de inicio de sesión",
      description: "Correo o contraseña incorrectos",
      variant: "destructive"
    });
    return false;
  };
  
  
  const register = (name: string, email: string, password: string): boolean => {
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    
    if (storedUsers.some((u: any) => u.email === email)) {
      toast({
        title: "Error de registro",
        description: "Este correo ya está registrado",
        variant: "destructive"
      });
      return false;
    }
    
    
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password
    };
    
    
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Registro exitoso",
      description: `Bienvenido/a, ${name}`,
    });
    return true;
  };
  
  
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
