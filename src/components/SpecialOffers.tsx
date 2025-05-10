

import { useIsMobile } from '@/hooks/use-mobile';
import { Star, Award, Tag } from 'lucide-react';

const offers = [
  {
    id: 1,
    name: 'Hotel Plaza Quito',
    location: 'Quito, Ecuador',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
    price: 129,
    rating: 8.7,
    discount: 15,
    original: 152
  },
  {
    id: 2,
    name: 'Malecón Suites',
    location: 'Guayaquil, Ecuador',
    image: 'https://cdn.pixabay.com/photo/2015/11/06/11/45/interior-1026452_960_720.jpg',
    price: 143,
    rating: 9.1,
    discount: 20,
    original: 179
  },
  {
    id: 3,
    name: 'Galápagos Resort',
    location: 'Islas Galápagos, Ecuador',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
    price: 176,
    rating: 8.9,
    discount: 10,
    original: 195
  }
];

const SpecialOffers = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-hotel-gray py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-hotel-dark">
            Ofertas especiales
          </h2>
          <a href="#" className="text-hotel-blue hover:underline font-medium">
            Ver todas
          </a>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer">
              <div className="relative h-52">
                <img 
                  src={offer.image} 
                  alt={offer.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-hotel-blue text-white px-2 py-1 rounded text-sm font-medium">
                  {offer.discount}% dto.
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-lg text-hotel-dark group-hover:text-hotel-blue">{offer.name}</h3>
                  <div className="flex items-center bg-hotel-blue text-white px-2 py-0.5 rounded text-sm">
                    <Star size={14} className="mr-1 fill-white" />
                    <span>{offer.rating}</span>
                  </div>
                </div>
                
                <p className="text-hotel-dark-gray text-sm mb-3">{offer.location}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag size={16} className="text-hotel-dark-gray mr-1" />
                    <span className="text-xs text-hotel-dark-gray">Precio por noche desde</span>
                  </div>
                  
                  <div className="text-right">
                    <span className="line-through text-hotel-dark-gray text-sm">${offer.original}</span>
                    <div className="font-bold text-lg text-hotel-red">${offer.price}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
