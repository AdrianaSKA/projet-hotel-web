
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import HeroSearch from '@/components/HeroSearch';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import SpecialOffers from '@/components/SpecialOffers';
import Footer from '@/components/Footer';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (isLoggedIn) {
      toast({
        title: "Ya has iniciado sesión",
        description: "Ya tienes una sesión activa en AlojateYa",
      });
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSearch />
        <FeaturedDestinations />
        <SpecialOffers />
        

        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-hotel-blue/5 rounded-xl p-6 md:p-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-hotel-blue mb-3">
                    ¡Regístrate y ahorra hasta un 30%!
                  </h2>
                  <p className="text-hotel-dark mb-4">
                    Únete a Aloyateya y obtén una noche gratis por cada 10 noches. Además, accede a precios exclusivos para miembros en miles de hoteles por todo el mundo.
                  </p>
                  <button 
                    onClick={handleRegisterClick}
                    className="bg-hotel-red hover:bg-hotel-red/90 text-white font-medium py-2 px-6 rounded"
                  >
                  Regístrate gratis
                  </button>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&auto=format&fit=crop" 
                    alt="recompensa" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;