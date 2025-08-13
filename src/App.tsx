import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HowToUse from "@/pages/HowToUse";
import OurMission from "@/pages/OurMission";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import FAQ from "@/pages/FAQ";
import Pricing from "@/pages/Pricing";
import Services from "@/pages/Services";
import Blog from "@/pages/Blog";
import Sitemap from "@/pages/Sitemap";
import Careers from "@/pages/Careers";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/history" element={<History />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/our-mission" element={<OurMission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* New SEO/Website Pages */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
