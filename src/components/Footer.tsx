import React, { useState } from "react";
import { Github, Info, Download, Apple, Play, ChevronDown, ChevronUp, MapPin } from "lucide-react";

const Footer = () => {
  const [showLocations, setShowLocations] = useState(false);
  const currentYear = new Date().getFullYear();
  
  // Close the dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showLocations) {
        setShowLocations(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLocations]);
  
  return (
    <div className="mt-8 mb-4 text-center hidden lg:block">
      {/* App Download Links - Enhanced design */}
      <div className="relative mb-6 p-10 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 border border-blue-300/30 shadow-2xl backdrop-blur-lg overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-purple-300/10 rounded-full blur-lg"></div>
        
        <div className="relative z-10">
          {/* Header section */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-xl">
              <Download className="h-10 w-10 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-black text-3xl text-white mb-2 tracking-tight">
                Download Our Mobile App
              </h3>
              <p className="text-lg text-blue-100 font-medium">
                Find parking spots instantly on your phone
              </p>
            </div>
          </div>
          
          {/* Download buttons */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://play.google.com/store/apps/details?id=co.median.android.ljwerj"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-green-500/30 min-w-[220px]"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                <Play className="h-7 w-7" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90 font-medium">GET IT ON</div>
                <div className="text-xl font-black tracking-tight">Google Play</div>
              </div>
            </a>
            
            <a
              href="https://apps.apple.com/us/app/parkingfinder-tech/id6746726849"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700/50 min-w-[220px]"
            >
              <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                <Apple className="h-7 w-7" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90 font-medium">GET IT ON</div>
                <div className="text-xl font-black tracking-tight">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation Links */}
      <div className="flex flex-col items-center justify-center gap-6 mb-6 p-6 rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Services</h4>
            <a 
              href="/services" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Our Services
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Company</h4>
            <a 
              href="/about" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              About Us
            </a>
            <a 
              href="/careers" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Careers
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Resources</h4>
            <a 
              href="/blog" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Blog
            </a>
            <a 
              href="/faq" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              FAQ
            </a>
          </div>
        </div>
        
        {/* Secondary Navigation Links */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
          <a 
            href="/pricing" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
            Pricing
          </a>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <a 
            href="/sitemap" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Sitemap
          </a>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <div className="relative group" style={{ zIndex: 50 }}>
            <button 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center relative z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowLocations(!showLocations);
              }}
            >
              Popular Locations
              {showLocations ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
            
            {/* Dropdown menu */}
            {showLocations && (
              <div 
                className="fixed sm:absolute left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 bottom-20 sm:bottom-full mb-2 w-72 sm:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 z-50"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="p-2 max-h-96 overflow-y-auto">
                  {[
                    { name: 'District and Session Court South Wing Parking', url: '/district-and-session-court-south-wing-parking-sector-12-faridabad.html' },
                    { name: 'Open Ground Parking Opposite Lawyer Chamber', url: '/open-ground-parking-opposite-lawyer-chamber-sector-12-faridabad.html' },
                    { name: 'Chamber Gate Number 3 Parking', url: '/chamber-gate-number-3-parking-sector-12-faridabad.html' },
                    { name: 'Lawyers Camber Parking', url: '/lawyers-camber-parking-sector-12-faridabad.html' },
                    { name: 'Canteen Parking Behind Open Ground', url: '/canteen-parking-behind-open-ground-sector-12-faridabad.html' },
                    { name: 'District and Session Court Mini Sachivaliya', url: '/district-and-session-court-mini-sachivaliya-sector-12-faridabad.html' },
                    { name: 'DMRC Parking Raja Nahar Singh', url: '/dmrc-parking-raja-nahar-singh-faridabad.html' },
                    { name: 'OYO Hotel Green View', url: '/oyo-hotel-green-view.html' },
                    { name: 'Huda Office Parking', url: '/huda-office-parking.html' },
                    { name: 'Town Parking Sector 12', url: '/town-parking-sector-12-faridabad.html' },
                    { name: 'Silver City Mall Parking', url: '/parking-at-silver-city-mall-sector.html' },
                    { name: 'SRS Mall Parking', url: '/parking-at-srs-mall.html' },
                    { name: 'Vardhaman Mall Parking', url: '/parking-at-vardhaman-mall.html' },
                    { name: 'Sector 15 Market Parking', url: '/parking-in-faridabad-sector-15-market.html' },
                    { name: 'Basantpur Ismialpur Road Parking', url: '/parking-near-basantpur-ismialpur-road-faridabad.html' },
                    { name: 'Rajender Singh Market Parking', url: '/rajender-singh-market-parking-sector-28-faridabad.html' },
                    { name: 'Omaxe Worldstreet Parking', url: '/parking-at-omaxe-worldstreet.html' },
                    { name: 'Private Parking Bhoor Colony', url: '/private-parking-bhoor-colony-sector-29-faridabad.html' },
                    { name: 'Accord Superspeciality Hospital Parking', url: '/parking-at-accord-superspeciality-hospital-faridabad.html' },
                    { name: 'Asian Hospital Parking', url: '/parking-at-asian-hospital-sector-21-faridabad.html' },
                    { name: 'Vashi Parking', url: '/parking-in-vashi.html' },
                    { name: 'Navi Mumbai Parking', url: '/parking-in-navi-mumbai.html' },
                    { name: 'Nerul Parking', url: '/parking-in-nerul.html' },
                    { name: 'Panvel Parking', url: '/parking-in-panvel.html' },
                    { name: 'Airoli Parking', url: '/parking-in-airoli.html' },
                    { name: 'Ghansoli Parking', url: '/parking-in-ghansoli.html' },
                    { name: 'CBD Belapur Parking', url: '/parking-in-cbd-belapur.html' },
                    { name: 'Seawoods Parking', url: '/parking-in-seawoods.html' },
                    { name: 'Vashi Railway Station Parking', url: '/vashi-railway-station-parking.html' },
                    { name: 'Rabale Parking', url: '/parking-in-rabale.html' },
                    { name: 'Turbhe Parking', url: '/parking-in-turbhe.html' },
                    { name: 'Greater Noida Parking', url: '/parking-in-greater-noida.html' },
                    { name: 'Sector Alpha II Parking', url: '/parking-in-sector-alpha-ii.html' },
                    { name: 'Jagat Farm Parking', url: '/parking-in-jagat-farm.html' },
                    { name: 'Alpha I Parking', url: '/parking-in-alpha-i.html' },
                    { name: 'Supertech Oxford Square Parking', url: '/parking-at-supertech-oxford-square.html' },
                    { name: 'Knowledge Park II Parking', url: '/parking-in-knowledge-park-ii.html' },
                    { name: 'Omega II Parking', url: '/parking-in-omega-ii.html' },
                    { name: 'SKA Greenarch Parking', url: '/parking-at-ska-greenarch.html' },
                    { name: 'Delta I Parking', url: '/parking-in-delta-i.html' },
                    { name: 'Buddh International Circuit Parking', url: '/parking-at-buddh-international-circuit-gate-1.html' },
                    { name: 'Sector 29 Parking', url: '/parking-in-sector-29.html' },
                    { name: 'Sector 44 Parking', url: '/parking-in-sector-44.html' },
                    { name: 'Sector 14 Parking', url: '/parking-in-sector-14.html' },
                    { name: 'Sector 43 Parking', url: '/parking-in-sector-43.html' },
                    { name: 'Sector 49 Parking', url: '/parking-in-sector-49.html' },
                    { name: 'Sector 60 Parking', url: '/parking-in-sector-60.html' },
                    { name: 'Sector 51 Parking', url: '/parking-in-sector-51.html' },
                    { name: 'Sector 52 Parking', url: '/parking-in-sector-52.html' },
                    { name: 'Sector 21 Parking', url: '/parking-in-sector-21.html' },
                    { name: 'Sector 56 Parking', url: '/parking-in-sector-56.html' },
                    { name: 'IFFCO Chowk Flyover Parking', url: '/parking-at-iffco-chowk-flyover.html' },
                    { name: 'Sector 22 Parking', url: '/parking-in-sector-22.html' },
                    { name: 'Sector 34 Parking', url: '/parking-in-sector-34.html' },
                    { name: 'Ridgewood Estate Parking', url: '/parking-at-ridgewood-estate.html' },
                    { name: 'Sector 30 Parking', url: '/parking-in-sector-30.html' },
                    { name: 'Sector 53 Parking', url: '/parking-in-sector-53.html' },
                    { name: 'Sector 24 Parking', url: '/parking-in-sector-24.html' },
                    { name: 'Sector 33 Parking', url: '/parking-in-sector-33.html' },
                    { name: 'Sector 32 Parking', url: '/parking-in-sector-32.html' },
                    { name: 'Sector 47 Parking', url: '/parking-in-sector-47.html' },
                    { name: 'Civil Lines Parking', url: '/parking-in-civil-lines.html' },
                    { name: 'Sector 17 Parking', url: '/parking-in-sector-17.html' },
                    { name: 'Jharsa Parking', url: '/parking-in-jharsa.html' },
                    { name: 'Global Foyer Mall Parking', url: '/parking-at-global-foyer-mall-palam-vihar.html' },
                    { name: 'DMRC HUDA City Centre Parking', url: '/dmrc-huda-city-centre-parking.html' },
                    { name: 'POS Issuance Parking', url: '/pos-issuance-parking.html' },
                    { name: 'Udyog Vihar Parking', url: '/plot-no-360-phase-3-udyog-vihar-gurugram-parking.html' },
                    { name: 'Bharti Airtel Parking', url: '/bharti-airtel-parking-gurgaon.html' },
                    { name: 'Shinjuku NS Building Parking', url: '/shinjuku-ns-building-parking.html' },
                    { name: 'Shinjuku Takashimaya Times Square Parking', url: '/shinjuku-takashimaya-times-square-parking.html' },
                    { name: 'Ikebukuro Sunshine City Parking', url: '/ikebukuro-sunshine-city-parking.html' },
                    { name: 'Tokyo Dome City Parking', url: '/tokyo-dome-city-parking.html' },
                    { name: 'Odaiba DiverCity Parking', url: '/odaiba-divercity-parking.html' },
                    { name: 'Ariake Garden Parking', url: '/ariake-garden-parking.html' },
                    { name: 'Ueno Okachimachi Parking', url: '/ueno-okachimachi-parking.html' },
                    { name: 'Asakusa View Hotel Parking', url: '/asakusa-view-hotel-parking.html' },
                    { name: 'Kanda Station Parking', url: '/kanda-station-parking.html' },
                    { name: 'Nihonbashi Parking Area', url: '/nihonbashi-parking-area.html' },
                    { name: 'Akasaka Biz Tower Parking', url: '/akasaka-biz-tower-parking.html' },
                    { name: 'Shinagawa Intercity Parking', url: '/shinagawa-intercity-parking.html' },
                    { name: 'Toranomon Hills Parking', url: '/toranomon-hills-parking.html' },
                    { name: 'Meguro Gajoen Parking', url: '/meguro-gajoen-parking.html' },
                    { name: 'Haneda Airport Terminal Parking', url: '/haneda-airport-terminal-parking.html' },
                    { name: 'Narita Airport Parking', url: '/narita-airport-parking.html' },
                    { name: 'NCP (National Car Parks) UK', url: '/ncp-national-car-parks.html' },
                    { name: 'Q-Park UK', url: '/q-park-uk.html' },
                    { name: 'APCOA Parking UK', url: '/apcoa-parking-uk.html' },
                    { name: 'Euro Car Parks UK', url: '/euro-car-parks-uk.html' },
                    { name: 'Indigo Parking UK', url: '/indigo-parking-uk.html' },
                    { name: 'Secure Parking UK', url: '/secure-parking-uk.html' },
                    { name: 'CitiPark UK', url: '/citipark-uk.html' },
                    { name: 'Saba Parking UK', url: '/saba-parking-uk.html' },
                    { name: 'JustPark UK', url: '/justpark-uk.html' },
                    { name: 'Britannia Parking UK', url: '/britannia-parking-uk.html' },
                    { name: 'RingGo Locations UK', url: '/ringgo-locations-uk.html' },
                    { name: 'Westminster Car Parks', url: '/westminster-car-parks.html' },
                    { name: 'London Wall Car Park', url: '/london-wall-car-park.html' },
                    { name: 'Trafalgar Square Car Park', url: '/trafalgar-square-car-park.html' },
                    { name: 'Leicester Square Car Park', url: '/leicester-square-car-park.html' },
                    { name: 'Soho Brewer Street Car Park', url: '/soho-brewer-street-car-park.html' },
                    { name: 'Marble Arch / Oxford Street Car Park', url: '/marble-arch-oxford-street-car-park.html' },
                    { name: 'Selfridges Car Park', url: '/selfridges-car-park.html' },
                    { name: 'Westfield London Car Park', url: '/westfield-london-car-park.html' },
                    { name: 'Westfield Stratford City Car Park', url: '/westfield-stratford-city-car-park.html' },
                    { name: 'O2 Arena Parking', url: '/o2-arena-parking.html' },
                    { name: 'Canary Wharf Car Parks', url: '/canary-wharf-car-parks.html' },
                    { name: 'Docklands Jubilee Place Car Park', url: '/docklands-jubilee-place-car-park.html' },
                    { name: 'Cadogan Parking', url: '/cadogan-parking-london.html' },
                    { name: 'Knightsbridge Car Park', url: '/knightsbridge-car-park.html' },
                    { name: 'Q-Park Park Lane', url: '/q-park-park-lane.html' },
                    { name: 'Q-Park Victoria', url: '/q-park-victoria.html' },
                    { name: 'Q-Park Oxford Street', url: '/q-park-oxford-street.html' },
                    { name: 'Q-Park Leicester Square', url: '/q-park-leicester-square.html' },
                    { name: 'Paddington Station Car Park', url: '/paddington-station-car-park.html' },
                    { name: 'Waterloo Station Car Park', url: '/waterloo-station-car-park.html' },
                    { name: 'Wembley Stadium Car Park', url: '/wembley-stadium-car-park.html' },
                    { name: 'Heathrow Airport Parking', url: '/heathrow-airport-parking.html' },
                    { name: 'Gatwick Airport Parking', url: '/gatwick-airport-parking.html' },
                    { name: 'Stansted Airport Parking', url: '/stansted-airport-parking.html' },
                    { name: 'Luton Airport Parking', url: '/luton-airport-parking.html' },
                    { name: 'City Airport Parking', url: '/city-airport-parking-london.html' }
                  ].map((location, index) => (
                    <a
                      key={index}
                      href={location.url}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                        <span className="truncate">{location.name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
          <a 
            href="/privacy-policy" 
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2">
          <Info className="h-4 w-4" />
          © {currentYear} Parking Finder
        </p>
      </div>
    </div>
  );
};

export default Footer;
