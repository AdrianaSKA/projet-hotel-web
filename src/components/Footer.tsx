

import { useIsMobile } from '@/hooks/use-mobile';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Footer = () => {
  const isMobile = useIsMobile();
  
  const footerLinks = [
    {
      title: "Destinos populares",
      links: [
        { label: "Quito", url: "#" },
        { label: "Guayaquil", url: "#" },
        { label: "Galapagos", url: "#" },
        { label: "Baños", url: "#" },
        { label: "Cuenca", url: "#" },
        { label: "Montañita", url: "#" }
      ]
    },
    {
      title: "Tipos de alojamiento",
      links: [
        { label: "Hoteles", url: "#" },
        { label: "Apartamentos", url: "#" },
        { label: "Resorts", url: "#" },
        { label: "Villas", url: "#" },
        { label: "Cabañas", url: "#" },
        { label: "Bed & Breakfasts", url: "#" }
      ]
    },
    {
      title: "Ayuda",
      links: [
        { label: "Atención al cliente", url: "#" },
        { label: "FAQ", url: "#" },
        { label: "Cancelaciones", url: "#" },
        { label: "Cómo reservar", url: "#" },
        { label: "Contáctanos", url: "#" }
      ]
    },
    {
      title: "Para empresas",
      links: [
        { label: "Programa de afiliados", url: "#" },
        { label: "Publica tu propiedad", url: "#" },
        { label: "Extranet para hoteles", url: "#" },
        { label: "Agentes de viaje", url: "#" }
      ]
    }
  ];
  
  
  if (isMobile) {
    return (
      <footer className="bg-hotel-dark text-white pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="border border-gray-600 rounded-lg p-3 flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Globe size={18} className="mr-2" />
                <span>Español (ES)</span>
              </div>
              <ChevronDown size={18} />
            </div>
          </div>
          
          <Accordion type="single" collapsible className="mb-6">
            {footerLinks.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`} className="border-b border-gray-600">
                <AccordionTrigger className="text-white py-3">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pb-2 pl-1">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.url} className="text-white/80 hover:text-white text-sm">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center text-xs text-white/60 space-y-4">
            <p>© 2025 Alojateya.com</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Términos y condiciones</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  
  return (
    <footer className="bg-hotel-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="text-white/80 hover:text-white text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-700">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="border border-gray-600 rounded-lg p-2 flex items-center">
              <Globe size={18} className="mr-2" />
              <span>Español (ES)</span>
              <ChevronDown size={18} className="ml-2" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-white/80 hover:text-white">Privacidad</a>
            <a href="#" className="text-white/80 hover:text-white">Términos y condiciones</a>
            <a href="#" className="text-white/80 hover:text-white">Acerca de</a>
            <a href="#" className="text-white/80 hover:text-white">Cookies</a>
          </div>
          
          <div className="mt-4 md:mt-0 text-white/60 text-sm">
            © 2025 Alojateya.com
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
