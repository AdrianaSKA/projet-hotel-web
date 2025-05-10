
export interface Hotel {
  id: number;
  name: string;
  stars: number;
  address: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  ratingText: string;
  reviews: number;
  image: string;
  location: string;
  locationId: number;
  amenities: string[];
}
