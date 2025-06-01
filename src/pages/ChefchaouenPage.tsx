import React, { useState, useEffect } from 'react';
import { MapPin, Utensils, Building2, Car, ShoppingBag, Hotel, Calendar } from 'lucide-react';
import { samplePlaces, sampleActivities, sampleEvents } from '../data/samples';

const images = [
  'https://www.barcelo.com/guia-turismo/wp-content/uploads/chefchaouen.jpg',
  'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg',
  'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg',
  'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg'
];

type ContentType = 'slideshow' | 'places' | 'activities' | 'events' | 'hotels' | 'products' | 'restaurants' | 'transport';

const ChefchaouenPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedContent, setSelectedContent] = useState<ContentType>('slideshow');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigationItems = [
    { type: 'places', icon: <MapPin size={20} />, label: 'Places' },
    { type: 'activities', icon: <Calendar size={20} />, label: 'Activities' },
    { type: 'events', icon: <Calendar size={20} />, label: 'Events' },
    { type: 'hotels', icon: <Hotel size={20} />, label: 'Hotels' },
    { type: 'products', icon: <ShoppingBag size={20} />, label: 'Products' },
    { type: 'restaurants', icon: <Utensils size={20} />, label: 'Restaurants' },
    { type: 'transport', icon: <Car size={20} />, label: 'Transport' }
  ];

  const renderContent = () => {
    if (selectedContent === 'slideshow') {
      return (
        <div className="relative h-[600px] overflow-hidden rounded-lg">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt="Chefchaouen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
            </div>
          ))}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      );
    }

    // Example content for other sections
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-slate-100" />
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">
                {selectedContent.charAt(0).toUpperCase() + selectedContent.slice(1)} Item {index + 1}
              </h3>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center">
            {navigationItems.map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setSelectedContent(type as ContentType)}
                className={`px-6 py-4 flex items-center gap-2 transition-colors ${
                  selectedContent === type
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ChefchaouenPage;