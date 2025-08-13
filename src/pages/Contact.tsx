
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:rishabrp2006@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Parking Finder
          </Button>
          <h1 className="text-xl font-semibold">Contact Us</h1>
        </div>
      </div>
      
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch with the Parking Finder Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have questions about parking, need support, or want to suggest new features? We're here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
              <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <Button type="submit" className="w-full flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Email
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-gray-600 dark:text-gray-300">rishabrp2006@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-gray-600 dark:text-gray-300">Available 24/7 in the app</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Global Coverage</div>
                      <div className="text-gray-600 dark:text-gray-300">200+ Cities Worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col gap-3 mb-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-200">Quick Navigation</h3>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" className="flex-1 min-w-[130px]">
                    <a href="/popular-locations">Popular Locations</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 min-w-[100px]">
                    <a href="/sitemap">Sitemap</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 min-w-[100px]">
                    <a href="/about">About Us</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 min-w-[120px]">
                    <a href="/how-to-use">How To Use</a>
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Quick Support</h3>
                <p className="mb-4">For immediate parking assistance, use our in-app help feature or check our comprehensive FAQ section.</p>
                <Button variant="secondary" className="w-full">
                  Visit Help Center
                </Button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Business Inquiries</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interested in partnerships, API access, or enterprise solutions? Contact our business development team for custom parking solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
