import { Wrench, Droplet, Paintbrush, Hammer, Lightbulb, Leaf, HardHat, Flame, Waves, AirVent, Sun } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "react-i18next";

import electricienBg from "@/assets/services/electricien.jpg";
import plombierBg from "@/assets/services/plombier.jpg";
import peintreBg from "@/assets/services/peintre.jpg";
import menuisierBg from "@/assets/services/menuisier.jpg";
import bricoleurBg from "@/assets/services/bricoleur.jpg";
import jardinageBg from "@/assets/services/jardinage.jpg";
import maconBg from "@/assets/services/macon.jpg";
import soudeurBg from "@/assets/services/soudeur.jpg";
import piscineBg from "@/assets/services/piscine.jpg";
import climatisationBg from "@/assets/services/climatisation.jpg";
import solaireBg from "@/assets/services/solaire.jpg";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    { icon: Lightbulb, titleKey: "services.electrician.title", descriptionKey: "services.electrician.description", serviceSlug: "electricien", bg: electricienBg },
    { icon: Droplet, titleKey: "services.plumber.title", descriptionKey: "services.plumber.description", serviceSlug: "plombier", bg: plombierBg },
    { icon: Paintbrush, titleKey: "services.painter.title", descriptionKey: "services.painter.description", serviceSlug: "peintre", bg: peintreBg },
    { icon: Hammer, titleKey: "services.carpenter.title", descriptionKey: "services.carpenter.description", serviceSlug: "menuisier", bg: menuisierBg },
    { icon: Wrench, titleKey: "services.handyman.title", descriptionKey: "services.handyman.description", serviceSlug: "bricoleur", bg: bricoleurBg },
    { icon: Leaf, titleKey: "services.gardening.title", descriptionKey: "services.gardening.description", serviceSlug: "jardinage", bg: jardinageBg },
    { icon: HardHat, titleKey: "services.builder.title", descriptionKey: "services.builder.description", serviceSlug: "macon", bg: maconBg },
    { icon: Flame, titleKey: "services.welder.title", descriptionKey: "services.welder.description", serviceSlug: "soudeur", bg: soudeurBg },
    { icon: Waves, titleKey: "services.pool.title", descriptionKey: "services.pool.description", serviceSlug: "piscine", bg: piscineBg },
    { icon: AirVent, titleKey: "services.airconditioning.title", descriptionKey: "services.airconditioning.description", serviceSlug: "climatisation", bg: climatisationBg },
    { icon: Sun, titleKey: "services.solar.title", descriptionKey: "services.solar.description", serviceSlug: "solaire", bg: solaireBg },
  ];

  return (
    <section id="services" className="py-20 bg-background" aria-label="Nos services">
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
              serviceSlug={service.serviceSlug}
              backgroundImage={service.bg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
