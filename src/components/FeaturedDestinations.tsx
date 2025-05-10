

import { useIsMobile } from '@/hooks/use-mobile';

const destinations = [
  {
    id: 1,
    name: 'Quito',
    image: 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2018/05/EC_X-miradores-en-Quito-que-te-dejara%CC%81n-sin-aliento.jpg',
    description: 'La capital a gran altura con centro histórico'
  },
  {
    id: 2,
    name: 'Guayaquil',
    image: 'https://www.civitatis.com/f/ecuador/guayaquil/paseo-catamaran-atardecer-rio-guayas-589x392.jpg',
    description: 'Puerto principal y centro económico'
  },
  {
    id: 3,
    name: 'Galápagos',
    image: 'https://st2.depositphotos.com/1473952/7570/i/450/depositphotos_75707549-stock-photo-beautiful-coast-view-in-galapagos.jpg',
    description: 'Islas con biodiversidad única en el mundo'
  },
  {
    id: 4,
    name: 'Baños',
    image: 'https://bananomeridiano.com/wp-content/uploads/2019/07/ruta-de-las-cascadas-banos.jpg',
    description: 'Aventura y aguas termales en los Andes'
  }
];

const FeaturedDestinations = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-hotel-dark mb-6">
          Destinos populares en Ecuador
        </h2>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 md:grid-cols-4 gap-4'}`}>
          {destinations.map((destination) => (
            <div key={destination.id} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden h-56 mb-2">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <p className="text-white/90 text-sm">{destination.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="text-hotel-blue hover:underline font-medium">
            Ver todos los destinos
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinations;
