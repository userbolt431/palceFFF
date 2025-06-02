import React, { useState, useEffect } from 'react';
import { MapPin, Utensils, Building2, Car, ShoppingBag, Hotel, Calendar, ChevronRight, Info, History, Sun, Cloud, Star, Coffee, Map, Clock, MessageSquare } from 'lucide-react';
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
    id: 'map',
    icon: <Map size={20} />,
    title: 'Interactive Map',
    content: {
      type: 'map',
      center: { lat: 35.1715, lng: -5.2697 },
      zoom: 14,
      markers: [
        { lat: 35.1715, lng: -5.2697, title: 'Medina', description: 'Historic city center' },
        { lat: 35.1686, lng: -5.2638, title: 'Plaza Uta el-Hammam', description: 'Main square' },
        { lat: 35.1697, lng: -5.2614, title: 'Kasbah', description: 'Historic fortress' }
      ]
    }
  },
  {
    id: 'weather',
    icon: <Sun size={20} />,
    title: 'Weather',
    content: {
      type: 'weather',
      current: {
        temp: 22,
        condition: 'Sunny',
        humidity: 65,
        wind: 12
      },
      forecast: [
        { day: 'Monday', high: 24, low: 15, condition: 'Sunny' },
        { day: 'Tuesday', high: 23, low: 14, condition: 'Partly Cloudy' },
        { day: 'Wednesday', high: 22, low: 13, condition: 'Sunny' },
        { day: 'Thursday', high: 25, low: 16, condition: 'Clear' },
        { day: 'Friday', high: 23, low: 15, condition: 'Partly Cloudy' }
      ]
    }
  },
  {
    id: 'best-time',
    icon: <Clock size={20} />,
    title: 'Best Time to Visit',
    content: {
      type: 'seasons',
      recommendations: [
        {
          season: 'Spring (March-May)',
          rating: 5,
          description: 'Perfect weather, moderate temperatures, beautiful blooms'
        },
        {
          season: 'Summer (June-August)',
          rating: 3,
          description: 'Hot temperatures, crowded but lively atmosphere'
        },
        {
          season: 'Autumn (September-November)',
          rating: 4,
          description: 'Pleasant weather, fewer crowds, great for photography'
        },
        {
          season: 'Winter (December-February)',
          rating: 2,
          description: 'Cool temperatures, occasional rain, quiet season'
        }
      ]
    }
  },
  {
    id: 'forum',
    icon: <MessageSquare size={20} />,
    title: 'Travel Forum',
    content: {
      type: 'forum',
      topics: [
        {
          title: 'Best photo spots in Chefchaouen?',
          author: 'PhotoLover',
          replies: 24,
          lastActive: '2h ago'
        },
        {
          title: 'Where to stay in the Medina',
          author: 'Traveler123',
          replies: 15,
          lastActive: '5h ago'
        },
        {
          title: 'Local food recommendations',
          author: 'FoodieExplorer',
          replies: 32,
          lastActive: '1d ago'
        },
        {
          title: 'Getting from Tangier to Chefchaouen',
          author: 'MoroccoBound',
          replies: 18,
          lastActive: '2d ago'
        }
      ]
    }
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
    id: 'highlights',
    icon: <Star size={20} />,
    title: 'Highlights',
    content: `
    • The Medina - A UNESCO World Heritage site with blue-washed buildings
    • Plaza Uta el-Hammam - The main square with restaurants and cafes
    • Grand Mosque - Historic mosque with unique octagonal minaret
    • Kasbah Museum - Former prison turned museum with city views
    • Ras el-Maa - Waterfall and gathering spot for locals`
  }
];

const navigationItems = [
  { type: 'places', icon: <MapPin size={20} />, label: 'Places' },
  { type: 'activities', icon: <Calendar size={20} />, label: 'Activities' },
  { type: 'events', icon: <Calendar size={20} />, label: 'Events' },
  { type: 'hotels', icon: <Hotel size={20} />, label: 'Hotels' },
  { type: 'products', icon: <ShoppingBag size={20} />, label: 'Products' },
  { type: 'restaurants', icon: <Utensils size={20} />, label: 'Restaurants' },
  { type: 'transport', icon: <Car size={20} />, label: 'Transport' }
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

  const renderGuideContent = () => {
    const category = guideCategories.find(c => c.id === selectedGuideCategory);
    if (!category) return null;

    if (typeof category.content === 'string') {
      return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium text-slate-800 mb-2">{category.title}</h3>
          <p className="text-sm text-slate-600 whitespace-pre-line">{category.content}</p>
        </div>
      );
    }

    switch (category.content.type) {
      case 'weather':
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-6">
              <h3 className="font-medium text-slate-800 mb-4">Current Weather</h3>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-slate-700">{category.content.current.temp}°C</div>
                <div className="text-slate-600">{category.content.current.condition}</div>
              </div>
              <div className="mt-2 text-sm text-slate-500">
                <div>Humidity: {category.content.current.humidity}%</div>
                <div>Wind: {category.content.current.wind} km/h</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">5-Day Forecast</h4>
              <div className="space-y-2">
                {category.content.forecast.map(day => (
                  <div key={day.day} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{day.day}</span>
                    <span className="text-slate-700">{day.high}° / {day.low}°</span>
                    <span className="text-slate-600">{day.condition}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'seasons':
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium text-slate-800 mb-4">When to Visit Chefchaouen</h3>
            <div className="space-y-4">
              {category.content.recommendations.map(season => (
                <div key={season.season} className="border-b border-slate-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-700">{season.season}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < season.rating ? 'text-yellow-400' : 'text-slate-300'}
                          fill={i < season.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{season.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'forum':
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium text-slate-800 mb-4">Recent Discussions</h3>
            <div className="space-y-3">
              {category.content.topics.map(topic => (
                <div key={topic.title} className="bg-slate-50 p-3 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-1">{topic.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">by {topic.author}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">{topic.replies} replies</span>
                      <span className="text-slate-400">{topic.lastActive}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start New Discussion
            </button>
          </div>
        );

      case 'map':
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium text-slate-800 mb-4">Interactive Map</h3>
            <div className="bg-slate-100 h-[400px] rounded-lg flex items-center justify-center">
              <p className="text-slate-600">Map integration will be implemented here</p>
            </div>
            <div className="mt-4 space-y-2">
              {category.content.markers.map(marker => (
                <div key={marker.title} className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="font-medium text-slate-700">{marker.title}</span>
                  <span className="text-slate-500">- {marker.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const renderContent = () => {
    if (selectedContent === 'slideshow') {
      return null;
    }

    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="p-6">
          {/* Slideshow */}
          <div className="relative h-[300px] mb-6 rounded-lg overflow-hidden">
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
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
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

          {/* Guide Content */}
          {renderGuideContent()}

          {/* Navigation Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChefchaouenPage;