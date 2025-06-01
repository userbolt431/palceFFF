import React, { useState, useEffect } from 'react';
import { MapPin, Utensils, Building2, Car, ShoppingBag, Hotel, Calendar, ChevronRight, Info, History, Sun, Cloud, Star, Coffee } from 'lucide-react';
import { samplePlaces, sampleActivities, sampleEvents } from '../data/samples';

const images = [
  'https://bluedoorcuisine.com/wp-content/uploads/2023/03/milad-alizadeh-JibMa0FbyHw-unsplash-scaled.jpg',
  'https://www.hachettebookgroup.com/wp-content/uploads/2019/01/Morocco_ChefchouenAerial_Zzvet-iStock-473937070.jpg',
  'https://traveladdicts.net/wp-content/uploads/2018/05/Chefchaouen-Morocco-shops-rugs.jpg.webp',
  'https://media.cntraveler.com/photos/55d63075c47ae13868aeb74f/master/pass/Chefchaouen-Lucy-Laucht-tout.jpg'
];

type ContentType = 'slideshow' | 'places' | 'activities' | 'events' | 'hotels' | 'products' | 'restaurants' | 'transport';

const guideCategories = [
  {
    id: 'overview',
    icon: <Info size={20} />,
    title: 'Overview',
    content: `Chefchaouen, known as the "Blue Pearl of Morocco", is famous for its striking blue-painted buildings 
    and winding alleyways. Founded in 1471, this enchanting city nestled in the Rif Mountains has become 
    a must-visit destination for travelers seeking unique cultural experiences and stunning photography opportunities.`
  },
  {
    id: 'history',
    icon: <History size={20} />,
    title: 'History',
    content: `The city was founded in 1471 as a small fortress to fight Portuguese invasions. 
    The blue color, which now defines the city, was introduced by Jewish refugees in 1492, 
    who considered blue as a symbol of heaven and sky. The tradition continues today, creating 
    the unique atmosphere that attracts visitors from around the world.`
  },
  {
    id: 'weather',
    icon: <Sun size={20} />,
    title: 'Weather',
    content: `Chefchaouen enjoys a Mediterranean climate with warm summers and mild winters. 
    The best time to visit is during spring (March-May) or autumn (September-November) when 
    temperatures are pleasant and rainfall is minimal. Summer temperatures can reach 35°C (95°F), 
    while winters are cool with occasional rain.`
  },
  {
    id: 'highlights',
    icon: <Star size={20} />,
    title: 'Highlights',
    content: `
    • The Medina - A UNESCO World Heritage site with blue-washed buildings
    • Plaza Uta el-Hammam - The main square with restaurants and cafes
    • Grand Mosque - Historic mosque with unique octagonal minaret
    • Kasbah Museum - Former prison turned museum with city views
    • Ras el-Maa - Waterfall and gathering spot for locals`
  },
  {
    id: 'tips',
    icon: <Coffee size={20} />,
    title: 'Local Tips',
    content: `
    • Best photo opportunities are early morning or late afternoon
    • Respect local customs by dressing modestly
    • Learn basic Arabic or French phrases
    • Negotiate prices in markets
    • Try local goat cheese and mountain olive oil
    • Visit the Spanish Mosque for sunset views`
  }
];

const ChefchaouenPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedContent, setSelectedContent] = useState<ContentType>('slideshow');
  const [selectedGuideCategory, setSelectedGuideCategory] = useState('overview');

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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Guide Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Chefchaouen</h1>
          <p className="text-slate-500 text-sm mb-6">The Blue Pearl of Morocco</p>
          
          <div className="space-y-2">
            {guideCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedGuideCategory(category.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedGuideCategory === category.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{category.icon}</span>
                  <span>{category.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h3 className="font-medium text-slate-800 mb-2">
              {guideCategories.find(c => c.id === selectedGuideCategory)?.title}
            </h3>
            <p className="text-sm text-slate-600 whitespace-pre-line">
              {guideCategories.find(c => c.id === selectedGuideCategory)?.content}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
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

        {/* Content Area */}
        <div className="container mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChefchaouenPage;