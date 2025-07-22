
import React from "react";
import { Link } from "react-router-dom";

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

export default function Sitemap() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-6">Parking Finder Sitemap</h1>
      <p className="mb-6 text-gray-700">
        Easy navigation for all our parking-related resources and service pages.
      </p>
      <ul className="space-y-3">
        {sitemapLinks.map((link, idx) => (
          <li key={idx}>
            <Link to={link.url} className="text-blue-700 hover:underline text-lg">{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <a href="https://www.parkingfinder.tech" className="text-blue-600 font-medium underline">Visit our global website</a>
      </div>
    </div>
  );
}
