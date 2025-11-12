import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

interface SchemaMarkupProps {
  title?: string;
  description?: string;
  type?: "website" | "article" | "service";
  article?: {
    publishedTime: string;
    author: string;
  };
}

const SchemaMarkup = ({ title, description, type = "website", article }: SchemaMarkupProps) => {
  const { i18n } = useTranslation();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Essaouira Home Services",
    "description": "Professional home repair and maintenance services in Essaouira, Morocco. Electricians, plumbers, painters, carpenters, handymen, and gardening services.",
    "url": window.location.origin,
    "telephone": "+212652659003",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Essaouira",
      "addressLocality": "Essaouira",
      "addressRegion": "Marrakech-Safi",
      "postalCode": "44000",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.5084",
      "longitude": "-9.7595"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Essaouira"
      },
      {
        "@type": "City",
        "name": "Diabat"
      },
      {
        "@type": "City",
        "name": "Ghazoua"
      },
      {
        "@type": "City",
        "name": "Sidi Kaouki"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Electrician Services",
            "description": "Wiring, lighting, electrical repairs in Essaouira"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plumbing Services",
            "description": "Pipes, leaks, bathroom & kitchen fixes in Essaouira"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Painting Services",
            "description": "Interior & exterior painting in Essaouira"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Carpentry Services",
            "description": "Furniture, doors, custom woodwork in Essaouira"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Handyman Services",
            "description": "General repairs & maintenance in Essaouira"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gardening Services",
            "description": "Garden maintenance, landscaping in Essaouira"
          }
        }
      ]
    }
  };

  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": article.publishedTime,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Essaouira Home Services",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    }
  } : null;

  const pageTitle = title ? `${title} | Essaouira Home Services` : "Essaouira Home Services - Electricians, Plumbers, Painters & More";
  const pageDescription = description || "Find trusted professionals in Essaouira for home repairs and maintenance. Quick, reliable electricians, plumbers, painters, carpenters, and handymen.";

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={window.location.href} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Schema.org markup */}
      {type === "website" && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SchemaMarkup;
