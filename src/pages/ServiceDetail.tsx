import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SchemaMarkup from "@/components/SchemaMarkup";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NotFound from "./NotFound";

const ServiceDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { service } = useParams();

  const services = ["electrician", "plumber", "painter", "carpenter", "handyman", "gardening"];
  
  if (!service || !services.includes(service)) {
    return <NotFound />;
  }

  const serviceKey = service as string;

  return (
    <>
      <SchemaMarkup
        title={t(`services.${serviceKey}.detailTitle`)}
        description={t(`services.${serviceKey}.detailDescription`)}
        type="service"
      />

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero py-8 relative">
          <div className="absolute top-6 right-6">
            <LanguageSwitcher />
          </div>
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4 text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('services.backHome')}
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t(`services.${serviceKey}.detailTitle`)}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              {t(`services.${serviceKey}.detailSubtitle`)}
            </p>
          </div>
        </header>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  {t('services.whatWeOffer')}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {t(`services.${serviceKey}.detailDescription`)}
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate(`/request-service?type=${t(`services.${serviceKey}.title`)}`)}
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
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
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

            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                {t('services.readyToStart')}
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                {t('services.contactUs')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate(`/request-service?type=${t(`services.${serviceKey}.title`)}`)}
                >
                  {t('services.getQuote')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <a href="tel:+212123456789">{t('services.callNow')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;
