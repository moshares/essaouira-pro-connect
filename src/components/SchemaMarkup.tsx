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
  service?: {
    name: string;
    description: string;
    slug: string;
  };
  faqItems?: Array<{
    question: string;
    answer: string;
  }>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const SchemaMarkup = ({ title, description, type = "website", article, service, faqItems, breadcrumbs }: SchemaMarkupProps) => {
  const { i18n } = useTranslation();
  const origin = window.location.origin;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "EssaouiraPro - Services à Domicile",
    "alternateName": "EssaouiraPro",
    "description": "Services professionnels à domicile à Essaouira, Maroc. Électriciens, plombiers, peintres, menuisiers, bricoleurs, jardiniers, maçons, soudeurs, piscinistes, climatisation et énergie solaire.",
    "url": origin,
    "telephone": "+212652659003",
    "image": `${origin}/og-image.jpg`,
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
    "currenciesAccepted": "MAD",
    "paymentAccepted": "Espèces, Virement bancaire",
    "areaServed": [
      { "@type": "City", "name": "Essaouira" },
      { "@type": "City", "name": "Diabat" },
      { "@type": "City", "name": "Ghazoua" },
      { "@type": "City", "name": "Sidi Kaouki" }
    ],
    "sameAs": [],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services à Domicile",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Électricien", "description": "Câblage, éclairage, réparations électriques à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Plombier", "description": "Tuyaux, fuites, réparations salle de bain et cuisine à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Peintre", "description": "Peinture intérieure et extérieure à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Menuisier", "description": "Meubles, portes, travaux de bois sur mesure à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Bricoleur", "description": "Réparations générales et entretien à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Jardinage", "description": "Entretien de jardin et aménagement paysager à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Maçon", "description": "Construction, rénovation et travaux de maçonnerie à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Soudeur", "description": "Soudure, ferronnerie et travaux métalliques à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Piscine", "description": "Entretien, réparation et installation de piscines à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Climatisation", "description": "Installation et entretien de climatisation à Essaouira" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Énergie Solaire", "description": "Installation de panneaux solaires et énergie renouvelable à Essaouira" }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5"
    }
  };

  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${origin}/services/${service.slug}`,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "EssaouiraPro - Services à Domicile",
      "telephone": "+212652659003",
      "url": origin
    },
    "areaServed": [
      { "@type": "City", "name": "Essaouira" },
      { "@type": "City", "name": "Diabat" },
      { "@type": "City", "name": "Ghazoua" },
      { "@type": "City", "name": "Sidi Kaouki" }
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${origin}/demander-service`,
      "servicePhone": "+212652659003"
    }
  } : null;

  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": article.publishedTime,
    "inLanguage": "fr",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "EssaouiraPro",
      "logo": {
        "@type": "ImageObject",
        "url": `${origin}/favicon.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  } : null;

  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  const pageTitle = title 
    ? `${title} | EssaouiraPro - Services à Domicile Essaouira` 
    : "EssaouiraPro - Services à Domicile Essaouira | Électricien, Plombier, Peintre";
  const pageDescription = description || "Services professionnels à domicile à Essaouira, Diabat, Ghazoua et Sidi Kaouki. Électriciens, plombiers, peintres, menuisiers et bricoleurs rapides et fiables. Service le jour même disponible.";

  return (
    <Helmet>
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={window.location.href} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content={`${origin}/og-image.jpg`} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ar_MA" />
      <meta property="og:site_name" content="EssaouiraPro" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${origin}/og-image.jpg`} />
      
      {/* Geo tags */}
      <meta name="geo.region" content="MA-ESS" />
      <meta name="geo.placename" content="Essaouira" />
      <meta name="geo.position" content="31.5084;-9.7595" />
      
      {/* Schema.org markup */}
      {type === "website" && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SchemaMarkup;
