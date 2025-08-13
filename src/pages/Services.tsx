
import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <>
      <nav className="flex flex-wrap gap-4 justify-center items-center mb-8 bg-blue-50 dark:bg-gray-900/30 p-4 rounded-xl shadow">
  <Link to="/about" className="text-blue-700 hover:underline font-semibold">About Us</Link>
  <Link to="/careers" className="text-blue-700 hover:underline font-semibold">Careers</Link>
  <Link to="/faq" className="text-blue-700 hover:underline font-semibold">FAQ</Link>
  <Link to="/blog" className="text-blue-700 hover:underline font-semibold">Blog</Link>
  <Link to="/pricing" className="text-blue-700 hover:underline font-semibold">Pricing</Link>
  <Link to="/sitemap" className="text-blue-700 hover:underline font-semibold">Sitemap</Link>
  <a href="/popular-locations.html" className="text-blue-700 hover:underline font-semibold">Popular Locations</a>
</nav>
<div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Our Parking Finder Services</h1>
      <p className="mb-8 text-lg">
        We help drivers, commuters and businesses find, reserve, and optimize parking—across garages, street parking, metered lots & EV stations—in real time worldwide.
      </p>
      <ul className="space-y-6">
        <li>
          <h2 className="font-semibold text-2xl mb-2">Free & Paid Parking Spot Locator</h2>
          <p className="text-gray-700">Use our real-time parking database to find free street parking, paid lots, or reserved garage spaces near your current location, your work, or your desired destination.</p>
        </li>
        <li>
          <h2 className="font-semibold text-2xl mb-2">EV Charging & Gas Station Search</h2>
          <p className="text-gray-700">Locate the nearest EV charging stations and gas stations with live price comparisons and instant mapping for a seamless parking and charging experience.</p>
        </li>
        <li>
          <h2 className="font-semibold text-2xl mb-2">Smart Navigation & Route Planning</h2>
          <p className="text-gray-700">Get directions to the best available parking spots or stations and enjoy navigation powered by real-time traffic and parking analytics.</p>
        </li>
        <li>
          <h2 className="font-semibold text-2xl mb-2">Parking Cost Calculator & Alerts</h2>
          <p className="text-gray-700">Estimate your total parking cost before you go, and receive meter expiration, pricing alerts, and reminders on your phone.</p>
        </li>
        <li>
          <h2 className="font-semibold text-2xl mb-2">Business Solutions & API</h2>
          <p className="text-gray-700">Integrate our parking data into your apps or business workflow – contact us for robust parking APIs, custom enterprise dashboards and analytics.</p>
        </li>
      </ul>
      <div className="mt-12 text-center">
        <a href="/contact" className="bg-blue-600 text-white py-2 px-6 rounded-full inline-block font-semibold hover:bg-blue-700">
          Learn more or get started
        </a>
      </div>
    </div>
    </>
  );
}
