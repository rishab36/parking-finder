
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
  );
}
