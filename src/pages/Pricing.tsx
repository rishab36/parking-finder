
import React from "react";

export default function Pricing() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Parking Finder Pricing & Plans</h1>
      <p className="text-lg text-gray-700 mb-10">
        Find affordable parking solutions for everyone! Whether you want free parking or premium parking with reservation, meter alerts, and price analytics, we have you covered.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="font-bold text-xl text-blue-600 mb-2">Free Plan</h2>
          <ul className="mb-4 space-y-2">
            <li>✔️ Unlimited Parking Spot Search</li>
            <li>✔️ Real-time Availability</li>
            <li>✔️ Basic Parking Maps</li>
            <li>✔️ Gas Station & EV Finder</li>
          </ul>
          <div className="text-2xl font-bold mb-2">$0</div>
          <div className="text-gray-600">Forever Free</div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-xl shadow-lg border-2 border-yellow-400 p-6">
          <h2 className="font-bold text-xl mb-2">Premium</h2>
          <ul className="mb-4 space-y-2">
            <li>🚗 Cost Calculator & Pricing Alerts</li>
            <li>🔐 Parking Reservations</li>
            <li>⭐ Favorite & History Sync</li>
            <li>📦 Meter/Timer Alerts</li>
            <li>🅿️ Advanced Street Parking Data</li>
          </ul>
          <div className="text-2xl font-bold mb-2">$4.99/mo</div>
          <div className="text-gray-200">Best for daily drivers & commuters</div>
        </div>
        <div className="bg-white rounded-xl shadow-md border p-6">
          <h2 className="font-bold text-xl text-green-700 mb-2">Business/Enterprise</h2>
          <ul className="mb-4 space-y-2">
            <li>⚡ API & Analytics Access</li>
            <li>🏢 Bulk Reservations</li>
            <li>💼 Dedicated Support</li>
            <li>🌐 Custom Integrations</li>
          </ul>
          <div className="text-2xl font-bold mb-2">Custom</div>
          <div className="text-gray-600">Contact for quote</div>
        </div>
      </div>
      <div className="mt-10 text-center text-lg">
        <span className="font-semibold">Parking cost optimized for cities worldwide. </span>
        <a href="/contact" className="text-blue-600 underline font-medium">Contact sales for details</a>
      </div>
    </div>
  );
}
