
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface HotelFiltersProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (value: [number]) => void;
  onAmenityChange: (amenity: string, checked: boolean) => void;
  selectedAmenities: string[];
  allAmenities: string[];
  isMobile: boolean;
}

const HotelFilters = ({
  minPrice,
  maxPrice,
  onPriceChange,
  onAmenityChange,
  selectedAmenities,
  allAmenities,
  isMobile
}: HotelFiltersProps) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center cursor-pointer w-full justify-between">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-hotel-blue" />
                <CardTitle className="text-lg">Filtros</CardTitle>
              </div>
              
              {selectedAmenities.length > 0 && (
                <Badge variant="outline" className="ml-2">
                  {selectedAmenities.length} filtros activos
                </Badge>
              )}
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-5">

              <div>
                <h3 className="font-medium mb-4">Rango de precio</h3>
                <Slider
                  className="mb-6"
                  min={0}
                  max={1000}
                  step={10}
                  value={[minPrice]}
                  onValueChange={onPriceChange}
                />
                <div className="flex justify-between text-sm">
                  <span>$0</span>
                  <span className="font-medium">Hasta ${minPrice}</span>
                  <span>$1000+</span>
                </div>
              </div>


              <div>
                <h3 className="font-medium mb-4">Servicios disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {allAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          onAmenityChange(amenity, checked === true);
                        }}
                      />
                      <label 
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>


              {(selectedAmenities.length > 0 || minPrice > 0) && (
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      onPriceChange([0]);
                      selectedAmenities.forEach(amenity => onAmenityChange(amenity, false));
                    }}
                    className="w-full text-hotel-red border-hotel-red hover:bg-hotel-red/5"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default HotelFilters;