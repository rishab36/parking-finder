import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Modern HTML template function
function generateHTML(page, pages, pageIndex) {
  const keywords = Array.isArray(page.keywords) ? page.keywords : String(page.keywords).split(',');
  
  // Generate schema markup based on page type
  let schemaMarkup = '';
  let faqSchema = '';
  let howToSchema = '';
  let reviewSchema = '';
  let eventSchema = '';
  let organizationSchema = '';
  let articleSchema = '';
  let productSchema = '';
  let videoSchema = '';
  let breadcrumbSchema = '';

  // Organization Schema (common for all pages)
  organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ParkingFinder",
    "url": "https://parkingfinder.tech",
    "logo": "https://parkingfinder.tech/logo.png",
    "sameAs": [
      "https://facebook.com/parkingfinder",
      "https://twitter.com/parkingfinder",
      "https://linkedin.com/company/parkingfinder",
      "https://instagram.com/parkingfinder"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  // Review Schema (common for all pages)
  reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "1000",
    "bestRating": "5",
    "worstRating": "1",
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "John Doe"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Great app for finding parking spots and EV charging stations!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jane Smith"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4"
        },
        "reviewBody": "Very helpful for daily commuters. Real-time availability is accurate."
      }
    ]
  };

  // Event Schema (for special promotions)
  eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ParkingFinder.tech Launch Event",
    "startDate": "2024-03-01T09:00:00+05:30",
    "endDate": "2024-03-01T17:00:00+05:30",
    "location": {
      "@type": "Place",
      "name": "ParkingFinder.tech Headquarters",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Tech Park",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560103",
        "addressCountry": "IN"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  // Article Schema
  articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.title,
    "description": page.content,
    "image": "https://parkingfinder.tech/article-image.jpg",
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "ParkingFinder.tech",
      "url": "https://parkingfinder.tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ParkingFinder.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://parkingfinder.tech/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://parkingfinder.tech/${page.filename}`
    }
  };

  // Product Schema
  productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ParkingFinder.tech Premium",
    "image": "https://parkingfinder.tech/premium-features.jpg",
    "description": "Premium parking and EV charging services with advanced features",
    "brand": {
      "@type": "Brand",
      "name": "ParkingFinder.tech"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://parkingfinder.tech/premium",
      "priceCurrency": "INR",
      "price": "299",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ParkingFinder.tech"
      }
    }
  };

  // Video Schema
  videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "How to Use ParkingFinder.tech",
    "description": "Learn how to find parking spots and EV charging stations with ParkingFinder.tech",
    "thumbnailUrl": "https://parkingfinder.tech/video-thumbnail.jpg",
    "uploadDate": "2024-01-01T08:00:00+05:30",
    "duration": "PT2M30S",
    "contentUrl": "https://parkingfinder.tech/how-to-use-ParkingFinder.tech.mp4",
    "embedUrl": "https://parkingfinder.tech/embed/how-to-use-ParkingFinder.tech",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 10000
    }
  };

  // Generate FAQ schema based on page type
  if (page.filename.includes('parking')) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I find parking near me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use ParkingFinder.tech to find the nearest parking spots. Enter your location, and we'll show you available parking spaces with real-time availability and pricing."
          }
        },
        {
          "@type": "Question",
          "name": "Can I book parking in advance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can book parking spots in advance through ParkingFinder.tech. This helps you secure your spot and often comes with discounted rates."
          }
        },
        {
          "@type": "Question",
          "name": "What payment methods are accepted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ParkingFinder.tech accepts various payment methods including UPI, credit/debit cards, digital wallets, and cash at select locations."
          }
        }
      ]
    };

    howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Find and Book Parking with ParkingFinder.tech",
      "description": "Step-by-step guide to finding and booking parking spots using ParkingFinder.tech",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Open ParkingFinder.tech App",
          "text": "Download and open the ParkingFinder.tech app on your smartphone",
          "url": "https://parkingfinder.tech/app"
        },
        {
          "@type": "HowToStep",
          "name": "Enter Location",
          "text": "Enter your destination or current location",
          "url": "https://parkingfinder.tech/location"
        },
        {
          "@type": "HowToStep",
          "name": "Select Parking Spot",
          "text": "Choose from available parking spots based on price, distance, and amenities",
          "url": "https://parkingfinder.tech/select"
        },
        {
          "@type": "HowToStep",
          "name": "Book and Pay",
          "text": "Book your spot and complete the payment using your preferred method",
          "url": "https://parkingfinder.tech/book"
        }
      ]
    };
  } else if (page.filename.includes('ev-charging')) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I find EV charging stations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use ParkingFinder.tech to locate nearby EV charging stations. We show real-time availability, charging rates, and compatible charging points for your electric vehicle."
          }
        },
        {
          "@type": "Question",
          "name": "What types of charging stations are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ParkingFinder.tech lists various charging stations including DC fast chargers, AC chargers, and solar-powered stations compatible with all major EV models."
          }
        },
        {
          "@type": "Question",
          "name": "How do I pay for charging?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can pay for charging through the ParkingFinder.tech app using UPI, credit/debit cards, or digital wallets. Some stations also accept cash payments."
          }
        }
      ]
    };

    howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Find and Use EV Charging Stations",
      "description": "Step-by-step guide to finding and using EV charging stations with ParkingFinder.tech",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Open ParkingFinder.tech App",
          "text": "Launch the ParkingFinder.tech app on your device",
          "url": "https://parkingfinder.tech/app"
        },
        {
          "@type": "HowToStep",
          "name": "Find Charging Stations",
          "text": "Search for nearby EV charging stations",
          "url": "https://parkingfinder.tech/ev-stations"
        },
        {
          "@type": "HowToStep",
          "name": "Check Compatibility",
          "text": "Verify charging station compatibility with your EV model",
          "url": "https://parkingfinder.tech/compatibility"
        },
        {
          "@type": "HowToStep",
          "name": "Start Charging",
          "text": "Connect your vehicle and start charging using the app",
          "url": "https://parkingfinder.tech/start-charging"
        }
      ]
    };
  } else if (page.filename.includes('gas-stations')) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I find gas stations near me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use ParkingFinder.tech to locate nearby gas stations. We show real-time fuel prices, station amenities, and directions to help you find the best option."
          }
        },
        {
          "@type": "Question",
          "name": "What types of fuel are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ParkingFinder.tech lists stations offering petrol, diesel, and CNG. You can filter stations based on the type of fuel you need."
          }
        },
        {
          "@type": "Question",
          "name": "Are the fuel prices updated in real-time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, ParkingFinder.tech provides real-time fuel prices updated regularly to help you find the best rates in your area."
          }
        }
      ]
    };

    howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Find Gas Stations and Compare Prices",
      "description": "Step-by-step guide to finding gas stations and comparing fuel prices",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Open ParkingFinder.tech App",
          "text": "Launch the ParkingFinder.tech app on your device",
          "url": "https://parkingfinder.tech/app"
        },
        {
          "@type": "HowToStep",
          "name": "Search Gas Stations",
          "text": "Find nearby gas stations using your location",
          "url": "https://parkingfinder.tech/gas-stations"
        },
        {
          "@type": "HowToStep",
          "name": "Compare Prices",
          "text": "Compare fuel prices at different stations",
          "url": "https://parkingfinder.tech/compare-prices"
        },
        {
          "@type": "HowToStep",
          "name": "Get Directions",
          "text": "Get turn-by-turn directions to your chosen station",
          "url": "https://parkingfinder.tech/directions"
        }
      ]
    };
  }

  // Generate schema markup based on page type
  if (page.filename.includes('parking')) {
    schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ParkingFinder.tech",
      "description": page.content,
      "areaServed": {
        "@type": "City",
        "name": page.filename.includes('-') ? page.filename.split('-')[1].replace('.html', '') : "India"
      },
      "serviceType": "Parking Services",
      "priceRange": "₹₹",
      "openingHours": "Mo-Su 00:00-23:59",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "YOUR_LATITUDE",
        "longitude": "YOUR_LONGITUDE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "1000"
      },
      "hasMap": "https://parkingfinder.tech/map",
      "sameAs": [
        "https://facebook.com/ParkingFinder.tech",
        "https://twitter.com/ParkingFinder.tech",
        "https://linkedin.com/company/ParkingFinder.tech"
      ],
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://parkingfinder.tech/book",
          "inLanguage": "en-US",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        }
      }
    };
  } else if (page.filename.includes('ev-charging')) {
    schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ParkingFinder.tech EV Charging",
      "description": page.content,
      "areaServed": {
        "@type": "City",
        "name": page.filename.includes('-') ? page.filename.split('-')[1].replace('.html', '') : "India"
      },
      "serviceType": "EV Charging Services",
      "priceRange": "₹₹",
      "openingHours": "Mo-Su 00:00-23:59",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "YOUR_LATITUDE",
        "longitude": "YOUR_LONGITUDE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "1000"
      },
      "hasMap": "https://parkingfinder.tech/ev-map",
      "sameAs": [
        "https://facebook.com/ParkingFinder.tech",
        "https://twitter.com/ParkingFinder.tech",
        "https://linkedin.com/company/ParkingFinder.tech"
      ],
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://parkingfinder.tech/ev-book",
          "inLanguage": "en-US",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        }
      }
    };
  } else if (page.filename.includes('gas-stations')) {
    schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "GasStation",
      "name": "ParkingFinder.tech Gas Stations",
      "description": page.content,
      "areaServed": {
        "@type": "City",
        "name": page.filename.includes('-') ? page.filename.split('-')[1].replace('.html', '') : "India"
      },
      "priceRange": "₹₹",
      "openingHours": "Mo-Su 00:00-23:59",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "YOUR_LATITUDE",
        "longitude": "YOUR_LONGITUDE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "1000"
      },
      "hasMap": "https://parkingfinder.tech/gas-map",
      "sameAs": [
        "https://facebook.com/ParkingFinder.tech",
        "https://twitter.com/ParkingFinder.tech",
        "https://linkedin.com/company/ParkingFinder.tech"
      ],
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://parkingfinder.tech/gas-book",
          "inLanguage": "en-US",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        }
      }
    };
  }

  // Enhanced Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.content,
    "publisher": {
      "@type": "Organization",
      "name": "Parking Finder",
      "url": "https://parkingfinder.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://parkingfinder.tech/logo.png"
      }
    },
    "mainEntity": {
      "@type": "Article",
      "headline": page.title,
      "description": page.content,
      "keywords": page.keywords.join(", "),
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Parking Finder"
      }
    }
  };

  // Add FAQ Schema if page has FAQ content
  if (page.faq) {
    schemaData.mainEntity.hasPart = {
      "@type": "FAQPage",
      "mainEntity": page.faq.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
  }

  // Add HowTo Schema if page has instructions
  if (page.howTo) {
    schemaData.mainEntity.hasPart = {
      "@type": "HowTo",
      "name": page.howTo.title,
      "description": page.howTo.description,
      "step": page.howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.title,
        "text": step.description
      }))
    };
  }

  // Breadcrumb Schema
  breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://parkingfinder.tech"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title.split('|')[0].trim(),
        "item": `https://parkingfinder.tech/${page.filename}`
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <meta name="description" content="${page.content.substring(0, 160)}">
    <meta name="keywords" content="${page.keywords.join(', ')}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://parkingfinder.tech/${page.filename}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://parkingfinder.tech/${page.filename}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.content.substring(0, 160)}" />
    <meta property="og:image" content="https://parkingfinder.tech/logo.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://parkingfinder.tech/${page.filename}" />
    <meta property="twitter:title" content="${page.title}" />
    <meta property="twitter:description" content="${page.content.substring(0, 160)}" />
    <meta name="twitter:image" content="https://parkingfinder.tech/logo.png" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(schemaData, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="https://parkingfinder.tech/logo.png">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: #2563eb;
            --secondary-color: #1e40af;
            --accent-color: #3b82f6;
            --text-color: #1f2937;
            --light-text: #6b7280;
            --background: #ffffff;
            --light-background: #f3f4f6;
            --border-color: #e5e7eb;
            --success-color: #10b981;
            --warning-color: #f59e0b;
            --error-color: #ef4444;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background: var(--background);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        /* Header Styles */
        .header {
            background: #111827;
            color: white;
            padding: 1rem 0;
            
            margin-bottom: 2rem;
        }

        .nav {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

        .nav-logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .nav-links {
            display: flex;
            flex-direction: row;
            gap: 2rem;
        }

        .nav-link {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.2s;
        }

        .nav-link:hover {
            opacity: 0.8;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://parkingfinder.tech/hero-bg.jpg');
            background-size: cover;
            background-position: center;
            color: var(--text-color);
            padding: 4rem 0;
            text-align: center;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1.2rem;
            font-weight: 700;
            letter-spacing: 0.01em;
            line-height: 1.2;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto 2.2rem auto;
            opacity: 0.92;
            line-height: 1.6;
            letter-spacing: 0.01em;
        }

        /* Search Section */
        .search-section {
            background: var(--light-background);
            padding: 2rem 0;
            margin-top: -2rem;
            border-radius: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .search-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .search-box {
            display: flex;
            gap: 1rem;
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .search-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 0.25rem;
            font-size: 1rem;
        }

        .search-button {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
        }

        .search-button:hover {
            background: var(--secondary-color);
        }

        /* Features Section */
        .features {
            padding: 4rem 0;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        /* Content Section */

        /* Responsive Styles */
        @media (max-width: 900px) {
            .container {
                max-width: 100%;
                padding: 0 0.5rem;
            }
            .features {
                padding: 2rem 0;
            }
        }
        @media (max-width: 600px) {
            body {
                background: #f8fafc;
            }
            .container {
                padding: 0 0.5rem;
            }
            .header {
                padding: 0.6rem 0;
                margin-bottom: 1.5rem;
                border-radius: 0 0 1.5rem 1.5rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            .nav {
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0;
                width: 100%;
            }
            .nav-links {
                flex-direction: column;
                gap: 0.5rem;
                width: 100%;
                align-items: center;
            }
            .nav-link {
                width: 100%;
                text-align: center;
                padding: 0.75rem 0;
                border-radius: 0.5rem;
                background: rgba(255,255,255,0.07);
                font-size: 1.1rem;
                font-weight: 600;
            }
            .nav-link:not(:last-child) {
                margin-bottom: 0.2rem;
            }
            .nav-logo {
                font-size: 1.3rem;
                margin-bottom: 0.3rem;
            }
            .nav-logo {
                margin-left: auto;
                margin-right: auto;
                display: block;
                text-align: center;
                width: 100%;
                padding-bottom: 0.2rem;
            }
            /* Only apply card backgrounds and extra styling for mobile */
            .cta, .hero, .search-section, .features {
                background: #fff;
                border-radius: 1.2rem;
                box-shadow: 0 2px 12px rgba(0,0,0,0.07);
                margin-bottom: 1.2rem;
                padding-left: 1rem;
                padding-right: 1rem;
            }
            .app-buttons {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                width: 100%;
            }
            .app-button {
                width: 100%;
                max-width: 320px;
                justify-content: center;
                font-size: 1.1rem;
                padding: 1rem 0.5rem;
                border-radius: 0.7rem;
                box-shadow: 0 1px 4px rgba(0,0,0,0.06);
            }
        }
        .content {
            padding: 4rem 0;
            background: var(--light-background);
        }

        .content-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .content h2 {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
            color: var(--text-color);
        }

        .content p {
            margin-bottom: 1.5rem;
            color: var(--light-text);
        }

        /* CTA Section */
        .cta {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 6rem 0;
            text-align: center;
        }

        .cta h2 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            font-weight: 700;
        }

        .cta p {
            font-size: 1.5rem;
            max-width: 800px;
            margin: 0 auto 3rem;
            opacity: 0.9;
            line-height: 1.6;
        }

        .app-buttons {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 3rem;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }

        .app-button {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 1.5rem 3rem;
            border-radius: 1rem;
            text-decoration: none;
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            min-width: 300px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .app-button:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            background: rgba(255, 255, 255, 0.15);
        }

        .app-button i {
            font-size: 2.5rem;
        }

        .app-button-text {
            display: flex;
            flex-direction: column;
            line-height: 1.3;
            text-align: left;
        }

        .app-button-label {
            font-size: 1rem;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .app-button-name {
            font-size: 1.75rem;
            font-weight: 600;
        }

        .app-store {
            background: linear-gradient(135deg, #000000, #333333);
        }

        .play-store {
            background: linear-gradient(135deg, #414141, #2d2d2d);
        }

        .website {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
        }

        @media (max-width: 768px) {
            .cta {
                padding: 4rem 1rem;
            }

            .cta h2 {
                font-size: 2.5rem;
            }

            .cta p {
                font-size: 1.25rem;
            }

            .app-buttons {
                flex-direction: column;
                align-items: stretch;
                gap: 1.5rem;
                padding: 0 1rem;
            }

            .app-button {
                width: 100%;
                justify-content: center;
                padding: 1.25rem 2rem;
            }

            .app-button i {
                font-size: 2rem;
            }

            .app-button-name {
                font-size: 1.5rem;
            }
        }

        /* Footer */
        .footer {
            background: var(--text-color);
            color: white;
            padding: 4rem 0 2rem;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .footer-links {
            list-style: none;
        }

        .footer-link {
            color: var(--light-text);
            text-decoration: none;
            margin-bottom: 0.5rem;
            display: block;
            transition: color 0.2s;
        }

        .footer-link:hover {
            color: white;
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: var(--light-text);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .search-box {
                flex-direction: column;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate {
            animation: fadeIn 0.5s ease-out;
        }
    </style>
</head>
<body>
    <header class="header">
        <nav class="nav container">
            <a href="https://parkingfinder.tech" class="nav-logo" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:white;font-size:1.5rem;font-weight:700;">
  <img src="playstore.png" style="height:2.2rem;width:2.2rem;object-fit:contain;vertical-align:middle;border-radius:0.4rem;background:#fff;padding:2px;box-shadow:0 1px 4px #c7d7ee80;">
  ParkingFinder.tech
</a>
            <div class="nav-links">
                <a href="https://parkingfinder.tech/parking" class="nav-link">Parking</a>
                <a href="https://parkingfinder.tech/ev-charging" class="nav-link">EV Charging</a>
                <a href="https://parkingfinder.tech/gas-stations" class="nav-link">Gas Stations</a>
                <a href="https://parkingfinder.tech/app" class="nav-link">Download App</a>
            </div>
        </nav>
    </header>

    

    <section class="cta">
        <div class="container">
            <h2 class="animate">Ready to Find Parking?</h2>
<p class="animate">
    Download our app and start finding parking spots, EV charging stations, and gas stations near you.<br>
    <span style="display:inline-block;margin-top:1rem;font-size:1.2rem;color:#dbeafe;font-weight:500;">
        <i class="fas fa-badge-check" style="color:#10b981;"></i> 100% Free • No Ads • No Login Required
    </span><br>
    <span style="display:inline-block;margin-top:0.5rem;font-size:1.1rem;color:#d1fae5;">
        Enjoy unlimited searches for parking, EV charging, and gas stations—absolutely free, forever!
    </span>
</p>
            <div class="app-buttons animate">
                <a href="https://apps.apple.com/us/app/parkingfinder-tech/id6746726849" class="app-button app-store">
                    <i class="fab fa-apple"></i>
                    <div class="app-button-text">
                        <span class="app-button-label">Download on the</span>
                        <span class="app-button-name">App Store</span>
                    </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=co.median.android.ljwerj" class="app-button play-store">
                    <i class="fab fa-google-play"></i>
                    <div class="app-button-text">
                        <span class="app-button-label">GET IT ON</span>
                        <span class="app-button-name">Google Play</span>
                    </div>
                </a>
                <a href="https://Parkingfinder.tech" class="app-button website">
                    <i class="fas fa-globe"></i>
                    <div class="app-button-text">
                        <span class="app-button-label">Visit our</span>
                        <span class="app-button-name">Website</span>
                    </div>
                </a>
            </div>
        </div>
    </section>
    <section class="hero">
        <div class="container">
            <h1 class="animate">${page.title}</h1>
            <p class="animate">${page.content.substring(0, 200)}...</p>
        </div>
    </section>

    <section class="search-section">
        <div class="search-container">
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Enter your location...">
                <button class="search-button">
                    <i class="fas fa-search"></i> Search
                </button>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <div class="features-grid">
                <div class="feature-card animate">
                    <i class="fas fa-map-marker-alt feature-icon"></i>
                    <h3 class="feature-title">Find Nearby Spots</h3>
                    <p>Locate parking spots, EV charging stations, and gas stations near you in real-time.</p>
                </div>
                <div class="feature-card animate">
                    <i class="fas fa-bolt feature-icon"></i>
                    <h3 class="feature-title">EV Charging</h3>
                    <p>Find compatible charging stations and check availability before you arrive.</p>
                </div>
                <div class="feature-card animate">
                    <i class="fas fa-gas-pump feature-icon"></i>
                    <h3 class="feature-title">Gas Prices</h3>
                    <p>Compare fuel prices at different stations and find the best deals.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="content">
        <div class="container">
            <div class="content-container animate">
                <h2>${page.title}</h2>
                <p>${page.content}</p>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>ParkingFinder</h3>
                    <ul class="footer-links">
                        <li><a href="https://parkingfinder.tech/about" class="footer-link">About Us</a></li>
                        <li><a href="https://parkingfinder.tech/contact" class="footer-link">Contact</a></li>
                        <li><a href="https://parkingfinder.tech/careers" class="footer-link">Careers</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Services</h3>
                    <ul class="footer-links">
                        <li><a href="https://parkingfinder.tech/parking" class="footer-link">Parking</a></li>
                        <li><a href="https://parkingfinder.tech/ev-charging" class="footer-link">EV Charging</a></li>
                        <li><a href="https://parkingfinder.tech/gas-stations" class="footer-link">Gas Stations</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Support</h3>
                    <ul class="footer-links">
                        <li><a href="https://parkingfinder.tech/help" class="footer-link">Help Center</a></li>
                        <li><a href="https://parkingfinder.tech/faq" class="footer-link">FAQ</a></li>
                        <li><a href="https://parkingfinder.tech/support" class="footer-link">Contact Support</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="https://parkingfinder.tech/privacy" class="footer-link">Privacy Policy</a></li>
                        <li><a href="https://parkingfinder.tech/terms" class="footer-link">Terms of Service</a></li>
                        <li><a href="https://parkingfinder.tech/cookies" class="footer-link">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ParkingFinder. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Add smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });

        document.querySelectorAll('.feature-card, .content-container, .cta h2, .cta p, .cta-button').forEach((el) => observer.observe(el));
    </script>
<script>
  document.addEventListener('click', function(e) {
    let el = e.target;
    // If search button is clicked, redirect
    if (el.classList && el.classList.contains('search-button')) {
      e.preventDefault();
      window.location.href = 'https://parkingfinder.tech';
      return;
    }
    // Only act if an <a> was clicked (or a parent is an <a>)
    while (el && el !== document.body) {
      if (el.tagName === 'A') {
        // Allow normal navigation for footer related links
        if (el.closest('.related-pages-footer')) {
          return;
        }
        if (el.classList.contains('play-store') || el.classList.contains('app-store')) {
          return; // Allow normal behavior for app buttons
        } else {
          e.preventDefault();
          window.location.href = 'https://parkingfinder.tech';
          return;
        }
      }
      el = el.parentElement;
    }
  }, true);
  // Prevent search form submission
  document.addEventListener('submit', function(e) {
    if (e.target && e.target.classList && e.target.classList.contains('search-form')) {
      e.preventDefault();
      window.location.href = 'https://parkingfinder.tech';
    }
  }, true);
</script>
<footer class="related-pages-footer" style="margin-top:3rem;padding:2.5rem 0;background:linear-gradient(90deg, #f0f7ff 0%, #e0e7ef 100%);border-top:1px solid #e5e7eb;">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="background:#fff;border-radius:2rem;box-shadow:0 8px 32px 0 rgba(31,41,55,0.13);padding:2.5rem 2rem 2rem 2rem;">
      <h3 style="font-size:1.7rem;font-weight:800;margin-bottom:2.2rem;text-align:center;color:#1e293b;letter-spacing:-1px;text-shadow:0 2px 12px #e0e7ef;">🌟 Explore Top Parking Spots Nearby</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;">
        ${(() => {
          const links = [];
          for (let j = 1; j <= 10; j++) {
            const nextIdx = pageIndex + j;
            if (nextIdx < pages.length) {
              const nextPage = pages[nextIdx];
              links.push(`
                <a href="${nextPage.filename}" style="display:flex;align-items:center;gap:0.85rem;background:linear-gradient(90deg,#f0f7ff 60%,#e3eaf5 100%);border-radius:1.2rem;padding:1.2rem 1rem 1.2rem 1rem;text-decoration:none;box-shadow:0 2px 12px 0 rgba(16,30,54,0.08);transition:box-shadow 0.18s,transform 0.18s,background 0.18s;position:relative;overflow:hidden;border:1.5px solid #e0e7ef;cursor:pointer;outline:none;min-height:84px;">
                  <span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:#e0e7ef;border-radius:50%;margin-right:0.5rem;box-shadow:0 1px 4px #c7d7ee80;">
                    <svg width="26" height="26" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="7.5" cy="12" r="1.5"/><circle cx="16.5" cy="12" r="1.5"/></svg>
                  </span>
                  <span style="color:#0f172a;font-weight:700;font-size:1.08rem;line-height:1.3;letter-spacing:-0.2px;">${nextPage.title.replace(' | ParkingFinder.tech','')}</span>
                  <span style="position:absolute;right:1.1rem;top:50%;transform:translateY(-50%);color:#2563eb;font-size:1.55rem;opacity:0.7;transition:opacity 0.15s;">→</span>
                  <span style="position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(90deg,rgba(37,99,235,0.08) 0%,rgba(255,255,255,0) 100%);opacity:0;transition:opacity 0.18s;"></span>
                </a>
              `);
            }
          }
          return links.join('');
        })()}
      </div>
      <style>
        .related-pages-footer a:hover, .related-pages-footer a:focus {
          box-shadow:0 6px 24px 0 rgba(37,99,235,0.13),0 1.5px 8px 0 #c7d7ee80;
          background:linear-gradient(90deg,#e3eaf5 0%,#f0f7ff 100%);
          transform:translateY(-2px) scale(1.03);
        }
        .related-pages-footer a:hover span:last-child,
        .related-pages-footer a:focus span:last-child {
          opacity:1;
        }
        @media (max-width: 700px) {
          .related-pages-footer div[style*='grid-template-columns'] {
            grid-template-columns:1fr;
          }
        }
      </style>
    </div>
  </div>
</footer>
</body>
</html>`;
}

// Function to generate pages from data
function generatePages(pages) {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  pages.forEach((page, idx) => {
    const filePath = path.join(publicDir, page.filename);
    const html = generateHTML(page, pages, idx);
    fs.writeFileSync(filePath, html);
    console.log(`Generated: ${page.filename}`);
  });
}

function generateCombinationPages() {
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];
  const pageTypes = [
    {
      type: 'ev-charging',
      title: 'EV Charging in {city}',
      content: 'Find EV charging stations in {city} with real-time data and filters. Locate charging points near you, check availability, and plan your route efficiently.',
      keywords: 'EV charging {city}, electric vehicle charging stations, {city} charging points'
    },
    {
      type: 'parking-prices',
      title: 'Compare Parking Prices in {city}',
      content: 'Compare paid and free parking spots in {city} using Parking Finder. Get real-time parking rates, availability, and make informed decisions about where to park.',
      keywords: '{city} parking rates, compare parking prices, {city} parking spots'
    }
  ];
  const pages = [];
  cities.forEach(city => {
    pageTypes.forEach(pageType => {
      const page = {
        title: pageType.title.replace('{city}', city),
        filename: `${pageType.type}-${city.toLowerCase()}.html`,
        content: pageType.content.replace(/{city}/g, city),
        keywords: pageType.keywords.replace(/{city}/g, city)
      };
      pages.push(page);
    });
  });
  return pages;
}

function generateSitemapIndex() {
  const baseUrl = 'https://parkingfinder.tech';
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-parking.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-ev.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-gas.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

function generateSitemap(pages) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>https://parkingfinder.tech/${page.filename}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully');
}

function generateImageSitemap(pages) {
  const imageUrls = [
    {
      loc: 'https://parkingfinder.tech/logo.png',
      caption: 'ParkingFinder Logo',
      title: 'ParkingFinder - Find Parking & EV Charging'
    },
    {
      loc: 'https://parkingfinder.tech/parking-spot.jpg',
      caption: 'Find Parking Spots',
      title: 'ParkingFinder Parking Finder'
    },
    {
      loc: 'https://parkingfinder.tech/ev-charging.jpg',
      caption: 'EV Charging Stations',
      title: 'ParkingFinder EV Charging'
    },
    {
      loc: 'https://parkingfinder.tech/gas-station.jpg',
      caption: 'Gas Stations',
      title: 'ParkingFinder Gas Station Finder'
    },
    {
      loc: 'https://parkingfinder.tech/app-screenshot.jpg',
      caption: 'ParkingFinder Mobile App',
      title: 'ParkingFinder Mobile App Screenshot'
    }
  ];

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${pages.map(page => `
  <url>
    <loc>https://parkingfinder.tech/${page.filename}</loc>
    ${imageUrls.map(image => `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
    </image:image>`).join('')}
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap-image.xml', imageSitemap);
  console.log('Image sitemap generated successfully');
}

function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://parkingfinder.tech/sitemap.xml
Sitemap: https://parkingfinder.tech/sitemap-image.xml`;
  fs.writeFileSync('public/robots.txt', robotsTxt);
  console.log('Generated robots.txt');
}

async function main() {
  try {
    const keywordsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'keywords.json'), 'utf8'));
    const pages = keywordsData.pages;
    console.log('Using pages from keywords.json');
    
    // Create public directory if it doesn't exist
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }
    
    // Generate HTML pages
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const html = generateHTML(page, pages, i);
      fs.writeFileSync(`public/${page.filename}`, html);
      console.log(`Generated: ${page.filename}`);
    }
    
    // Generate sitemaps
    generateSitemap(pages);
    
    // Generate image sitemap
    generateImageSitemap(pages);

    // Generate robots.txt
    generateRobotsTxt();

    console.log('All pages and sitemaps generated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 