import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const services = [
    { name: t("services.electrician.title"), slug: "electricien" },
    { name: t("services.plumber.title"), slug: "plombier" },
    { name: t("services.painter.title"), slug: "peintre" },
    { name: t("services.carpenter.title"), slug: "menuisier" },
    { name: t("services.handyman.title"), slug: "bricoleur" },
    { name: t("services.gardening.title"), slug: "jardinage" },
    { name: t("services.builder.title"), slug: "macon" },
    { name: t("services.welder.title"), slug: "soudeur" },
    { name: t("services.pool.title"), slug: "piscine" },
    { name: t("services.airconditioning.title"), slug: "climatisation" },
    { name: t("services.solar.title"), slug: "solaire" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Essaouira Pro</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Votre plateforme de confiance pour trouver des professionnels qualifiés à Essaouira et ses environs.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-bold mb-4">Horaires</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-primary-foreground">Lun – Sam</p>
                  <p>08:00 – 19:00</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-primary-foreground">Dimanche</p>
                  <p>Sur rendez-vous</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-primary-foreground">Urgences</p>
                  <p>Disponible 24h/24</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+212652659003" className="hover:text-primary transition-colors">+212 652 659 003</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:contact@essaouirapro.com" className="hover:text-primary transition-colors">contact@essaouirapro.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Essaouira, Maroc</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Essaouira Pro. Tous droits réservés.</p>
          <div className="flex gap-4 mt-2 md:mt-0 items-center">
            <Link to="/demander-service" className="hover:text-primary transition-colors">Demander un service</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <a
              href="https://agademy.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Agadem creation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
