
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, User, BedDouble, Building2, Briefcase,Heart,ChevronDown,UserPlus,LogOut} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { CartDropdown } from './cart/CartDropdown';
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full bg-white border-b border-hotel-light-gray sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center">
            <BedDouble size={24} className="text-hotel-blue mr-2" />
            <span className="font-bold text-xl text-hotel-blue">Alojateya</span>
          </Link>
          

          {isMobile && (
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          
          {!isMobile && (
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                <Link to="/" className="text-hotel-dark hover:text-hotel-blue">
                  Inicio
                </Link>
                <Link to="/hotels" className="text-hotel-dark hover:text-hotel-blue">
                  Hoteles
                </Link>
                <a href="#" className="text-hotel-dark hover:text-hotel-blue">
                  Ofertas
                </a>
                <a href="#" className="text-hotel-dark hover:text-hotel-blue">
                  Contacto
                </a>
              </nav>
              
              <div className="flex items-center space-x-2">
                
                {isLoggedIn && <CartDropdown />}
                
                
                <Button variant="ghost" size="icon">
                  <Globe size={20} />
                </Button>
                
                
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-1">
                        <User size={20} />
                        <span className="hidden md:inline">{user?.name}</span>
                        <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Perfil</DropdownMenuItem>
                      <DropdownMenuItem>Mis reservas</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Heart size={16} className="mr-2" />
                        Favoritos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                        <LogOut size={16} className="mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login">
                      <Button variant="ghost" className="flex items-center gap-1">
                        <User size={20} className="mr-1" />
                        Iniciar sesión
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="flex items-center gap-1 bg-hotel-blue hover:bg-hotel-blue/90">
                        <UserPlus size={20} className="mr-1" />
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      
      {isMobile && isMenuOpen && (
        <div className="bg-white w-full absolute top-full left-0 border-b border-hotel-light-gray">
          <nav className="flex flex-col p-4">
            <Link to="/" className="py-2 text-hotel-dark hover:text-hotel-blue">
              Inicio
            </Link>
            <Link to="/hotels" className="py-2 text-hotel-dark hover:text-hotel-blue">
              Hoteles
            </Link>
            <a href="#" className="py-2 text-hotel-dark hover:text-hotel-blue">
              Ofertas
            </a>
            <a href="#" className="py-2 text-hotel-dark hover:text-hotel-blue">
              Contacto
            </a>
            
            {isLoggedIn && (
              <>
                <hr className="my-2" />
                <div className="flex items-center py-2">
                  <CartDropdown />
                  <span className="ml-2">Carrito</span>
                </div>
                <button onClick={handleLogout} className="py-2 text-red-500 flex items-center">
                  <LogOut size={18} className="mr-2" />
                  Cerrar sesión
                </button>
              </>
            )}
            
            {!isLoggedIn && (
              <>
                <hr className="my-2" />
                <Link to="/login" className="py-2 text-hotel-dark hover:text-hotel-blue flex items-center">
                  <User size={18} className="mr-2" />
                  Iniciar sesión
                </Link>
                <Link to="/register" className="py-2 text-hotel-dark hover:text-hotel-blue flex items-center">
                  <UserPlus size={18} className="mr-2" />
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;