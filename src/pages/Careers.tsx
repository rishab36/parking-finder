
import React from "react";
import { Link } from "react-router-dom";

export default function Careers() {
  return (
    <>
      <nav className="flex flex-wrap gap-4 justify-center items-center mb-8 bg-blue-50 dark:bg-gray-900/30 p-4 rounded-xl shadow">
  <Link to="/services" className="text-blue-700 hover:underline font-semibold">Our Services</Link>
  <Link to="/about" className="text-blue-700 hover:underline font-semibold">About Us</Link>
  <Link to="/careers" className="text-blue-700 hover:underline font-semibold">Careers</Link>
  <Link to="/faq" className="text-blue-700 hover:underline font-semibold">FAQ</Link>
  <Link to="/blog" className="text-blue-700 hover:underline font-semibold">Blog</Link>
  <Link to="/pricing" className="text-blue-700 hover:underline font-semibold">Pricing</Link>
  <Link to="/sitemap" className="text-blue-700 hover:underline font-semibold">Sitemap</Link>
  <a href="/popular-locations.html" className="text-blue-700 hover:underline font-semibold">Popular Locations</a>
</nav>
<div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Join the Parking Finder Team!</h1>
      <p className="text-lg text-gray-700 mb-6">
        We’re on a mission to make parking easy and accessible in every city. Passionate about smart mobility, navigation technology, or community-driven parking? Let’s talk!
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Open Positions</h2>
        <ul className="mt-4 space-y-3">
          <li>
            <span className="font-medium">Frontend Developer:</span> Build intuitive web/mobile parking interfaces.
          </li>
          <li>
            <span className="font-medium">Data Analyst:</span> Shape smarter parking with our live parking availability data.
          </li>
          <li>
            <span className="font-medium">Community Manager:</span> Help drivers in every city find better parking and share local tips.
          </li>
        </ul>
      </div>
      <div className="text-center">
        <a href="mailto:rishabrp2006@gmail.com" className="inline-block px-5 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800">Send Resume / Inquire</a>
        <div className="mt-4"><Link to="/about" className="text-blue-600 font-medium underline">Learn more about us</Link></div>
      </div>
    </div>
    </>
  );
}
