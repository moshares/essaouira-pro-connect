import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SchemaMarkup from "@/components/SchemaMarkup";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NotFound from "./NotFound";
import { blogPosts } from "@/data/blogPosts";

const serviceSlugToKey: Record<string, string> = {
  "electricien": "electrician",
  "plombier": "plumber",
  "peintre": "painter",
  "menuisier": "carpenter",
  "bricoleur": "handyman",
  "jardinage": "gardening",
  "macon": "builder",
  "soudeur": "welder",
  "piscine": "pool",
  "climatisation": "airconditioning",
  "solaire": "solar"
};

const ServiceDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { service } = useParams();

  const validSlugs = Object.keys(serviceSlugToKey);
  
  if (!service || !validSlugs.includes(service)) {
    return <NotFound />;
  }

  const serviceKey = serviceSlugToKey[service];
  const serviceTitle = t(`services.${serviceKey}.detailTitle`);
  const serviceDesc = t(`services.${serviceKey}.detailDescription`);
  const origin = window.location.origin;

  const breadcrumbs = [
    { name: "Accueil", url: origin },
    { name: "Services", url: `${origin}/#services` },
    { name: t(`services.${serviceKey}.title`), url: `${origin}/services/${service}` }
  ];

  return (
    <>
      <SchemaMarkup
        title={serviceTitle}
        description={serviceDesc}
        type="service"
        service={{
          name: serviceTitle,
          description: serviceDesc,
          slug: service
        }}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero py-8 relative">
          <div className="absolute top-6 right-6">
            <LanguageSwitcher />
          </div>
          <nav className="container mx-auto px-4" aria-label="Navigation">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4 text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('services.backHome')}
            </Button>
          </nav>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {serviceTitle}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              {t(`services.${serviceKey}.detailSubtitle`)}
            </p>
          </div>
        </header>

        <article className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  {t('services.whatWeOffer')}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {serviceDesc}
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate(`/demander-service?type=${t(`services.${serviceKey}.title`)}`)}
                  className="w-full md:w-auto"
                >
                  {t('services.requestNow')}
                </Button>
              </div>

              <Card className="p-8 bg-card">
                <h3 className="text-2xl font-bold mb-6 text-card-foreground">
                  {t('services.included')}
                </h3>
                <ul className="space-y-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-muted-foreground">
                        {t(`services.${serviceKey}.features.${index}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="bg-muted rounded-lg p-8 md:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  {t('services.whyChoose')}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>{t('services.whyChoose1')}</p>
                  <p>{t('services.whyChoose2')}</p>
                  <p>{t('services.whyChoose3')}</p>
                </div>
              </div>
            </div>

            {/* Related blog posts */}
            {(() => {
              const relatedPosts = blogPosts.filter(post =>
                post.relatedServices?.some(s => s.slugFr === service)
              );
              if (relatedPosts.length === 0) return null;
              return (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">
                    {t('services.relatedArticles', 'Articles Associés')}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="no-underline">
                        <Card className="overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-200 group">
                          {post.image && (
                            <img src={post.image} alt={t(post.titleKey)} className="w-full h-32 object-cover" loading="lazy" />
                          )}
                          <div className="p-4 flex items-center justify-between gap-2">
                            <span className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {t(post.titleKey)}
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                {t('services.readyToStart')}
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {t('services.contactUs')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate(`/demander-service?type=${t(`services.${serviceKey}.title`)}`)}
                >
                  {t('services.getQuote')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <a href="tel:+212652659003">{t('services.callNow')}</a>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ServiceDetail;
