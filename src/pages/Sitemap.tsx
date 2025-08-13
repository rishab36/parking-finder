import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { groupPagesByArea } from "../lib/groupPagesByArea";

const sitemapLinks = [
  { label: "Home", url: "/" },
  { label: "Find Parking", url: "/" },
  { label: "How to Use", url: "/how-to-use" },
  { label: "About", url: "/about" },
  { label: "Pricing", url: "/pricing" },
  { label: "Services", url: "/services" },
  { label: "Blog", url: "/blog" },
  { label: "FAQ", url: "/faq" },
  { label: "Our Mission", url: "/our-mission" },
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Contact", url: "/contact" },
  { label: "History", url: "/history" },
  { label: "Careers", url: "/careers" },
];

import appstoreLogo from '../../appstore.png';

export default function Sitemap() {
  const [groupedPages, setGroupedPages] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  // Hardcoded full list of generated pages (auto-extracted from keywords.json)
  const generatedPages = [
    { filename: "district-and-session-court-south-wing-parking-sector-12-faridabad.html", title: "District and Session Court South Wing Parking Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "open-ground-parking-opposite-lawyer-chamber-sector-12-faridabad.html", title: "Open Ground Parking Opposite Lawyer Chamber Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "chamber-gate-number-3-parking-sector-12-faridabad.html", title: "Chamber Gate Number 3 Parking Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "lawyers-camber-parking-sector-12-faridabad.html", title: "Lawyers Camber Parking Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "canteen-parking-behind-open-ground-sector-12-faridabad.html", title: "Canteen Parking Behind Open Ground Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "district-and-session-court-mini-sachivaliya-sector-12-faridabad.html", title: "District and Session Court Mini Sachivaliya Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "district-and-session-court-outside-parking-ground-opposite-thana-sector-12-faridabad.html", title: "District and Session Court Outside Parking Ground Opposite Thana Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "dmrc-parking-raja-nahar-singh-faridabad.html", title: "DMRC Parking Raja Nahar Singh Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "oyo-hotel-green-view.html", title: "Parking at OYO Hotel Green View - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "huda-office-parking.html", title: "Huda Office Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "town-parking-sector-12-faridabad.html", title: "Town Parking Sector 12 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-silver-city-mall-sector.html", title: "Parking at Silver City Mall Sector - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-srs-mall.html", title: "Parking at SRS Mall - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-vardhaman-mall.html", title: "Parking at Vardhaman Mall - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-faridabad-sector-15-market.html", title: "Parking in Faridabad Sector 15 Market - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-near-basantpur-ismialpur-road-faridabad.html", title: "Parking near Basantpur Ismialpur Road Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "rajender-singh-market-parking-sector-28-faridabad.html", title: "Rajender Singh Market Parking Sector 28 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-omaxe-worldstreet.html", title: "Parking at Omaxe Worldstreet - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "private-parking-bhoor-colony-sector-29-faridabad.html", title: "Private Parking Bhoor Colony Sector 29 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-accord-superspeciality-hospital-faridabad.html", title: "Parking at Accord Superspeciality Hospital Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-asian-hospital-sector-21-faridabad.html", title: "Parking at Asian Hospital Sector 21 Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ground-parking-at-accord-hospital-faridabad.html", title: "Ground Parking at Accord Hospital Faridabad - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-majiwada.html", title: "Parking in Majiwada - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "shahad-railway-parking.html", title: "Shahad Railway Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "kalwa-railway-parking-kharegaon.html", title: "Kalwa Railway Parking Kharegaon - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ulhasnagar-railway-parking-ramayan-nagar.html", title: "Ulhasnagar Railway Parking Ramayan Nagar - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-greater-noida.html", title: "Parking in Greater Noida - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-alpha-ii.html", title: "Parking in Sector Alpha II - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-jagat-farm.html", title: "Parking in Jagat Farm - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-alpha-i.html", title: "Parking in Alpha I - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-supertech-oxford-square.html", title: "Parking at Supertech Oxford Square - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-knowledge-park-ii.html", title: "Parking in Knowledge Park II - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-omega-ii.html", title: "Parking in Omega II - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-ska-greenarch.html", title: "Parking at SKA Greenarch - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-delta-i.html", title: "Parking in Delta I - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-buddh-international-circuit-gate-1.html", title: "Parking at Buddh International Circuit Gate No 1 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-29.html", title: "Parking in Sector 29 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-44.html", title: "Parking in Sector 44 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-14.html", title: "Parking in Sector 14 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-43.html", title: "Parking in Sector 43 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-49.html", title: "Parking in Sector 49 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-60.html", title: "Parking in Sector 60 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-51.html", title: "Parking in Sector 51 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-52.html", title: "Parking in Sector 52 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-21.html", title: "Parking in Sector 21 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-56.html", title: "Parking in Sector 56 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-iffco-chowk-flyover.html", title: "Parking at IFFCO Chowk Flyover - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-22.html", title: "Parking in Sector 22 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-34.html", title: "Parking in Sector 34 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-ridgewood-estate.html", title: "Parking at Ridgewood Estate - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-30.html", title: "Parking in Sector 30 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-53.html", title: "Parking in Sector 53 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-24.html", title: "Parking in Sector 24 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-33.html", title: "Parking in Sector 33 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-32.html", title: "Parking in Sector 32 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-47.html", title: "Parking in Sector 47 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-civil-lines.html", title: "Parking in Civil Lines - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-sector-17.html", title: "Parking in Sector 17 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-jharsa.html", title: "Parking in Jharsa - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-at-global-foyer-mall-palam-vihar.html", title: "Parking at Global Foyer Mall Palam Vihar - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "dmrc-huda-city-centre-parking.html", title: "DMRC HUDA City Centre Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "pos-issuance-parking.html", title: "POS Issuance Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "plot-no-360-phase-3-udyog-vihar-gurugram-parking.html", title: "Plot No 360 Phase 3 Udyog Vihar Gurugram Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "bharti-airtel-parking-gurgaon.html", title: "Bharti Airtel Parking Gurgaon - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-vashi.html", title: "Parking in Vashi - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-navi-mumbai.html", title: "Parking in Navi Mumbai - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-nerul.html", title: "Parking in Nerul - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-panvel.html", title: "Parking in Panvel - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-airoli.html", title: "Parking in Airoli - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-ghansoli.html", title: "Parking in Ghansoli - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-cbd-belapur.html", title: "Parking in CBD Belapur - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-seawoods.html", title: "Parking in Seawoods - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "vashi-railway-station-parking.html", title: "Vashi Railway Station Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-rabale.html", title: "Parking in Rabale - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "parking-in-turbhe.html", title: "Parking in Turbhe - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "koperkairne-east-railway-parking.html", title: "Koperkairne East Railway Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "nmmc-road-parking-near-guru-prasad-hotel.html", title: "NMMC Road Parking Near Guru Prasad Hotel - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "nmmc-parking-syndicate-bank-quarters-vashi.html", title: "NMMC Parking Syndicate Bank Quarters Vashi - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "nmmc-parking-near-shree-mangal-apartments-vashi.html", title: "NMMC Parking Near Shree Mangal Apartments Vashi - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "shinjuku-ns-building-parking.html", title: "Shinjuku NS Building Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "shinjuku-takashimaya-times-square-parking.html", title: "Shinjuku Takashimaya Times Square Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ikebukuro-sunshine-city-parking.html", title: "Ikebukuro Sunshine City Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "tokyo-dome-city-parking.html", title: "Tokyo Dome City Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "odaiba-divercity-parking.html", title: "Odaiba DiverCity Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ariake-garden-parking.html", title: "Ariake Garden Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ueno-okachimachi-parking.html", title: "Ueno Okachimachi Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "asakusa-view-hotel-parking.html", title: "Asakusa View Hotel Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "kanda-station-parking.html", title: "Kanda Station Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "nihonbashi-parking-area.html", title: "Nihonbashi Parking Area - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "akasaka-biz-tower-parking.html", title: "Akasaka Biz Tower Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "shinagawa-intercity-parking.html", title: "Shinagawa Intercity Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "toranomon-hills-parking.html", title: "Toranomon Hills Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "meguro-gajoen-parking.html", title: "Meguro Gajoen Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "haneda-airport-terminal-parking.html", title: "Haneda Airport Terminal Parking - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "narita-airport-parking.html", title: "Narita Airport Parking P1–P5 - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ncp-national-car-parks.html", title: "NCP (National Car Parks) UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "q-park-uk.html", title: "Q-Park UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "apcoa-parking-uk.html", title: "APCOA Parking UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "euro-car-parks-uk.html", title: "Euro Car Parks UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "indigo-parking-uk.html", title: "Indigo Parking UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "secure-parking-uk.html", title: "Secure Parking UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "citipark-uk.html", title: "CitiPark UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "saba-parking-uk.html", title: "Saba Parking UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "justpark-uk.html", title: "JustPark UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "britannia-parking-uk.html", title: "Britannia Parking UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "ringgo-locations-uk.html", title: "RingGo Locations UK - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "westminster-car-parks.html", title: "Westminster Car Parks London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "london-wall-car-park.html", title: "London Wall Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "trafalgar-square-car-park.html", title: "Trafalgar Square Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "leicester-square-car-park.html", title: "Leicester Square Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "soho-brewer-street-car-park.html", title: "Soho Brewer Street Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "marble-arch-oxford-street-car-park.html", title: "Marble Arch / Oxford Street Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "selfridges-car-park.html", title: "Selfridges Car Park London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "westfield-london-car-park.html", title: "Westfield London Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "westfield-stratford-city-car-park.html", title: "Westfield Stratford City Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "o2-arena-parking.html", title: "O2 Arena Parking London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "canary-wharf-car-parks.html", title: "Canary Wharf Car Parks London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "docklands-jubilee-place-car-park.html", title: "Docklands Jubilee Place Car Park - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "cadogan-parking-london.html", title: "Cadogan Parking London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "knightsbridge-car-park.html", title: "Knightsbridge Car Park London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "q-park-park-lane.html", title: "Q-Park Park Lane London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "q-park-victoria.html", title: "Q-Park Victoria London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "q-park-oxford-street.html", title: "Q-Park Oxford Street London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "q-park-leicester-square.html", title: "Q-Park Leicester Square London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "paddington-station-car-park.html", title: "Paddington Station Car Park London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "waterloo-station-car-park.html", title: "Waterloo Station Car Park London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "wembley-stadium-car-park.html", title: "Wembley Stadium Car Park London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "heathrow-airport-parking.html", title: "Heathrow Airport Parking London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "gatwick-airport-parking.html", title: "Gatwick Airport Parking London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "stansted-airport-parking.html", title: "Stansted Airport Parking London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "luton-airport-parking.html", title: "Luton Airport Parking London - Find & Book Parking Spots | ParkingFinder.tech" },
    { filename: "city-airport-parking-london.html", title: "City Airport Parking London - Find & Book Parking Spots | ParkingFinder.tech" }
  ];

  useEffect(() => {
    setGroupedPages(groupPagesByArea(generatedPages));
    setLoading(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 via-sky-400 to-blue-700 rounded-2xl shadow-xl py-10 px-6 mb-10 flex flex-col items-center animate-fade-in">
        <div className="absolute right-6 top-6 opacity-10 select-none pointer-events-none">
          <img src={appstoreLogo} alt="ParkingFinder Logo" className="w-24 h-24 rounded-2xl shadow-2xl" />
        </div>
        <h1 className="text-5xl font-extrabold text-white drop-shadow mb-3 flex items-center gap-3">
          <span className="inline-block bg-white/10 rounded-lg px-4 py-2 shadow-lg">
            <span className="mr-2 text-yellow-300">🗺️</span>
            Parking Finder Sitemap
          </span>
        </h1>
        <p className="mb-2 text-blue-100 text-lg font-medium text-center max-w-2xl">
          Explore all our parking resources, locations, and services in one beautiful, easy-to-navigate place.
        </p>
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur shadow rounded-xl mb-8 py-2 px-4 flex flex-wrap justify-center gap-3 border border-blue-100">
        {sitemapLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.url}
            className="text-blue-700 hover:bg-blue-100 hover:text-blue-900 px-3 py-1 rounded-lg font-semibold transition-colors duration-150 text-base"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Generated Pages Section */}
      <div className="my-14">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
          <span className="bg-blue-100 rounded-full p-2 shadow text-blue-700 text-2xl">
            <img src={appstoreLogo} alt="Logo" className="w-8 h-8 rounded-xl inline-block align-middle" />
          </span>
          Generated Pages by Area/Country
        </h2>
        {loading && <div className="text-gray-500">Loading generated pages...</div>}
        {!loading && (
          Object.keys(groupedPages).length === 0 ? (
            <div className="text-gray-400 italic">No generated pages found.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              {Object.entries(groupedPages).map(([area, pages]) => (
                <div
                  key={area}
                  className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-2 hover:shadow-2xl transition-shadow duration-300 group relative overflow-hidden animate-fade-in"
                >
                  <div className="flex items-center mb-3">
                    <span className="inline-flex items-center bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-lg shadow-sm text-base uppercase tracking-wide mr-2">
                      <img src={appstoreLogo} alt="Logo" className="w-6 h-6 rounded-lg mr-2 inline-block align-middle" /> {area}
                    </span>
                    <span className="h-px bg-blue-200 flex-1 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pages.map((page) => (
                      <a
                        key={page.filename}
                        href={`/${page.filename}`}
                        className="bg-blue-100 hover:bg-blue-500 text-blue-700 hover:text-white font-semibold px-3 py-1 rounded-full shadow-sm border border-blue-200 hover:border-blue-500 transition-all duration-150 cursor-pointer text-sm mb-1 hover:scale-105 active:scale-95"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={page.title}
                      >
                        {page.title.replace(/ - Find & Book Parking Spots \| ParkingFinder\.tech$/, "")}
                      </a>
                    ))}
                  </div>
                  <div className="absolute right-2 bottom-2 opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity duration-300">
                    <img src={appstoreLogo} alt="ParkingFinder Logo" className="w-16 h-16 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <a
          href="https://www.parkingfinder.tech"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 text-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          🚗 Visit ParkingFinder.tech
        </a>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.1s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}

