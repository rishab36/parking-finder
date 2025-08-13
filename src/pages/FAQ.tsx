
import React from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How does Parking Finder locate parking spots near me?",
    answer: "Parking Finder uses advanced navigation, real-time GPS, and smart parking data to display available free, paid, and street parking nearby."
  },
  {
    question: "Are your parking availability updates actually in real-time?",
    answer: "Yes! Our parking availability is updated using live data, community reports, and GPS sensors for the highest accuracy."
  },
  {
    question: "Can I find EV charging stations and garages too?",
    answer: "Absolutely. Use our smart filters to locate EV charging spots, covered garages, underground parkings, and more."
  },
  {
    question: "Is Parking Finder free to use?",
    answer: "Yes, core search features are free. We also offer premium and business packages with enhanced analytics and reservation features."
  }
];

export default function FAQ() {
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
<div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6 mb-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="text-gray-700 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/contact" className="text-blue-600 text-lg hover:underline font-medium">
          Still have parking questions? Contact Us
        </Link>
      </div>
    </div>
    </>
  );
}
