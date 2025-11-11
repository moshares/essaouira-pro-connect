import { useTranslation } from "react-i18next";

const GoogleMaps = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t('location.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('location.subtitle')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54284.44662524415!2d-9.797896!3d31.508444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdad9a4e9f588ccf%3A0x57421a176d5d7d0a!2sEssaouira%2C%20Morocco!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Essaouira Home Services Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default GoogleMaps;
