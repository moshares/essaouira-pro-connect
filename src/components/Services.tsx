import { Wrench, Droplet, Paintbrush, Hammer, Lightbulb, Leaf, HardHat, Flame, Waves } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: Lightbulb,
      titleKey: "services.electrician.title",
      descriptionKey: "services.electrician.description",
      serviceType: "Electrician"
    },
    {
      icon: Droplet,
      titleKey: "services.plumber.title",
      descriptionKey: "services.plumber.description",
      serviceType: "Plumber"
    },
    {
      icon: Paintbrush,
      titleKey: "services.painter.title",
      descriptionKey: "services.painter.description",
      serviceType: "Painter"
    },
    {
      icon: Hammer,
      titleKey: "services.carpenter.title",
      descriptionKey: "services.carpenter.description",
      serviceType: "Carpenter"
    },
    {
      icon: Wrench,
      titleKey: "services.handyman.title",
      descriptionKey: "services.handyman.description",
      serviceType: "Handyman"
    },
    {
      icon: Leaf,
      titleKey: "services.gardening.title",
      descriptionKey: "services.gardening.description",
      serviceType: "Gardening"
    },
    {
      icon: HardHat,
      titleKey: "services.builder.title",
      descriptionKey: "services.builder.description",
      serviceType: "Builder"
    },
    {
      icon: Flame,
      titleKey: "services.welder.title",
      descriptionKey: "services.welder.description",
      serviceType: "Welder"
    },
    {
      icon: Waves,
      titleKey: "services.pool.title",
      descriptionKey: "services.pool.description",
      serviceType: "Pool"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t('services.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={t(service.titleKey)}
              description={t(service.descriptionKey)}
              serviceType={service.serviceType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
