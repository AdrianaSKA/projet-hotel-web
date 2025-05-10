
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, User, BedDouble, Building2, Briefcase,Heart,ChevronDown,UserPlus,LogOut} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

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
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-hotel-blue">
              Alojateya.com
            </Link>
          </div>

          {isMobile && (
            <button 
              onClick={toggleMenu}
              className="p-2 text-hotel-dark hover:bg-hotel-light-gray rounded-full"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/hotels" className="flex items-center text-hotel-dark hover:text-hotel-blue">
                <BedDouble className="mr-1" size={18} />
                <span>Alojamientos</span>
              </Link>
              <a href="#" className="flex items-center text-hotel-dark hover:text-hotel-blue">
                <Briefcase className="mr-1" size={18} />
                <span>Paquetes</span>
              </a>
              <a href="#" className="flex items-center text-hotel-dark hover:text-hotel-blue">
                <Building2 className="mr-1" size={18} />
                <span>Cosas que hacer</span>
              </a>
            </nav>
          )}

          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-hotel-dark flex items-center">
                <Globe size={18} className="mr-2" />
                <span>ES</span>
                <ChevronDown size={16} className="ml-1" />
              </Button>
              <Button variant="ghost" className="text-hotel-dark flex items-center">
                <Heart size={18} className="mr-2" />
                <span>Guardados</span>
              </Button>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <div className="text-sm px-2 py-1 bg-hotel-blue/5 rounded-md">
                    <span className="font-medium text-hotel-blue">
                      {user?.name}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="border-hotel-red text-hotel-red hover:bg-hotel-red/10"
                  >
                    <LogOut size={18} className="mr-2" />
                    Cerrar sesión 
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="bg-hotel-blue hover:bg-hotel-blue/90 text-white flex items-center">
                    <User size={18} className="mr-2" />
                    <span>Iniciar sesión</span>
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="bg-white w-full absolute top-full left-0 border-b border-hotel-light-gray">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/hotels" className="flex items-center text-hotel-dark py-2 border-b border-hotel-light-gray">
                <BedDouble className="mr-3" size={20} />
                <span>Alojamientos</span>
              </Link>
              <a href="#" className="flex items-center text-hotel-dark py-2 border-b border-hotel-light-gray">
                <Briefcase className="mr-3" size={20} />
                <span>Paquetes</span>
              </a>
              <a href="#" className="flex items-center text-hotel-dark py-2 border-b border-hotel-light-gray">
                <Building2 className="mr-3" size={20} />
                <span>Cosas que hacer</span>
              </a>
              <a href="#" className="flex items-center text-hotel-dark py-2 border-b border-hotel-light-gray">
                <Globe className="mr-3" size={20} />
                <span>Español (ES)</span>
              </a>
              <a href="#" className="flex items-center text-hotel-dark py-2 border-b border-hotel-light-gray">
                <Heart className="mr-3" size={20} />
                <span>Guardados</span>
              </a>
              
              {isLoggedIn ? (
                <>
                  <div className="flex items-center text-hotel-dark py-2 border-b border-hotel-light-gray">
                    <User className="mr-3" size={20} />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="border-hotel-red text-hotel-red hover:bg-hotel-red/10 flex items-center justify-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center justify-center">
                    <Button className="bg-hotel-blue hover:bg-hotel-blue/90 text-white flex items-center justify-center w-full">
                      <User size={18} className="mr-2" />
                      <span>Iniciar sesión</span>
                    </Button>
                  </Link>
                  <Link to="/register" className="flex items-center justify-center">
                    <Button variant="outline" className="border-hotel-blue text-hotel-blue hover:bg-hotel-blue/10 flex items-center justify-center w-full">
                      <UserPlus size={18} className="mr-2" />
                      <span>Registrarse</span>
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
